import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { motion } from "motion/react";

import hero from "@/assets/hero.jpg";
import sandwich from "@/assets/sandwich.jpg";
import salad from "@/assets/salad.jpg";
import coffee from "@/assets/coffee.jpg";
import pastries from "@/assets/pastries.jpg";
import barista from "@/assets/barista.jpg";
import interior from "@/assets/interior.jpg";
import avotoast from "@/assets/avotoast.jpg";
import bowl from "@/assets/bowl.jpg";
import pancakes from "@/assets/pancakes.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Poppin Deli" },
      { name: "description", content: "A look inside Poppin Deli — the food, the space, the people." },
      { property: "og:title", content: "Gallery — Poppin Deli" },
    ],
  }),
  component: GalleryPage,
});

const images = [
  { src: hero, alt: "Counter view", span: "row-span-2" },
  { src: sandwich, alt: "Sandwich", span: "" },
  { src: coffee, alt: "Latte art", span: "" },
  { src: interior, alt: "Cafe interior", span: "" },
  { src: salad, alt: "Garden bowl", span: "row-span-2" },
  { src: avotoast, alt: "Avocado toast", span: "" },
  { src: pastries, alt: "Pastries", span: "" },
  { src: bowl, alt: "Acai bowl", span: "" },
  { src: barista, alt: "Barista", span: "row-span-2" },
  { src: pancakes, alt: "Pancakes", span: "" },
];

function GalleryPage() {
  return (
    <div>
      <section className="pt-20 pb-12 sm:pt-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 text-center">
          <Reveal>
            <span className="text-terracotta text-sm font-medium tracking-[0.3em] uppercase">Gallery</span>
            <h1 className="mt-4 font-display text-5xl sm:text-7xl font-bold">In the moment</h1>
            <p className="mt-5 text-muted-foreground max-w-xl mx-auto">A few snapshots from our daily rhythm.</p>
          </Reveal>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[180px] sm:auto-rows-[220px] gap-4">
            {images.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
                whileHover={{ scale: 1.02 }}
                className={`overflow-hidden rounded-2xl ${img.span}`}
              >
                <img src={img.src} alt={img.alt} width={1024} height={1024} loading="lazy"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
