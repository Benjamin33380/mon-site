"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { Wind, Zap, Flame, Wrench, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    icon: Wind,
    title: "Climatisation",
    description:
      "Installation et entretien de systèmes climatisation réversibles. Toutes marques, toutes surfaces.",
    href: "/services#climatisation",
    color: "text-primary",
    bg: "bg-primary/5",
  },
  {
    icon: Zap,
    title: "Pompe à chaleur",
    description:
      "PAC air/air, air/eau — économisez jusqu'à 75% sur votre facture d'énergie avec les aides de l'État.",
    href: "/services#pompe-a-chaleur",
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    icon: Flame,
    title: "Chauffage",
    description:
      "Chaudières fioul, gaz, électrique. Installation, remplacement et mise aux normes.",
    href: "/services#chauffage",
    color: "text-accent",
    bg: "bg-accent/5",
  },
  {
    icon: Wrench,
    title: "Entretien & dépannage",
    description:
      "Contrats de maintenance annuels et interventions d'urgence. Réponse sous 24h.",
    href: "/services#entretien",
    color: "text-slate-600",
    bg: "bg-slate-50",
  },
];

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.33, 1, 0.68, 1] } },
};

export default function ServicesPreview() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-3">
            Ce qu'on fait
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Tous vos besoins, un seul artisan
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Du confort en été comme en hiver — nous installons, réparons et
            entretenons vos équipements de climatisation et chauffage.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service) => (
            <motion.div key={service.title} variants={item}>
              <Link href={service.href} className="group block h-full">
                <Card className="h-full border-0 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <CardContent className="p-6 flex flex-col gap-4">
                    <div className={`w-12 h-12 rounded-xl ${service.bg} flex items-center justify-center`}>
                      <service.icon className={`w-6 h-6 ${service.color}`} strokeWidth={1.5} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-2">
                        {service.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                    <span className={`text-sm font-medium flex items-center gap-1 ${service.color} group-hover:gap-2 transition-all`}>
                      En savoir plus <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
