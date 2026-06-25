import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowRight, Clock, MapPin, Star } from "lucide-react";

import hero from "@/assets/poppin_highres/hero-sunset.png";
import brunch from "@/assets/poppin_highres/Brunch-club.jpg";
import latte from "@/assets/poppin_highres/DSC04838-copy-1.jpg";
import dessert from "@/assets/poppin_highres/DSC05478-2.jpg";
import interior from "@/assets/poppin_highres/DSC04585.jpg";
import barista from "@/assets/poppin_highres/DSC04838-copy-1.jpg";
import nowServing from "@/assets/poppin_highres/IMG_6982.jpg";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Poppin' Deli — Bhopal's cafe for culture, coffee & community" },
      { name: "description", content: "A vibrant cafe in Arera Colony, Bhopal serving freshly brewed coffee, brunch and soul-satisfying food in a culture-driven space." },
      { property: "og:title", content: "Poppin' Deli — Bhopal" },
      { property: "og:description", content: "Culture, coffee & community in the heart of Bhopal." },
    ],
  }),
  component: Home,
});

function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div>
      {/* HERO */}
      <section ref={heroRef} className="relative h-[92vh] min-h-[600px] overflow-hidden bg-cream">
        <motion.div style={{ y }} className="absolute inset-0">
          <img src={hero} alt="Poppin' Deli branding" width={1024} height={683} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background/85" />
        </motion.div>
        <motion.div style={{ opacity }} className="relative h-full flex items-end pb-16 sm:pb-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 w-full">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block text-terracotta text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase"
            >
              Arera Colony · Bhopal
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mt-5 font-display text-5xl sm:text-7xl md:text-8xl font-bold leading-[0.95] max-w-4xl"
            >
              Invest in <span className="text-terracotta italic">culture</span><br />& coffee.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 text-foreground/80 text-lg max-w-xl"
            >
              A world-class cafe experience for Tier II India — freshly brewed coffee, soul-satisfying food, and a vibrant community.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-9 flex flex-wrap gap-3"
            >
              <Link to="/menu" className="group inline-flex items-center gap-2 rounded-full bg-terracotta text-primary-foreground px-6 py-3.5 font-medium hover:opacity-90 transition-all hover:scale-105">
                See the menu <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-foreground/30 text-foreground px-6 py-3.5 font-medium hover:bg-foreground/5 transition-colors">
                Visit us
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* MARQUEE */}
      <div className="bg-terracotta text-primary-foreground py-5 overflow-hidden">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex gap-12 whitespace-nowrap font-display text-2xl"
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="flex items-center gap-12">
              Freshly brewed <span className="opacity-70">✦</span>
              Culture-driven <span className="opacity-70">✦</span>
              Made in Bhopal <span className="opacity-70">✦</span>
              Open 11–11 <span className="opacity-70">✦</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* INTRO */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 grid md:grid-cols-2 gap-16 items-center">
          <Reveal>
            <span className="text-terracotta text-sm font-semibold tracking-[0.25em] uppercase">Who we are</span>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl font-bold leading-tight">
              A world-class cafe, born in Bhopal.
            </h2>
            <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
              Poppin' Deli was born out of a desire to bring an experience-driven cafe to Tier II India — a vibrant space where young minds connect over great coffee, great food and good music.
            </p>
            <Link to="/about" className="mt-8 inline-flex items-center gap-2 text-terracotta font-semibold group">
              Our story <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="relative">
              <motion.img
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
                src={interior}
                alt="Inside Poppin' Deli, Bhopal"
                width={1024} height={995}
                loading="lazy"
                className="rounded-3xl shadow-2xl w-full aspect-[4/5] object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-terracotta text-primary-foreground rounded-2xl px-5 py-4 shadow-xl hidden sm:flex items-center gap-3">
                <Star size={22} fill="currentColor" />
                <div>
                  <div className="font-display text-2xl font-bold leading-none">4.5</div>
                  <div className="text-[10px] uppercase tracking-wider opacity-80">366 reviews</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 bg-cream">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { img: latte, title: "Brunch all day", desc: "Eggs, toasts and bowls — done right." },
              { img: brunch, title: "The Brunch Club", desc: "Sunny plates worth waking up for." },
              { img: dessert, title: "Sweet endings", desc: "Tiramisu, cakes and house desserts." },
            ].map((f, i) => (
              <Reveal key={f.title} delay={i * 0.1}>
                <div className="group">
                  <div className="overflow-hidden rounded-2xl aspect-[4/3]">
                    <img src={f.img} alt={f.title} width={1024} height={683} loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-bold">{f.title}</h3>
                  <p className="mt-1 text-muted-foreground">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SPLIT — Now Serving */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 grid md:grid-cols-5 gap-10 items-center">
          <Reveal className="md:col-span-3">
            <div className="overflow-hidden rounded-3xl">
              <img src={nowServing} alt="Now Serving signage at Poppin' Deli" width={1024} height={683} loading="lazy"
                className="w-full aspect-[3/2] object-cover" />
            </div>
          </Reveal>
          <Reveal delay={0.15} className="md:col-span-2">
            <span className="text-terracotta text-sm font-semibold tracking-[0.25em] uppercase">Pulled fresh</span>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl font-bold leading-tight">Coffee, the way it should be.</h2>
            <p className="mt-5 text-muted-foreground text-lg leading-relaxed">
              Single-origin beans, pulled by hands that care. Every cup is part of a craft we're obsessed with.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-cream">
                <Clock size={20} className="text-terracotta shrink-0" />
                <div className="text-sm font-medium">Open 11 AM – 11 PM</div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-cream">
                <MapPin size={20} className="text-terracotta shrink-0" />
                <div className="text-sm font-medium">Arera Colony, Bhopal</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-forest text-background p-10 sm:p-16 text-center">
              <h2 className="font-display text-4xl sm:text-6xl font-bold max-w-3xl mx-auto leading-tight">
                Come hungry. Leave inspired.
              </h2>
              <p className="mt-5 text-background/70 max-w-xl mx-auto">
                Drop by 265, E2, Arera Colony — we'll have something warm waiting.
              </p>
              <Link to="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-terracotta text-primary-foreground px-7 py-3.5 font-medium hover:scale-105 transition-transform">
                Find us <ArrowRight size={18} />
              </Link>
              <div className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full bg-terracotta/30 blur-3xl" />
              <div className="absolute -top-20 -left-20 w-60 h-60 rounded-full bg-mustard/20 blur-3xl" />
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
