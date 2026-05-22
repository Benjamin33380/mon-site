"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Clock, Star, Banknote } from "lucide-react";

const reasons = [
  {
    icon: ShieldCheck,
    title: "Certifiés RGE",
    description:
      "Qualification reconnue pour accéder aux aides de l'État (MaPrimeRénov', CEE).",
  },
  {
    icon: Clock,
    title: "Réactivité garantie",
    description:
      "Devis sous 24h, intervention planifiée sous 48h. En urgence, on s'adapte.",
  },
  {
    icon: Star,
    title: "+ de 500 clients satisfaits",
    description:
      "Note moyenne de 4,9/5 sur Google. Des milliers de m² installés en région.",
  },
  {
    icon: Banknote,
    title: "Aides & financement",
    description:
      "On vous accompagne dans vos demandes d'aides (MaPrimeRénov', Éco-PTZ, CEE).",
  },
];

export default function WhyUs() {
  return (
    <section className="py-24 bg-secondary/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Texte */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
              Pourquoi ClimGO ?
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Des artisans locaux qui
              <span className="text-primary"> s&apos;engagent</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Nous sommes une entreprise artisanale, pas un grand groupe. Ça veut
              dire : un interlocuteur unique, des délais tenus, et un travail soigné
              dont on est fiers. Chaque installation est réalisée dans les règles de
              l&apos;art.
            </p>
          </motion.div>

          {/* Grid avantages */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {reasons.map((reason, i) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-white rounded-2xl p-5 shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                  <reason.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{reason.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {reason.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
