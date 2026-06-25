import { Link, useRouterState } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Menu, X, Camera, MessageCircle, Send } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import logo from "@/assets/poppin_highres/logo.png";

const nav = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/about", label: "About" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Visit" },
];

export function Layout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b border-border/60">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <img src={logo} alt="Poppin' Deli logo" className="h-16 w-auto group-hover:scale-105 transition-transform" />
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {nav.map((item) => {
              const active = pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors ${active ? "text-terracotta" : "text-foreground/70 hover:text-foreground"}`}
                >
                  {item.label}
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-mustard/40"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>
          <button className="md:hidden p-2 -mr-2" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden border-t border-border/60"
            >
              <div className="px-5 py-3 flex flex-col">
                {nav.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="py-3 text-base font-medium border-b border-border/40 last:border-0"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
