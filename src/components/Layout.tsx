import { Link, useRouterState } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Menu, X, Camera, MessageCircle, Send } from "lucide-react";
import { motion, AnimatePresence, LayoutGroup } from "motion/react";
import logo from "@/assets/poppin_highres/logo.png";
import { IntroLoader } from "@/components/IntroLoader";
import CardNav from "@/components/CardNav";

const nav = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/about", label: "About" },
  { to: "/gallery", label: "Gallery" },
  { to: "/franchise", label: "Franchise" },
  { to: "/contact", label: "Visit" },
];
const cardNavItems = [
  {
    label: "Explore",
    bgColor: "#CB5A3D",
    textColor: "#F9F6F0",
    links: [
      { label: "Home", href: "/" },
      { label: "Menu", href: "/menu" },
    ]
  },
  {
    label: "Discover", 
    bgColor: "#F9F6F0",
    textColor: "#3A3335",
    links: [
      { label: "About", href: "/about" },
      { label: "Gallery", href: "/gallery" },
    ]
  },
  {
    label: "Connect",
    bgColor: "#3A3335", 
    textColor: "#F9F6F0",
    links: [
      { label: "Franchise", href: "/franchise" },
      { label: "Visit Us", href: "/contact" }
    ]
  }
];

export function Layout({ children }: { children: ReactNode }) {

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <IntroLoader />
      <header className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b border-border/60 min-h-20 flex items-start pt-[10px] justify-center">
        <CardNav
          logo={logo}
          logoAlt="Poppin' Deli Logo"
          items={cardNavItems}
          baseColor="var(--background)"
          menuColor="#3A3335"
          buttonBgColor="#CB5A3D"
          buttonTextColor="#F9F6F0"
          ease="power3.out"
        />
      </header>

      <main className="flex-1">{children}</main>

      <footer className="mt-24 bg-foreground text-background/90">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-14 grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <img src={logo} alt="Poppin' Deli logo" className="h-16 w-auto" />
            </div>
            <p className="mt-4 text-sm text-background/60 max-w-xs">
              A culture-driven cafe in Bhopal — freshly brewed coffee, soul-satisfying food, community always.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-terracotta">Hours</h4>
            <ul className="mt-4 space-y-1.5 text-sm text-background/70">
              <li>Open every day</li>
              <li>11:00 AM – 11:00 PM</li>
              <li className="pt-2 text-background/50">~ ₹800 for two</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-terracotta">Find us</h4>
            <p className="mt-4 text-sm text-background/70">
              265, E2, Arera Colony<br />Bhopal, India
            </p>
            <div className="mt-4 flex gap-3">
              <a href="#" aria-label="Instagram" className="p-2 rounded-full bg-background/10 hover:bg-terracotta transition-colors"><Camera size={16} /></a>
              <a href="#" aria-label="Facebook" className="p-2 rounded-full bg-background/10 hover:bg-terracotta transition-colors"><MessageCircle size={16} /></a>
              <a href="#" aria-label="Twitter" className="p-2 rounded-full bg-background/10 hover:bg-terracotta transition-colors"><Send size={16} /></a>
            </div>
          </div>
        </div>
        <div className="border-t border-background/10 py-5 text-center text-xs text-background/50">
          © {new Date().getFullYear()} Poppin' Deli · Bhopal. Made with care.
        </div>
      </footer>
    </div>
  );
}
