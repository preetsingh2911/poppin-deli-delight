import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import LottieModule from "lottie-react";

import heroBg from "@/assets/poppin_highres/hero-sunset.png";
import heroPoppinCup from "@/assets/lottie/hero-poppin-cup-nobg.json";

gsap.registerPlugin(ScrollTrigger);

// Handle ESM/CJS default export mismatch during SSR
const Lottie = (LottieModule as any).default || LottieModule;

export function CoffeeHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lottieRef = useRef<any>(null);

  useGSAP(() => {
    // Lottie Scroll Scrub (Pinned)
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 80px", // Pins immediately (accounts for 80px navbar height)
      end: "+=1000", // User must scroll 1000px before the page un-pins and moves down
      pin: true,     // Hero section is locked in place while animating
      scrub: true, // Removed 1.5s easing delay for instant 1:1 scroll response
      onUpdate: (self) => {
        if (lottieRef.current) {
          const totalFrames = lottieRef.current.getDuration(true) || 100;
          // Stop at 85% to prevent the cup from disappearing in the file's outro
          const endFrame = totalFrames * 0.85;
          const frame = self.progress * endFrame;
          lottieRef.current.goToAndStop(frame, true);
        }
      }
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative h-[calc(100svh-80px)] min-h-[520px] sm:h-[92vh] sm:min-h-[700px] overflow-hidden bg-cream flex flex-col sm:block">
      {/* Lottie Animation Cup Overlay — standard flow on mobile, absolute on desktop */}
      <div className="order-2 sm:order-none relative sm:absolute sm:inset-0 pointer-events-none z-20 flex-1 flex items-end justify-center pb-8 sm:items-center sm:justify-end sm:pt-20 md:pr-[5%] lg:pr-[10%] w-full">
        <div className="w-[60%] sm:w-[70%] max-w-[600px] opacity-90 drop-shadow-2xl flex items-end">
          <Lottie 
            lottieRef={lottieRef} 
            animationData={heroPoppinCup} 
            autoplay={false} 
            loop={false} 
          />
        </div>
      </div>

      {/* Hero Content Overlay — top on mobile, bottom on desktop */}
      <motion.div className="order-1 sm:order-none relative sm:absolute sm:inset-0 sm:h-full w-full flex items-start pt-12 sm:items-end sm:pt-0 sm:pb-24 pointer-events-none z-40 flex-shrink-0">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 w-full">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block text-terracotta text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase drop-shadow-sm"
          >
            Arera Colony · Bhopal
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-5 font-display text-5xl sm:text-7xl md:text-8xl font-bold leading-[0.95] max-w-4xl text-foreground"
          >
            Invest in <span className="text-terracotta italic">culture</span><br />&amp; coffee.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 text-muted-foreground text-lg max-w-xl pointer-events-auto"
          >
            A world-class cafe experience for Tier II India — freshly brewed coffee, soul-satisfying food, and a vibrant community.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-9 flex flex-wrap gap-3 pointer-events-auto"
          >
            <Link to="/menu" className="group inline-flex items-center gap-2 rounded-full bg-terracotta text-primary-foreground px-6 py-3.5 font-medium hover:opacity-90 transition-all hover:scale-105 shadow-xl shadow-terracotta/20">
              See the menu <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-foreground/20 text-foreground px-6 py-3.5 font-medium hover:bg-foreground/5 transition-colors">
              Visit us
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
