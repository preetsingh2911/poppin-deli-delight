import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import interior from "@/assets/interior.jpg";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Visit — Poppin Deli" },
      { name: "description", content: "Find Poppin Deli. Address, hours and contact details." },
      { property: "og:title", content: "Visit Poppin Deli" },
    ],
  }),
  component: ContactPage,
});

const info = [
  { icon: MapPin, title: "Address", lines: ["42 Baker Lane", "Downtown"] },
  { icon: Clock, title: "Hours", lines: ["Mon–Fri · 7:00 – 19:00", "Sat · 8:00 – 20:00", "Sun · 9:00 – 17:00"] },
  { icon: Phone, title: "Phone", lines: ["(555) 123-4567"] },
  { icon: Mail, title: "Email", lines: ["hello@poppindeli.com"] },
];

function ContactPage() {
  return (
    <div>
      <section className="pt-20 pb-16 sm:pt-28">
        <div className="mx-auto max-w-4xl px-5 sm:px-8 text-center">
          <Reveal>
            <span className="text-terracotta text-sm font-medium tracking-[0.3em] uppercase">Visit</span>
            <h1 className="mt-4 font-display text-5xl sm:text-7xl font-bold">Come say hi</h1>
            <p className="mt-5 text-muted-foreground max-w-xl mx-auto">No reservations needed — just walk in.</p>
          </Reveal>
        </div>
      </section>

      <section className="pb-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 grid lg:grid-cols-2 gap-10">
          <Reveal>
            <div className="overflow-hidden rounded-3xl h-full min-h-[400px]">
              <img src={interior} alt="Poppin Deli interior" width={1024} height={1024} loading="lazy"
                className="w-full h-full object-cover" />
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="grid sm:grid-cols-2 gap-5">
              {info.map((item) => (
                <div key={item.title} className="p-6 rounded-2xl bg-cream border border-border/60">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-terracotta text-primary-foreground">
                    <item.icon size={20} />
                  </div>
                  <h3 className="mt-4 font-display text-xl font-bold">{item.title}</h3>
                  <div className="mt-2 text-sm text-muted-foreground space-y-1">
                    {item.lines.map((l) => <div key={l}>{l}</div>)}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <div className="overflow-hidden rounded-3xl border border-border/60">
              <iframe
                title="Map"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-0.13,51.50,-0.10,51.52&layer=mapnik"
                className="w-full h-[400px] block"
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
