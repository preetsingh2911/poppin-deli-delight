import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { motion } from "motion/react";

import hero from "@/assets/poppin_highres/INVEST-IN-CULTURE-3.png";
import brunch from "@/assets/poppin_highres/Brunch-club.jpg";
import latte from "@/assets/poppin_highres/DSC04838-copy-1.jpg";
import dessert from "@/assets/poppin_highres/DSC05478-2.jpg";
import nowServing from "@/assets/poppin_highres/IMG_6982.jpg";
import culture from "@/assets/poppin_highres/DSC04585.jpg";
import barista from "@/assets/poppin_highres/DSC04838-copy-1.jpg";
import interior from "@/assets/poppin_highres/IMG_7395.jpg";
import poster1 from "@/assets/poppin_highres/INVEST-IN-CULTURE-5.png";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Poppin' Deli" },
      { name: "description", content: "A look inside Poppin' Deli — the food, the culture, the people." },
      { property: "og:title", content: "Gallery — Poppin' Deli" },
    ],
  }),
  component: GalleryPage,
});

const images: { src: string; alt: string; span?: string }[] = [
  { src: hero, alt: "Poppin' Deli brand", span: "row-span-2" },
  { src: brunch, alt: "Brunch club spread" },
  { src: latte, alt: "Latte and brunch plate" },
  { src: interior, alt: "Interior view" },
  { src: culture, alt: "Sneaker culture wall", span: "row-span-2" },
  { src: nowServing, alt: "Now Serving signage" },
  { src: dessert, alt: "House tiramisu" },
  { src: poster1, alt: "Brand poster" },
  { src: barista, alt: "Barista at the espresso machine", span: "row-span-2" },
];

function GalleryPage() {
  return (
    <div>
      <section className="pt-20 pb-12 sm:pt-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 text-center">
          <Reveal>
            <span className="text-terracotta text-sm font-semibold tracking-[0.3em] uppercase">Gallery</span>
            <h1 className="mt-4 font-display text-5xl sm:text-7xl font-bold">In the moment</h1>
            <p className="mt-5 text-muted-foreground max-w-xl mx-auto">A few snapshots from our daily rhythm in Bhopal.</p>
          </Reveal>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[180px] sm:auto-rows-[220px] gap-4">
            {images.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
                whileHover={{ scale: 1.02 }}
                className={`overflow-hidden rounded-2xl ${img.span ?? ""}`}
              >
                <img src={img.src} alt={img.alt} loading="lazy"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
