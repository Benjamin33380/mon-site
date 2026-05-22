"use client";

import { motion } from "framer-motion";
import { Wind, Zap, Flame, Wrench } from "lucide-react";

const anchors = [
  { icon: Wind, label: "Climatisation", id: "climatisation" },
  { icon: Zap, label: "Pompe à chaleur", id: "pompe-a-chaleur" },
  { icon: Flame, label: "Chauffage", id: "chauffage" },
  { icon: Wrench, label: "Entretien", id: "entretien" },
];

export default function ServicesHero() {
  return (
    <section className="pt-32 pb-16 bg-gradient-to-b from-slate-900 to-slate-800 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 right-0 w-[400px] h-[400px] rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-accent/10 blur-3xl" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-3">
            Nos services
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5">
            Solutions confort clé en main
          </h1>
          <p className="text-white/60 text-lg leading-relaxed">
            De l&apos;installation à la maintenance, nous couvrons tous vos
            besoins en climatisation, chauffage et pompe à chaleur. Certification
            RGE pour accéder aux aides de l&apos;État.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-3 mt-10"
        >
          {anchors.map((anchor) => (
            <a
              key={anchor.id}
              href={`#${anchor.id}`}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/80 text-sm hover:bg-white/20 transition-colors"
            >
              <anchor.icon className="w-4 h-4" strokeWidth={1.5} />
              {anchor.label}
            </a>
          ))}
        </motion.div>
      </div>

      <div className="absolute bottom-0 inset-x-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
          <path d="M0 60L1440 60L1440 20C1200 60 960 0 720 20C480 40 240 0 0 20L0 60Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
