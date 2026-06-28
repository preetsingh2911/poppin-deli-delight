import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { StrokeReveal } from "@/components/StrokeReveal";
import { motion } from "motion/react";
import Masonry from "@/components/Masonry";

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

      <StrokeReveal text="Daily Rhythm" />

      <section className="pb-24 pt-8">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 min-h-[80vh]">
          <Masonry
            items={images.map((img, i) => ({
              id: String(i + 1),
              img: img.src,
              height: img.span === "row-span-2" ? 700 : 400,
            }))}
            ease="power3.out"
            duration={0.6}
            stagger={0.05}
            animateFrom="bottom"
            scaleOnHover={true}
            hoverScale={0.98}
            blurToFocus={true}
            colorShiftOnHover={false}
          />
        </div>
      </section>
    </div>
  );
}
