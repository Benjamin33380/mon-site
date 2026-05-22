"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "Quels sont les délais pour une installation de climatisation ?",
    a: "En général, nous intervenons sous 1 à 2 semaines après validation du devis. En haute saison (juin-août), prévoir 3 semaines. Pour les urgences, nous faisons notre maximum pour intervenir plus rapidement.",
  },
  {
    q: "Quelles aides sont disponibles pour une pompe à chaleur ?",
    a: "Plusieurs dispositifs existent : MaPrimeRénov' (jusqu'à 4 000 € selon revenus), les CEE (Certificats d'Économie d'Énergie), la TVA réduite à 5,5 % et l'Éco-PTZ pour financer le reste. Nous vous accompagnons dans toutes vos démarches.",
  },
  {
    q: "Intervenez-vous en urgence pour les pannes ?",
    a: "Oui, nous proposons un service de dépannage prioritaire. Pour nos clients sous contrat de maintenance, nous garantissons une intervention sous 24h. Pour les autres, nous faisons tout pour intervenir sous 48h.",
  },
  {
    q: "Quelle marque de climatisation recommandez-vous ?",
    a: "Nous travaillons principalement avec Daikin, Mitsubishi Electric et Atlantic, reconnus pour leur fiabilité et leur efficacité énergétique. Nous adapter à vos préférences ou à des contraintes budgétaires spécifiques.",
  },
  {
    q: "Le devis est-il vraiment gratuit ?",
    a: "Oui, totalement gratuit et sans engagement. Nous nous déplaçons pour évaluer vos besoins, réaliser un bilan thermique et vous proposer la solution la plus adaptée à votre logement et votre budget.",
  },
];

export default function ServicesFaq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-20 bg-secondary/30">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
            FAQ
          </p>
          <h2 className="text-3xl font-bold text-foreground">
            Questions fréquentes
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl overflow-hidden shadow-sm"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 p-5 text-left font-medium hover:text-primary transition-colors"
              >
                <span>{faq.q}</span>
                {open === i ? (
                  <Minus className="w-4 h-4 shrink-0 text-primary" />
                ) : (
                  <Plus className="w-4 h-4 shrink-0 text-muted-foreground" />
                )}
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  >
                    <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
