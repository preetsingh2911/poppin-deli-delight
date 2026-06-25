import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import interior from "@/assets/interior.jpg";
import barista from "@/assets/barista.jpg";
import pastries from "@/assets/pastries.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Poppin Deli" },
      { name: "description", content: "The story behind Poppin Deli — a neighborhood spot built around fresh ingredients and genuine hospitality." },
      { property: "og:title", content: "About Poppin Deli" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div>
      <section className="pt-20 pb-16 sm:pt-28">
        <div className="mx-auto max-w-4xl px-5 sm:px-8 text-center">
          <Reveal>
            <span className="text-terracotta text-sm font-medium tracking-[0.3em] uppercase">About us</span>
            <h1 className="mt-4 font-display text-5xl sm:text-7xl font-bold leading-[1.05]">
              A neighborhood deli, built around the table.
            </h1>
          </Reveal>
        </div>
      </section>

      <section ref={ref} className="relative h-[60vh] overflow-hidden">
        <motion.img
          style={{ y }}
          src={interior}
          alt="Cafe interior"
          width={1024}
          height={1024}
          loading="lazy"
          className="w-full h-[120%] object-cover"
        />
      </section>

      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-3xl px-5 sm:px-8 space-y-12">
          <Reveal>
            <h2 className="font-display text-3xl sm:text-4xl font-bold">Our story</h2>
            <p className="mt-5 text-muted-foreground text-lg leading-relaxed">
              Poppin Deli began as a simple counter on a quiet corner — two ovens, one espresso machine,
              and a stubborn belief that food should be made today, not yesterday. Years later, the counter's
              a little bigger and the regulars are family, but the rules haven't changed.
            </p>
          </Reveal>

          <Reveal>
            <h2 className="font-display text-3xl sm:text-4xl font-bold">What we believe</h2>
            <p className="mt-5 text-muted-foreground text-lg leading-relaxed">
              Fresh ingredients, short menus, and the kind of warm welcome that makes you take your jacket off.
              We slice, toss, and pull everything to order — because food tastes better when it's made for you.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-24 bg-cream">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { num: "10+", label: "Years serving" },
              { num: "20k", label: "Coffees pulled monthly" },
              { num: "100%", label: "Made fresh daily" },
            ].map((s, i) => (
              <Reveal key={s.label} delay={i * 0.1}>
                <div className="text-center p-8 bg-background rounded-3xl">
                  <div className="font-display text-6xl font-bold text-terracotta">{s.num}</div>
                  <div className="mt-3 text-sm uppercase tracking-widest text-muted-foreground">{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 grid md:grid-cols-2 gap-10">
          <Reveal>
            <img src={barista} alt="Barista at work" width={1024} height={1024} loading="lazy"
              className="rounded-3xl w-full aspect-[4/5] object-cover" />
          </Reveal>
          <Reveal delay={0.15}>
            <img src={pastries} alt="Fresh pastries" width={1024} height={1024} loading="lazy"
              className="rounded-3xl w-full aspect-[4/5] object-cover md:mt-16" />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
