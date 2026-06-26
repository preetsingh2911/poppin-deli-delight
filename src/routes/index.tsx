import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowRight, Clock, MapPin, Star } from "lucide-react";

import hero from "@/assets/poppin_highres/hero-sunset.png";
import interior from "@/assets/poppin_highres/DSC04585.jpg";
import nowServing from "@/assets/poppin_highres/IMG_6982.jpg";
import brunchClub from "@/assets/poppin_highres/Brunch-club.jpg";
import cultureSpace from "@/assets/poppin_highres/DSC05478-2.jpg";
import { Reveal } from "@/components/Reveal";
import { StrokeReveal } from "@/components/StrokeReveal";
import { CoffeeHero } from "@/components/CoffeeHero";
import { BentoGrid } from "@/components/BentoGrid";

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

/* ─── Stacking Cards Data ─── */

const stackCards = [
  {
    icon: "☕",
    title: "Single-Origin Coffee",
    desc: "Every cup is pulled from carefully sourced, single-origin beans by hands that care. No shortcuts, no instant mixes — just craft.",
    bg: "bg-terracotta",
    text: "text-primary-foreground",
    img: nowServing,
  },
  {
    icon: "🍳",
    title: "Made Fresh, Always",
    desc: "Zero frozen ingredients. From our sesame chicken to the house tiramisu — everything is prepared fresh, all day, every day.",
    bg: "bg-forest",
    text: "text-background",
    img: brunchClub,
  },
  {
    icon: "🎵",
    title: "Culture-Driven Spaces",
    desc: "Music, art, and vibes that make every visit feel like an experience. We're not just a cafe — we're a cultural hub for Bhopal.",
    bg: "bg-mustard",
    text: "text-foreground",
    img: interior,
  },
  {
    icon: "🤝",
    title: "Community Over Everything",
    desc: "A space where young minds connect, create, and celebrate. Meaningful interactions over great food — that's our north star.",
    bg: "bg-foreground",
    text: "text-background",
    img: cultureSpace,
  },
];

/* ─── Journey Steps ─── */

const journeySteps = [
  { num: "01", title: "Walk In", desc: "No reservations needed. Just follow the coffee aroma and find your spot." },
  { num: "02", title: "Pick Your Poison", desc: "150+ items — from Korean corn dogs and tacos to house-pulled lattes and matcha." },
  { num: "03", title: "Sip & Connect", desc: "Meet friends, make new ones, soak in the music and the culture." },
  { num: "04", title: "Come Back Tomorrow", desc: "Because you will. They always do. See you at 11." },
];

/* ═══════════════════════════════════════════════════════════════════ */

function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  /* Asymmetric parallax — each element moves at a different rate */
  const float1Y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const float2Y = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const float3Y = useTransform(scrollYProgress, [0, 1], ["0%", "55%"]);

  return (
    <div>
      {/* ═══ HERO ═══ */}
      <CoffeeHero />

      {/* ═══ MARQUEE ═══ */}
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

      {/* ═══ STROKE REVEAL — section divider ═══ */}
      <StrokeReveal text="Taste the Culture" />

      {/* ═══ INTRO ═══ */}
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

      {/* ═══ STICKY STACKING CARDS ═══ */}
      <section className="py-8 sm:py-12">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <Reveal>
            <span className="text-terracotta text-sm font-semibold tracking-[0.25em] uppercase">Why us</span>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl font-bold leading-tight mb-14">
              What makes Poppin' different.
            </h2>
          </Reveal>
          {stackCards.map((card, i) => (
            <div
              key={card.title}
              className={`sticky rounded-3xl shadow-2xl mb-24 sm:mb-32 ${card.bg} ${card.text} transition-shadow hover:shadow-3xl overflow-hidden flex flex-col`}
              style={{ top: `${100 + i * 72}px`, zIndex: i + 1 }}
            >
              {/* Title Bar (Always visible when stacked) */}
              <div className="h-[72px] flex items-center justify-between border-b border-black/10 px-6 sm:px-10 shrink-0 bg-black/5">
                <span className="opacity-50">✦</span>
                <h3 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-wider">{card.title}</h3>
                <span className="opacity-50">✦</span>
              </div>
              
              {/* Card Content */}
              <div className="p-8 sm:p-10 flex-1">
                <div className="grid md:grid-cols-2 gap-8 items-center h-full">
                  <div className="relative z-10">
                    <span className="text-5xl block mb-5" aria-hidden>{card.icon}</span>
                    <p className="mt-3 text-lg sm:text-xl opacity-90 leading-relaxed max-w-sm font-medium">{card.desc}</p>
                  </div>
                  <div className="hidden md:block h-56 sm:h-72 w-full rounded-2xl overflow-hidden shadow-lg transform translate-x-2 rotate-2 transition-transform hover:rotate-1">
                    <img src={card.img} alt={card.title} className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </div>
          ))}
          {/* Spacer to let the last card unstick naturally */}
          <div className="h-[40vh]" aria-hidden />
        </div>
      </section>

      {/* ═══ BENTO GRID ═══ */}
      <BentoGrid />

      {/* ═══ STROKE REVEAL ═══ */}
      <StrokeReveal text="The Experience" className="bg-cream" />

      {/* ═══ SCROLL JOURNEY TIMELINE ═══ */}
      <section className="pb-24 sm:pb-32 bg-cream">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <Reveal>
            <div className="text-center mb-20">
              <span className="text-terracotta text-sm font-semibold tracking-[0.25em] uppercase">Step by step</span>
              <h2 className="mt-4 font-display text-4xl sm:text-5xl font-bold">Your visit, simplified.</h2>
            </div>
          </Reveal>
          <JourneyTimeline />
        </div>
      </section>

      {/* ═══ SPLIT — Now Serving ═══ */}
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

      {/* ═══ STROKE REVEAL ═══ */}
      <StrokeReveal text="Come Hungry" />

      {/* ═══ CTA ═══ */}
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

/* ═══════════════════════════════════════════════════════════════════ */
/* Journey Timeline — scroll-linked progress line with numbered steps */
/* ═══════════════════════════════════════════════════════════════════ */

function JourneyTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={ref} className="relative">
      {/* Background track (dashed) */}
      <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-px sm:-translate-x-1/2"
        style={{ backgroundImage: "repeating-linear-gradient(to bottom, var(--border) 0px, var(--border) 8px, transparent 8px, transparent 16px)" }}
      />
      {/* Animated progress line (solid) */}
      <motion.div
        className="absolute left-6 sm:left-1/2 top-0 w-0.5 bg-terracotta origin-top sm:-translate-x-1/2 rounded-full"
        style={{ height: lineHeight }}
      />

      <div className="space-y-20 sm:space-y-28">
        {journeySteps.map((step, i) => {
          const isLeft = i % 2 === 0;
          return (
            <Reveal key={step.num} delay={0.05}>
              {/* ── Mobile layout ── */}
              <div className="flex items-start gap-5 sm:hidden">
                <div className="shrink-0 relative z-10 grid h-12 w-12 place-items-center rounded-full bg-terracotta text-primary-foreground font-display text-sm font-bold shadow-lg ring-4 ring-cream">
                  {step.num}
                </div>
                <div className="pt-1">
                  <h3 className="font-display text-xl font-bold">{step.title}</h3>
                  <p className="mt-1.5 text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>

              {/* ── Desktop layout — alternating sides ── */}
              <div className="hidden sm:grid sm:grid-cols-[1fr_auto_1fr] sm:gap-10 items-center">
                <div className={isLeft ? "text-right" : ""}>
                  {isLeft && (
                    <>
                      <h3 className="font-display text-2xl font-bold">{step.title}</h3>
                      <p className="mt-2 text-muted-foreground leading-relaxed">{step.desc}</p>
                    </>
                  )}
                </div>
                <div className="relative z-10 grid h-14 w-14 place-items-center rounded-full bg-terracotta text-primary-foreground font-display text-lg font-bold shadow-lg ring-4 ring-cream">
                  {step.num}
                </div>
                <div>
                  {!isLeft && (
                    <>
                      <h3 className="font-display text-2xl font-bold">{step.title}</h3>
                      <p className="mt-2 text-muted-foreground leading-relaxed">{step.desc}</p>
                    </>
                  )}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
