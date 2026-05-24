"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function AboutSection() {
  return (
    <section className="bg-white text-gray-900 py-28 px-4">
      <div className="max-w-6xl mx-auto max-w-3xl">

        <FadeIn>
          <p className="text-xs uppercase tracking-[0.35em] text-gray-400 font-medium mb-4">
            À propos
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h2 className="text-4xl sm:text-5xl font-medium tracking-[0.12em] text-gray-900 leading-tight mb-8">
            CLIMGO
          </h2>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="text-lg text-gray-500 leading-relaxed max-w-2xl">
            CLIMGO est un artisan RGE indépendant basé sur le Bassin d&apos;Arcachon.
            Spécialisés dans la climatisation, les pompes à chaleur et le chauffage,
            nous intervenons chez vous avec réactivité et savoir-faire. Pas
            d&apos;intermédiaire, pas de sous-traitance — juste un professionnel certifié
            qui s&apos;engage sur chaque chantier.
          </p>
        </FadeIn>

      </div>
    </section>
  );
}
