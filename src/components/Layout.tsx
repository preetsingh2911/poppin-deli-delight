import { Link, useRouterState } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Menu, X, Instagram, Facebook, Twitter } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

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
        <div className="mx-auto max-w-7xl px-5 sm:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-terracotta text-primary-foreground font-display text-lg font-bold group-hover:rotate-12 transition-transform">P</span>
            <span className="font-display text-xl font-bold tracking-tight">Poppin Deli</span>
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
              <span className="grid h-9 w-9 place-items-center rounded-full bg-terracotta text-primary-foreground font-display text-lg font-bold">P</span>
              <span className="font-display text-xl font-bold">Poppin Deli</span>
            </div>
            <p className="mt-4 text-sm text-background/60 max-w-xs">
              Fresh, honest food served all day in a neighborhood spot you'll keep coming back to.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-mustard">Hours</h4>
            <ul className="mt-4 space-y-1.5 text-sm text-background/70">
              <li>Mon–Fri · 7:00 – 19:00</li>
              <li>Saturday · 8:00 – 20:00</li>
              <li>Sunday · 9:00 – 17:00</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-mustard">Find us</h4>
            <p className="mt-4 text-sm text-background/70">
              42 Baker Lane<br />Downtown · Open daily
            </p>
            <div className="mt-4 flex gap-3">
              <a href="#" aria-label="Instagram" className="p-2 rounded-full bg-background/10 hover:bg-terracotta transition-colors"><Instagram size={16} /></a>
              <a href="#" aria-label="Facebook" className="p-2 rounded-full bg-background/10 hover:bg-terracotta transition-colors"><Facebook size={16} /></a>
              <a href="#" aria-label="Twitter" className="p-2 rounded-full bg-background/10 hover:bg-terracotta transition-colors"><Twitter size={16} /></a>
            </div>
          </div>
        </div>
        <div className="border-t border-background/10 py-5 text-center text-xs text-background/50">
          © {new Date().getFullYear()} Poppin Deli. Made with care.
        </div>
      </footer>
    </div>
  );
}
