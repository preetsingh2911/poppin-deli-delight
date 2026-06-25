import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowRight, Clock, Leaf, Coffee } from "lucide-react";

import hero from "@/assets/hero.jpg";
import sandwich from "@/assets/sandwich.jpg";
import coffee from "@/assets/coffee.jpg";
import salad from "@/assets/salad.jpg";
import pastries from "@/assets/pastries.jpg";
import interior from "@/assets/interior.jpg";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Poppin Deli — Fresh sandwiches, salads & coffee" },
      { name: "description", content: "A neighborhood deli serving honest food made fresh daily. Sandwiches, salads, pastries and specialty coffee." },
      { property: "og:title", content: "Poppin Deli" },
      { property: "og:description", content: "Fresh sandwiches, salads & specialty coffee." },
    ],
  }),
  component: Home,
});

function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div>
      {/* HERO */}
      <section ref={heroRef} className="relative h-[92vh] min-h-[600px] overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0">
          <img src={hero} alt="Poppin Deli interior" width={1024} height={1024} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/70" />
        </motion.div>
        <motion.div style={{ opacity }} className="relative h-full flex items-center">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 w-full">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block text-mustard text-sm font-medium tracking-[0.3em] uppercase"
            >
              Neighborhood deli · Est. since always
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mt-5 font-display text-5xl sm:text-7xl md:text-8xl font-bold text-white leading-[0.95] max-w-4xl"
            >
              Fresh food.<br />
              <span className="text-mustard italic">Warm</span> mornings.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 text-white/80 text-lg max-w-xl"
            >
              Sandwiches stacked by hand, salads tossed to order, coffee pulled with care.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-9 flex flex-wrap gap-3"
            >
              <Link to="/menu" className="group inline-flex items-center gap-2 rounded-full bg-mustard text-foreground px-6 py-3.5 font-medium hover:bg-mustard/90 transition-all hover:scale-105">
                See the menu <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-white/40 text-white px-6 py-3.5 font-medium hover:bg-white/10 transition-colors">
                Visit us
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* MARQUEE */}
      <div className="bg-terracotta text-primary-foreground py-5 overflow-hidden border-y border-terracotta">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex gap-12 whitespace-nowrap font-display text-2xl"
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="flex items-center gap-12">
              Fresh daily <span className="text-mustard">✦</span>
              Locally sourced <span className="text-mustard">✦</span>
              Made with love <span className="text-mustard">✦</span>
              Open everyday <span className="text-mustard">✦</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* INTRO */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 grid md:grid-cols-2 gap-16 items-center">
          <Reveal>
            <span className="text-terracotta text-sm font-medium tracking-[0.25em] uppercase">Our story</span>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl font-bold leading-tight">
              A little spot where flavor pops.
            </h2>
            <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
              Poppin Deli started with a simple idea: good food, made fresh, served warm.
              Every loaf is sliced today, every salad tossed to order, every cup pulled with intent.
            </p>
            <Link to="/about" className="mt-8 inline-flex items-center gap-2 text-terracotta font-medium group">
              Read more <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="relative">
              <motion.img
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
                src={interior}
                alt="Cafe interior"
                width={1024} height={1024}
                loading="lazy"
                className="rounded-2xl shadow-2xl w-full aspect-[4/5] object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-mustard rounded-2xl p-5 shadow-xl hidden sm:block">
                <div className="font-display text-3xl font-bold">10+</div>
                <div className="text-xs uppercase tracking-wider">years serving</div>
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
              { icon: Leaf, title: "Locally sourced", desc: "Produce from farms we know by name." },
              { icon: Coffee, title: "Crafted coffee", desc: "Beans roasted weekly, pulled to perfection." },
              { icon: Clock, title: "Open all day", desc: "Breakfast through dinner, every day." },
            ].map((f, i) => (
              <Reveal key={f.title} delay={i * 0.1}>
                <div className="flex flex-col items-start">
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-terracotta text-primary-foreground">
                    <f.icon size={24} />
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-bold">{f.title}</h3>
                  <p className="mt-2 text-muted-foreground">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* MENU PREVIEW */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
              <div>
                <span className="text-terracotta text-sm font-medium tracking-[0.25em] uppercase">Crowd favorites</span>
                <h2 className="mt-3 font-display text-4xl sm:text-5xl font-bold">What's poppin' today</h2>
              </div>
              <Link to="/menu" className="inline-flex items-center gap-2 text-foreground font-medium group">
                Full menu <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { img: sandwich, name: "Turkey Stack", price: "$11" },
              { img: salad, name: "Garden Bowl", price: "$10" },
              { img: coffee, name: "Pop Latte", price: "$5" },
              { img: pastries, name: "Daily Pastry", price: "$4" },
            ].map((item, i) => (
              <Reveal key={item.name} delay={i * 0.08}>
                <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.3 }} className="group cursor-pointer">
                  <div className="overflow-hidden rounded-2xl aspect-square">
                    <img src={item.img} alt={item.name} width={1024} height={1024} loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <h3 className="font-display text-xl font-bold">{item.name}</h3>
                    <span className="text-terracotta font-semibold">{item.price}</span>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-forest text-background p-10 sm:p-16 text-center">
              <h2 className="font-display text-4xl sm:text-6xl font-bold max-w-3xl mx-auto leading-tight">
                Come hungry. Leave happy.
              </h2>
              <p className="mt-5 text-background/70 max-w-xl mx-auto">
                Drop by anytime — we'll have something warm waiting.
              </p>
              <Link to="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-mustard text-foreground px-7 py-3.5 font-medium hover:scale-105 transition-transform">
                Find us <ArrowRight size={18} />
              </Link>
              <div className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full bg-mustard/20 blur-3xl" />
              <div className="absolute -top-20 -left-20 w-60 h-60 rounded-full bg-terracotta/30 blur-3xl" />
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
