import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import interior from "@/assets/poppin/IMG_7395-1024x995.jpg";
import barista from "@/assets/poppin/IMG_6984-576x1024.jpg";
import culture from "@/assets/poppin/DSC04585-1024x1024.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Poppin' Deli" },
      { name: "description", content: "The story behind Poppin' Deli — a Bhopal cafe built around culture, coffee, and community." },
      { property: "og:title", content: "About Poppin' Deli" },
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
            <span className="text-terracotta text-sm font-semibold tracking-[0.3em] uppercase">About us</span>
            <h1 className="mt-4 font-display text-5xl sm:text-7xl font-bold leading-[1.05]">
              A world-class cafe, built around the table.
            </h1>
          </Reveal>
        </div>
      </section>

      <section ref={ref} className="relative h-[60vh] overflow-hidden">
        <motion.img
          style={{ y }}
          src={interior}
          alt="Inside Poppin' Deli, Bhopal"
          width={1024}
          height={995}
          loading="lazy"
          className="w-full h-[120%] object-cover"
        />
      </section>

      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-3xl px-5 sm:px-8 space-y-12">
          <Reveal>
            <h2 className="font-display text-3xl sm:text-4xl font-bold">Our story</h2>
            <p className="mt-5 text-muted-foreground text-lg leading-relaxed">
              Poppin' Deli was born out of a desire to bring a world-class cafe experience to Tier II India — cities like Bhopal, brimming with potential yet overlooked in the F&amp;B landscape. We set out to build a brand that serves great food and fosters a vibrant community.
            </p>
          </Reveal>

          <Reveal>
            <h2 className="font-display text-3xl sm:text-4xl font-bold">Our vision</h2>
            <p className="mt-5 text-muted-foreground text-lg leading-relaxed">
              To redefine the cafe experience in Tier II cities by creating culture-driven spaces that bring together design, music and high-quality food — bridging international flavors with local sensibilities.
            </p>
          </Reveal>

          <Reveal>
            <h2 className="font-display text-3xl sm:text-4xl font-bold">Our mission</h2>
            <p className="mt-5 text-muted-foreground text-lg leading-relaxed">
              To build a cafe brand that caters to the evolving tastes of young consumers in emerging Indian cities — a space to connect, create, and celebrate. Through exceptional food and innovative experiences, we aim to become the go-to destination for modern cafe culture.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-24 bg-cream">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { num: "4.5★", label: "Google rating" },
              { num: "366+", label: "Happy reviews" },
              { num: "11–11", label: "Open every day" },
            ].map((s, i) => (
              <Reveal key={s.label} delay={i * 0.1}>
                <div className="text-center p-8 bg-background rounded-3xl">
                  <div className="font-display text-5xl sm:text-6xl font-bold text-terracotta">{s.num}</div>
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
            <img src={barista} alt="Barista pulling a coffee" width={576} height={1024} loading="lazy"
              className="rounded-3xl w-full aspect-[4/5] object-cover" />
          </Reveal>
          <Reveal delay={0.15}>
            <img src={culture} alt="Sneakers, skateboards and street culture wall at Poppin' Deli" width={1024} height={1024} loading="lazy"
              className="rounded-3xl w-full aspect-[4/5] object-cover md:mt-16" />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
