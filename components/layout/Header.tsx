"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/services", label: "Services" },
  { href: "/entreprise", label: "Entreprise" },
  { href: "/actualites", label: "Actualités" },
];

type Position = { left: number; width: number; opacity: number };

function NavMenu() {
  const [position, setPosition] = useState<Position>({ left: 0, width: 0, opacity: 0 });

  return (
    <ul
      className="relative flex items-stretch w-fit rounded-full border border-white/20 bg-white/10 backdrop-blur-sm p-1"
      onMouseLeave={() => setPosition((pv) => ({ ...pv, opacity: 0 }))}
    >
      {navLinks.map((link) => (
        <Tab key={link.href} href={link.href} setPosition={setPosition}>
          {link.label}
        </Tab>
      ))}
      <Cursor position={position} />
    </ul>
  );
}

function Tab({
  children,
  href,
  setPosition,
}: {
  children: React.ReactNode;
  href: string;
  setPosition: React.Dispatch<React.SetStateAction<Position>>;
}) {
  const ref = useRef<HTMLLIElement>(null);

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return;
        const { width, height } = ref.current.getBoundingClientRect();
        setPosition({ width, opacity: 1, left: ref.current.offsetLeft });
        ref.current.style.setProperty("--tab-h", `${height}px`);
      }}
      className="relative z-10 block cursor-pointer px-3 py-1 text-[11px] uppercase text-white tracking-[0.25em] font-medium"
    >
      <Link href={href}>{children}</Link>
    </li>
  );
}

function Cursor({ position }: { position: Position }) {
  return (
    <motion.li
      animate={position}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="absolute z-0 top-1 bottom-1 rounded-full bg-white/20"
    />
  );
}

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full">

      {/* Dégradé de fond pour lisibilité */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-transparent pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Barre supérieure : tel — email */}
        <div className="flex items-center justify-between h-10">
          <a
            href="tel:0766460008"
            className="text-xs text-white/70 hover:text-white transition-colors font-medium"
          >
            +33 (0)7 66 46 00 08
          </a>
          <a
            href="mailto:contact@climgo.fr"
            className="text-xs text-white/70 hover:text-white transition-colors font-medium"
          >
            contact@climgo.fr
          </a>
        </div>

        <div className="h-px w-full opacity-20 bg-white/30" />

        {/* Barre principale : nav animée */}
        <div className="flex items-center justify-end h-16 sm:h-20">

          {/* Nav animée (desktop) */}
          <div className="hidden md:block">
            <NavMenu />
          </div>

          {/* Hamburger mobile */}
          <button className="md:hidden p-2 text-white" aria-label="Menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

        </div>
      </div>

    </header>
  );
}
