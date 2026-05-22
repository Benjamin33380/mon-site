"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, Phone, Flame, Wind } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/services", label: "Nos services" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-border"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex items-center gap-0.5">
              <Wind
                className="w-5 h-5 text-primary transition-transform group-hover:-translate-x-0.5"
                strokeWidth={2.5}
              />
              <Flame
                className="w-5 h-5 text-accent transition-transform group-hover:translate-x-0.5"
                strokeWidth={2.5}
              />
            </div>
            <span
              className={cn(
                "text-xl font-bold tracking-tight transition-colors",
                scrolled ? "text-foreground" : "text-white"
              )}
            >
              Clim<span className="text-accent">GO</span>
            </span>
          </Link>

          {/* Nav desktop */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-colors hover:bg-primary/10 hover:text-primary",
                  scrolled ? "text-foreground" : "text-white/90"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA desktop */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+33XXXXXXXXX"
              className={cn(
                "flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-accent",
                scrolled ? "text-foreground" : "text-white"
              )}
            >
              <Phone className="w-4 h-4" />
              <span>Devis gratuit</span>
            </a>
            <Link
              href="/contact"
              className={cn(buttonVariants({ size: "sm" }), "rounded-full")}
            >
              Prendre RDV
            </Link>
          </div>

          {/* Menu mobile */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <button
                  className={cn(
                    "lg:hidden p-2 rounded-md transition-colors",
                    scrolled ? "text-foreground" : "text-white"
                  )}
                  aria-label="Menu"
                />
              }
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </SheetTrigger>
            <SheetContent side="right" className="w-72 pt-12">
              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="px-4 py-3 rounded-lg text-base font-medium hover:bg-secondary hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="mt-4 pt-4 border-t border-border flex flex-col gap-3">
                  <a
                    href="tel:+33XXXXXXXXX"
                    className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-muted-foreground hover:text-accent transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    Appeler pour un devis
                  </a>
                  <Link
                    href="/contact"
                    onClick={() => setOpen(false)}
                    className={cn(buttonVariants(), "rounded-full")}
                  >
                    Prendre RDV
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
