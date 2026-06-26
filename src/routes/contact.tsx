import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { StrokeReveal } from "@/components/StrokeReveal";
import { MapPin, Clock, Star, Navigation } from "lucide-react";
import interior from "@/assets/poppin_highres/DSC04585.jpg";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Visit — Poppin' Deli, Bhopal" },
      { name: "description", content: "Find Poppin' Deli at 265, E2, Arera Colony, Bhopal. Open 11 AM to 11 PM, every day." },
      { property: "og:title", content: "Visit Poppin' Deli" },
    ],
  }),
  component: ContactPage,
});

const info = [
  { icon: MapPin, title: "Address", lines: ["265, E2", "Arera Colony, Bhopal"] },
  { icon: Clock, title: "Hours", lines: ["Open every day", "11:00 AM – 11:00 PM"] },
  { icon: Star, title: "Rating", lines: ["4.5 ★ on Google", "366+ reviews"] },
  { icon: Navigation, title: "Approx. cost", lines: ["₹800 for two", "Dine-in · Takeaway"] },
];

function ContactPage() {
  return (
    <div>
      <section className="pt-20 pb-16 sm:pt-28">
        <div className="mx-auto max-w-4xl px-5 sm:px-8 text-center">
          <Reveal>
            <span className="text-terracotta text-sm font-semibold tracking-[0.3em] uppercase">Visit</span>
            <h1 className="mt-4 font-display text-5xl sm:text-7xl font-bold">Come say hi</h1>
            <p className="mt-5 text-muted-foreground max-w-xl mx-auto">No reservations needed — just walk in.</p>
          </Reveal>
        </div>
      </section>

      <section className="pb-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 grid lg:grid-cols-2 gap-10">
          <Reveal>
            <div className="overflow-hidden rounded-3xl h-full min-h-[400px]">
              <img src={interior} alt="Poppin' Deli interior" width={1024} height={995} loading="lazy"
                className="w-full h-full object-cover" />
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="grid sm:grid-cols-2 gap-5">
              {info.map((item) => (
                <div key={item.title} className="p-6 rounded-2xl bg-cream border border-border/60">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-terracotta text-primary-foreground">
                    <item.icon size={20} />
                  </div>
                  <h3 className="mt-4 font-display text-xl font-bold">{item.title}</h3>
                  <div className="mt-2 text-sm text-muted-foreground space-y-1">
                    {item.lines.map((l) => <div key={l}>{l}</div>)}
                  </div>
                </div>
              ))}
            </div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Poppin+Deli+Arera+Colony+Bhopal"
              target="_blank" rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-terracotta text-primary-foreground px-6 py-3.5 font-medium hover:opacity-90 transition-opacity"
            >
              <Navigation size={18} /> Get directions
            </a>
          </Reveal>
        </div>
      </section>

      <StrokeReveal text="Locate Us" className="bg-cream" />

      <section className="pb-24 pt-12 bg-cream">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <div className="overflow-hidden rounded-3xl border border-border/60">
              <iframe
                title="Map of Poppin' Deli, Arera Colony, Bhopal"
                src="https://www.openstreetmap.org/export/embed.html?bbox=77.42%2C23.21%2C77.46%2C23.24&layer=mapnik&marker=23.225%2C77.44"
                className="w-full h-[400px] block"
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
