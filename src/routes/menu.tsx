import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Reveal } from "@/components/Reveal";

import sandwich from "@/assets/sandwich.jpg";
import salad from "@/assets/salad.jpg";
import coffee from "@/assets/coffee.jpg";
import pastries from "@/assets/pastries.jpg";
import avotoast from "@/assets/avotoast.jpg";
import bowl from "@/assets/bowl.jpg";
import pancakes from "@/assets/pancakes.jpg";
import barista from "@/assets/barista.jpg";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — Poppin Deli" },
      { name: "description", content: "Browse the Poppin Deli menu: sandwiches, salads, breakfast, pastries and coffee." },
      { property: "og:title", content: "Menu — Poppin Deli" },
    ],
  }),
  component: MenuPage,
});

const categories = [
  {
    id: "breakfast",
    label: "Breakfast",
    items: [
      { name: "Avocado Toast", desc: "Sourdough, smashed avocado, poached egg, chili flakes", price: "$9", img: avotoast },
      { name: "Berry Acai Bowl", desc: "Acai, banana, granola, coconut, seasonal berries", price: "$10", img: bowl },
      { name: "Buttermilk Pancakes", desc: "Three fluffy stacks, maple syrup, fresh blueberries", price: "$8", img: pancakes },
    ],
  },
  {
    id: "sandwiches",
    label: "Sandwiches",
    items: [
      { name: "Turkey Stack", desc: "Roast turkey, swiss, lettuce, tomato on ciabatta", price: "$11", img: sandwich },
      { name: "Italian Sub", desc: "Salami, ham, provolone, peppers, oregano vinaigrette", price: "$12", img: sandwich },
      { name: "Veggie Press", desc: "Roasted peppers, mozzarella, pesto, arugula", price: "$10", img: sandwich },
    ],
  },
  {
    id: "salads",
    label: "Salads & Bowls",
    items: [
      { name: "Garden Bowl", desc: "Mixed greens, chicken, avocado, cherry tomato, vinaigrette", price: "$10", img: salad },
      { name: "Greek Plate", desc: "Cucumber, feta, olives, tomato, oregano", price: "$11", img: salad },
      { name: "Quinoa Power", desc: "Quinoa, kale, chickpeas, lemon tahini", price: "$11", img: salad },
    ],
  },
  {
    id: "coffee",
    label: "Coffee & Drinks",
    items: [
      { name: "Pop Latte", desc: "Double espresso, steamed milk, latte art", price: "$5", img: coffee },
      { name: "Cold Brew", desc: "Slow steeped 18 hours, served over ice", price: "$4.5", img: barista },
      { name: "Cappuccino", desc: "Espresso, equal parts milk and foam", price: "$4.5", img: coffee },
    ],
  },
  {
    id: "pastries",
    label: "Pastries",
    items: [
      { name: "Butter Croissant", desc: "Flaky, golden, baked fresh each morning", price: "$3.5", img: pastries },
      { name: "Blueberry Muffin", desc: "Loaded with seasonal berries", price: "$3", img: pastries },
      { name: "Chocolate Danish", desc: "Buttery pastry, dark chocolate batons", price: "$4", img: pastries },
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
            <span className="text-terracotta text-sm font-medium tracking-[0.3em] uppercase">The menu</span>
            <h1 className="mt-4 font-display text-5xl sm:text-7xl font-bold">Made fresh, served warm</h1>
            <p className="mt-5 text-muted-foreground max-w-xl mx-auto">
              A short menu, done well. Everything prepped that morning.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="sticky top-16 z-30 bg-background/90 backdrop-blur border-b border-border/60">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex gap-2 overflow-x-auto py-4 scrollbar-hide">
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
                    <img src={item.img} alt={item.name} width={1024} height={1024} loading="lazy"
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
