"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Wind, Zap, Flame, Wrench, CheckCircle2, ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const services = [
  {
    id: "climatisation",
    icon: Wind,
    color: "text-primary",
    bgGradient: "from-primary/5 to-primary/10",
    badge: "Installation & entretien",
    title: "Climatisation réversible",
    description:
      "Fraîcheur en été, chaleur en hiver. Nos climatiseurs réversibles offrent confort et économies toute l'année. Nous intervenons sur toutes les marques : Daikin, Mitsubishi, Atlantic, Fujitsu...",
    features: [
      "Bilan thermique gratuit avant installation",
      "Pose propre et discrète, peinture préservée",
      "Mise en service et formation incluses",
      "Garantie pièces & main d'œuvre",
    ],
    cta: "Demander un devis clim",
  },
  {
    id: "pompe-a-chaleur",
    icon: Zap,
    color: "text-green-600",
    bgGradient: "from-green-50 to-emerald-50",
    badge: "Éligible MaPrimeRénov'",
    title: "Pompe à chaleur",
    description:
      "La PAC est la solution la plus économique pour se chauffer et refroidir. Air/air ou air/eau, elle capte les calories extérieures pour les redistribuer. Jusqu'à 75% d'économies sur votre facture.",
    features: [
      "PAC air/air et air/eau",
      "Aide MaPrimeRénov' jusqu'à 4 000 €",
      "CEE (Certificats d'Économie d'Énergie)",
      "Financement sans frais disponible",
    ],
    cta: "Simuler mes aides",
  },
  {
    id: "chauffage",
    icon: Flame,
    color: "text-accent",
    bgGradient: "from-orange-50 to-amber-50",
    badge: "Fioul · Gaz · Électrique",
    title: "Chauffage",
    description:
      "Remplacement de chaudière, installation de radiateurs ou plancher chauffant — nous maîtrisons toutes les solutions de chauffage. Conseils sur la transition vers des solutions plus économiques.",
    features: [
      "Chaudières gaz et fioul toutes marques",
      "Chaudières à condensation haute efficacité",
      "Remplacement et mise aux normes",
      "Contrats de maintenance annuels",
    ],
    cta: "Demander un devis chauffage",
  },
  {
    id: "entretien",
    icon: Wrench,
    color: "text-slate-600",
    bgGradient: "from-slate-50 to-gray-50",
    badge: "Dépannage rapide",
    title: "Entretien & dépannage",
    description:
      "Un équipement bien entretenu dure deux fois plus longtemps et consomme moins. Nos techniciens interviennent pour la maintenance préventive et les dépannages d'urgence.",
    features: [
      "Contrat d'entretien annuel toutes marques",
      "Nettoyage filtres & circuits frigorifiques",
      "Dépannage sous 24-48h",
      "Rapport d'intervention détaillé",
    ],
    cta: "Prendre RDV entretien",
  },
];

export default function ServicesList() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-20">
        {services.map((service, i) => (
          <motion.div
            key={service.id}
            id={service.id}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
              i % 2 === 1 ? "lg:grid-flow-col-dense" : ""
            }`}
          >
            {/* Illustration / carte */}
            <div className={`${i % 2 === 1 ? "lg:col-start-2" : ""}`}>
              <div
                className={`rounded-3xl bg-gradient-to-br ${service.bgGradient} p-10 flex items-center justify-center aspect-square max-w-sm mx-auto lg:mx-0`}
              >
                <service.icon
                  className={`w-24 h-24 ${service.color}`}
                  strokeWidth={1}
                />
              </div>
            </div>

            {/* Contenu */}
            <div className={i % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}>
              <Badge variant="secondary" className="mb-4">
                {service.badge}
              </Badge>
              <h2 className="text-3xl font-bold text-foreground mb-4">
                {service.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {service.description}
              </p>
              <ul className="flex flex-col gap-2 mb-8">
                {service.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <CheckCircle2
                      className={`w-4 h-4 ${service.color} shrink-0 mt-0.5`}
                    />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className={cn(buttonVariants(), "rounded-full gap-2")}
              >
                {service.cta}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
