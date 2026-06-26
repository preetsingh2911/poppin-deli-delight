import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { motion } from "motion/react";
import { useState, type FormEvent } from "react";
import { Send, CheckCircle, Building2, Phone, Mail, MapPin, Briefcase, MessageSquare } from "lucide-react";

export const Route = createFileRoute("/franchise")({
  head: () => ({
    meta: [
      { title: "Franchise — Poppin' Deli" },
      { name: "description", content: "Own a Poppin' Deli franchise. Apply now to bring a world-class cafe experience to your city." },
      { property: "og:title", content: "Poppin' Deli Franchise Opportunity" },
    ],
  }),
  component: FranchisePage,
});

interface FormData {
  firstName: string;
  lastName: string;
  contactNumber: string;
  alternateContact: string;
  email: string;
  permanentAddress: string;
  professionalBackground: string;
  interestedCity: string;
  expectedMonthlySales: string;
  query: string;
}

const initialForm: FormData = {
  firstName: "",
  lastName: "",
  contactNumber: "",
  alternateContact: "",
  email: "",
  permanentAddress: "",
  professionalBackground: "",
  interestedCity: "",
  expectedMonthlySales: "",
  query: "",
};

function FranchisePage() {
  const [formData, setFormData] = useState<FormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  function handleChange(field: keyof FormData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-5">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-lg"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
            className="mx-auto mb-8 grid h-24 w-24 place-items-center rounded-full bg-terracotta/15"
          >
            <CheckCircle size={44} className="text-terracotta" />
          </motion.div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold">
            Application received!
          </h1>
          <p className="mt-5 text-muted-foreground text-lg max-w-md mx-auto">
            Thank you for your interest in joining the Poppin' Deli family. Our team will review your application and get back to you within 3–5 business days.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="tel:+918770452084"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-foreground/20 px-6 py-3 text-sm font-medium hover:bg-foreground/5 transition-colors"
            >
              <Phone size={16} /> Call us
            </a>
            <button
              onClick={() => { setSubmitted(false); setFormData(initialForm); }}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-terracotta text-primary-foreground px-6 py-3 text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Submit another application
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  const fields: {
    key: keyof FormData;
    label: string;
    type: string;
    required: boolean;
    icon: typeof Mail;
    placeholder?: string;
    half?: boolean;
    textarea?: boolean;
  }[] = [
    { key: "firstName", label: "First Name", type: "text", required: true, icon: Briefcase, half: true },
    { key: "lastName", label: "Last Name", type: "text", required: true, icon: Briefcase, half: true },
    { key: "contactNumber", label: "Contact Number", type: "tel", required: true, icon: Phone },
    { key: "alternateContact", label: "Alternate Contact Number", type: "tel", required: true, icon: Phone },
    { key: "email", label: "Email", type: "email", required: true, icon: Mail },
    { key: "permanentAddress", label: "Permanent Address", type: "text", required: true, icon: MapPin },
    { key: "professionalBackground", label: "What Is Your Professional Background?", type: "text", required: true, icon: Briefcase },
    { key: "interestedCity", label: "City In Which You Are Interested In Taking Franchise Of Poppin' Deli?", type: "text", required: true, icon: Building2 },
    { key: "expectedMonthlySales", label: "How Much Do You Expect To Sell Per Month In Your Preferred City?", type: "text", required: true, icon: Building2 },
    { key: "query", label: "Any Query For Us?", type: "text", required: false, icon: MessageSquare, textarea: true, placeholder: "Enter your message" },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative pt-20 pb-16 sm:pt-28 sm:pb-20 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-terracotta/8 blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-mustard/10 blur-[100px]" />
        </div>
        <div className="mx-auto max-w-4xl px-5 sm:px-8 text-center">
          <Reveal>
            <span className="text-terracotta text-sm font-semibold tracking-[0.3em] uppercase">
              Get Started With Us
            </span>
            <h1 className="mt-4 font-display text-5xl sm:text-7xl font-bold leading-tight">
              Poppin' Deli<br />
              <span className="text-terracotta italic">Franchise</span>
            </h1>
            <p className="mt-5 text-muted-foreground text-lg max-w-2xl mx-auto">
              Bring a world-class cafe experience to your city. Join the Poppin' Deli family and be part of redefining cafe culture in Tier II India.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Form Section */}
      <section className="pb-24 sm:pb-32">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <Reveal>
            <form onSubmit={handleSubmit} className="relative" id="franchise-form">
              {/* Decorative card wrapper */}
              <div className="rounded-3xl bg-card border border-border/60 shadow-xl shadow-foreground/5 overflow-hidden">
                {/* Form header bar */}
                <div className="bg-forest text-background px-8 py-7 sm:px-10">
                  <h2 className="font-display text-2xl sm:text-3xl font-bold">
                    Franchise Application
                  </h2>
                  <p className="mt-1.5 text-background/60 text-sm">
                    Fill in the details below and we'll get back to you shortly.
                  </p>
                </div>

                {/* Form fields */}
                <div className="px-8 py-10 sm:px-10 space-y-7">
                  {/* Name row — two columns */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    {fields.filter((f) => f.half).map((field) => (
                      <FormField
                        key={field.key}
                        field={field}
                        value={formData[field.key]}
                        focused={focusedField === field.key}
                        onFocus={() => setFocusedField(field.key)}
                        onBlur={() => setFocusedField(null)}
                        onChange={(v) => handleChange(field.key, v)}
                      />
                    ))}
                  </div>

                  {/* Contact row — two columns */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    {fields.filter((f) => f.key === "contactNumber" || f.key === "alternateContact").map((field) => (
                      <FormField
                        key={field.key}
                        field={field}
                        value={formData[field.key]}
                        focused={focusedField === field.key}
                        onFocus={() => setFocusedField(field.key)}
                        onBlur={() => setFocusedField(null)}
                        onChange={(v) => handleChange(field.key, v)}
                      />
                    ))}
                  </div>

                  {/* Remaining full-width fields */}
                  {fields.filter((f) => !f.half && f.key !== "contactNumber" && f.key !== "alternateContact").map((field) => (
                    <FormField
                      key={field.key}
                      field={field}
                      value={formData[field.key]}
                      focused={focusedField === field.key}
                      onFocus={() => setFocusedField(field.key)}
                      onBlur={() => setFocusedField(null)}
                      onChange={(v) => handleChange(field.key, v)}
                    />
                  ))}
                </div>

                {/* Submit bar */}
                <div className="px-8 pb-10 sm:px-10">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    id="franchise-submit"
                    className="group inline-flex items-center gap-2.5 rounded-full bg-terracotta text-primary-foreground px-8 py-4 font-semibold text-base hover:opacity-90 transition-all shadow-lg shadow-terracotta/25"
                  >
                    Submit Application
                    <Send size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </motion.button>
                </div>
              </div>
            </form>
          </Reveal>
        </div>
      </section>

      {/* Contact info strip */}
      <section className="pb-24">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <Reveal>
            <div className="rounded-2xl bg-cream border border-border/60 p-8 sm:p-10 grid sm:grid-cols-2 gap-8">
              <div>
                <h3 className="font-display text-xl font-bold">Contact us</h3>
                <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <a href="tel:+918770452084" className="flex items-center gap-2 hover:text-terracotta transition-colors">
                    <Phone size={15} className="text-terracotta shrink-0" />
                    +91 877 045 2084
                  </a>
                  <a href="tel:+917692825579" className="flex items-center gap-2 hover:text-terracotta transition-colors">
                    <Phone size={15} className="text-terracotta shrink-0" />
                    +91 769 282 5579
                  </a>
                </div>
              </div>
              <div>
                <h3 className="font-display text-xl font-bold">Location</h3>
                <p className="mt-4 text-sm text-muted-foreground flex items-start gap-2">
                  <MapPin size={15} className="text-terracotta shrink-0 mt-0.5" />
                  E-2 65, Arera Colony, Bhopal,<br />Madhya Pradesh 462016
                </p>
                <a
                  href="https://www.instagram.com/poppinbhopal?igsh=a2xuZGtramt1c3h2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-sm text-terracotta font-medium hover:underline"
                >
                  Follow us on Instagram →
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

/* ---------- Reusable Form Field ---------- */

function FormField({
  field,
  value,
  focused,
  onFocus,
  onBlur,
  onChange,
}: {
  field: {
    key: string;
    label: string;
    type: string;
    required: boolean;
    icon: typeof Mail;
    placeholder?: string;
    textarea?: boolean;
  };
  value: string;
  focused: boolean;
  onFocus: () => void;
  onBlur: () => void;
  onChange: (v: string) => void;
}) {
  const Icon = field.icon;
  const ringClass = focused
    ? "ring-2 ring-terracotta/40 border-terracotta/60"
    : "border-border hover:border-foreground/30";

  const inputClasses = `w-full bg-transparent text-foreground placeholder:text-muted-foreground/50 outline-none text-[15px]`;

  return (
    <div>
      <label htmlFor={`franchise-${field.key}`} className="block text-sm font-medium mb-2">
        {field.label}
        {field.required && <span className="text-terracotta ml-0.5">*</span>}
      </label>
      <div
        className={`flex items-start gap-3 rounded-xl border bg-background px-4 py-3.5 transition-all duration-200 ${ringClass}`}
      >
        <Icon size={17} className="text-muted-foreground/60 mt-0.5 shrink-0" />
        {field.textarea ? (
          <textarea
            id={`franchise-${field.key}`}
            name={field.key}
            required={field.required}
            placeholder={field.placeholder}
            value={value}
            onFocus={onFocus}
            onBlur={onBlur}
            onChange={(e) => onChange(e.target.value)}
            rows={4}
            className={`${inputClasses} resize-y`}
          />
        ) : (
          <input
            id={`franchise-${field.key}`}
            name={field.key}
            type={field.type}
            required={field.required}
            placeholder={field.placeholder}
            value={value}
            onFocus={onFocus}
            onBlur={onBlur}
            onChange={(e) => onChange(e.target.value)}
            className={inputClasses}
          />
        )}
      </div>
    </div>
  );
}
