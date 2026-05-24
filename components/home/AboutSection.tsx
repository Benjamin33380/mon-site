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
          <h2 className="text-4xl sm:text-5xl font-medium uppercase tracking-[0.12em] text-gray-900 leading-tight mb-8">
            ClimGO
          </h2>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="text-lg text-gray-500 leading-relaxed max-w-2xl">
            ClimGO est une entreprise artisanale spécialisée dans l&apos;installation,
            l&apos;entretien et le dépannage de systèmes de climatisation, pompes à chaleur
            et chauffage. Fondée par des professionnels passionnés, notre mission est
            simple : vous garantir le confort toute l&apos;année, avec le sérieux et la
            proximité d&apos;un artisan local.
          </p>
        </FadeIn>

      </div>
    </section>
  );
}
