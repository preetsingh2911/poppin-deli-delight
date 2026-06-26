import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

import nowServing from "@/assets/poppin_highres/IMG_6982.jpg";
import interior from "@/assets/poppin_highres/DSC04585.jpg";

gsap.registerPlugin(ScrollTrigger);

export function BentoGrid() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Select all elements with the 'bento-item' class
    const items = gsap.utils.toArray(".bento-item") as HTMLElement[];
    
    // Aggressive, staggered entrance animation
    gsap.from(items, {
      y: 50,
      opacity: 0,
      duration: 1.2,
      ease: "power4.out",
      stagger: 0.1,
      scrollTrigger: {
        trigger: container.current,
        start: "top 80%", // Fire when top of grid hits 80% of viewport
        toggleActions: "play none none reverse", // Play forward on enter, reverse on leave back
      }
    });
  }, { scope: container });

  return (
    <section className="py-24 sm:py-32 bg-cream">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-terracotta text-sm font-semibold tracking-[0.25em] uppercase">Highlights</span>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl font-bold">House Favorites</h2>
          </div>
          <Link to="/menu" className="inline-flex items-center gap-2 font-medium hover:text-terracotta transition-colors">
            View full menu <ArrowRight size={18} />
          </Link>
        </div>

        <div ref={container} className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-4 md:h-[600px]">
          
          {/* Card 1: Large Image Feature (Span 2x2) */}
          <div className="bento-item md:col-span-2 md:row-span-2 relative rounded-3xl overflow-hidden group shadow-lg border border-border/20">
            <img 
              src={nowServing} 
              alt="Specialty Coffee" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 p-8 text-primary-foreground">
              <h3 className="font-display text-3xl font-bold">Single-Origin Pulls</h3>
              <p className="mt-2 text-primary-foreground/80">Every shot pulled with precision.</p>
            </div>
          </div>

          {/* Card 2: Small Text Card (Span 1x1) */}
          <div className="bento-item md:col-span-1 md:row-span-1 bg-forest text-background rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-lg hover:shadow-xl transition-shadow border border-border/20">
            <span className="text-3xl">🍕</span>
            <div>
              <h3 className="font-display text-xl font-bold">Wood-fired</h3>
              <p className="text-sm opacity-80 mt-1">Authentic crusts</p>
            </div>
          </div>

          {/* Card 3: Tall Card (Span 1x2) */}
          <div className="bento-item md:col-span-1 md:row-span-2 bg-mustard text-foreground rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-lg relative overflow-hidden group border border-border/20">
            <div className="relative z-10">
              <h3 className="font-display text-2xl font-bold leading-tight">Korean<br />Tapas</h3>
              <p className="mt-2 opacity-80 text-sm leading-relaxed">Spicy, sweet, and perfectly crunchy.</p>
            </div>
            <div className="relative z-10 mt-8">
              <Link to="/menu" className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-foreground text-background group-hover:scale-110 transition-transform">
                <ArrowRight size={20} />
              </Link>
            </div>
            {/* Decorative circle */}
            <div className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full border-[1.5rem] border-terracotta/20 pointer-events-none group-hover:scale-110 transition-transform duration-700" />
          </div>

          {/* Card 4: Wide Image/Text Card (Span 2x1) */}
          <div className="bento-item md:col-span-2 md:row-span-1 bg-terracotta text-primary-foreground rounded-3xl p-6 sm:p-8 flex items-center justify-between shadow-lg group overflow-hidden relative border border-border/20">
            <div className="relative z-10">
              <h3 className="font-display text-2xl font-bold">Matcha Lattes</h3>
              <p className="opacity-80 mt-1 text-sm">Ceremonial grade goodness.</p>
            </div>
            <div className="relative z-10 shrink-0 w-16 h-16 rounded-full bg-primary-foreground/10 flex items-center justify-center backdrop-blur-md border border-primary-foreground/20">
               <span className="text-2xl">🍵</span>
            </div>
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 transform -rotate-12 pointer-events-none" />
          </div>

          {/* Card 5: Small Image Card (Span 1x1) */}
          <div className="bento-item md:col-span-1 md:row-span-1 relative rounded-3xl overflow-hidden shadow-lg group border border-border/20">
            <img 
              src={interior} 
              alt="Interior" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-black/30 pointer-events-none group-hover:bg-black/10 transition-colors" />
          </div>

        </div>
      </div>
    </section>
  );
}
