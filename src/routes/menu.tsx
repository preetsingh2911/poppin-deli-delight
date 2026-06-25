import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Reveal } from "@/components/Reveal";

import brunch from "@/assets/poppin/Brunch-club.jpg";
import latte from "@/assets/poppin/DSC04838-copy-1.jpg";
import dessert from "@/assets/poppin/DSC05478-2-1024x683.jpg";
import barista from "@/assets/poppin/IMG_6984-576x1024.jpg";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — Poppin' Deli, Bhopal" },
      { name: "description", content: "Browse the Poppin' Deli menu: brunch, mains, coffee, and desserts crafted fresh in Bhopal." },
      { property: "og:title", content: "Menu — Poppin' Deli" },
    ],
  }),
  component: MenuPage,
});

const categories = [
  {
    id: "brunch",
    label: "Brunch Club",
    items: [
      { name: "Sunny Eggs Plate", desc: "Sunny-side eggs, sausages, toast and seasonal greens", price: "₹320", img: brunch },
      { name: "Latte & Plate", desc: "House latte paired with the chef's brunch of the day", price: "₹380", img: latte },
      { name: "Tropical Bowl", desc: "Kiwi, berries, granola and a tall glass of fresh juice", price: "₹290", img: brunch },
    ],
  },
  {
    id: "mains",
    label: "Mains",
    items: [
      { name: "Cheese Toastie", desc: "Eggs, mornay sauce, crispy potato sticks on golden toast", price: "₹340", img: brunch },
      { name: "Mexican Plate", desc: "Inspired by the streets of Mexico, served sizzling", price: "₹420", img: brunch },
      { name: "Sweet Potato Fries", desc: "Crisp, savory and slightly sweet — a house favorite", price: "₹220", img: brunch },
    ],
  },
  {
    id: "coffee",
    label: "Coffee Bar",
    items: [
      { name: "Cappuccino", desc: "Espresso, steamed milk, fine velvety foam", price: "₹180", img: latte },
      { name: "Iced Latte", desc: "Double shot pulled over chilled milk and ice", price: "₹220", img: barista },
      { name: "Pop Special", desc: "The barista's choice — ask what's pouring today", price: "₹240", img: barista },
    ],
  },
  {
    id: "desserts",
    label: "Desserts",
    items: [
      { name: "House Tiramisu", desc: "Layered ladyfingers, mascarpone, cocoa dust", price: "₹280", img: dessert },
      { name: "Chocolate Slice", desc: "Rich, fudgy and best with a hot espresso", price: "₹260", img: dessert },
      { name: "Cheesecake", desc: "Light, citrus-kissed and finished with seasonal fruit", price: "₹280", img: dessert },
    ],
  },
];

function MenuPage() {
  const [active, setActive] = useState(categories[0].id);
  const current = categories.find((c) => c.id === active)!;

  return (
    <div>
      <section className="pt-16 pb-12 sm:pt-24 sm:pb-16 bg-cream">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 text-center">
          <Reveal>
            <span className="text-terracotta text-sm font-semibold tracking-[0.3em] uppercase">The menu</span>
            <h1 className="mt-4 font-display text-5xl sm:text-7xl font-bold">Brunch, coffee, repeat.</h1>
            <p className="mt-5 text-muted-foreground max-w-xl mx-auto">
              A short menu, done well. Everything plated fresh, all day.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="sticky top-16 z-30 bg-background/90 backdrop-blur border-b border-border/60">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex gap-2 overflow-x-auto py-4">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setActive(c.id)}
                className={`relative shrink-0 px-5 py-2 text-sm font-medium rounded-full transition-colors ${
                  active === c.id ? "text-primary-foreground" : "text-foreground/70 hover:text-foreground"
                }`}
              >
                {active === c.id && (
                  <motion.span layoutId="menu-pill" className="absolute inset-0 rounded-full bg-terracotta" transition={{ type: "spring", stiffness: 380, damping: 30 }} />
                )}
                <span className="relative">{c.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {current.items.map((item, i) => (
                <motion.article
                  key={item.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  whileHover={{ y: -6 }}
                  className="group bg-card rounded-3xl overflow-hidden border border-border/60 shadow-sm hover:shadow-xl transition-shadow"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={item.img} alt={item.name} width={1024} height={768} loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="font-display text-2xl font-bold">{item.name}</h3>
                      <span className="text-terracotta font-bold text-lg shrink-0">{item.price}</span>
                    </div>
                    <p className="mt-2 text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
