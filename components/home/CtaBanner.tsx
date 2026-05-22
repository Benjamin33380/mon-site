"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function CtaBanner() {
  return (
    <section className="py-24 bg-foreground">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Prêt à changer votre confort ?
          </h2>
          <p className="text-white/60 text-lg mb-10 max-w-xl mx-auto">
            Obtenez votre devis gratuit en moins de 24h. Aucun engagement.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ size: "lg" }),
                "rounded-full gap-2 bg-accent hover:bg-accent/90 text-white shadow-lg shadow-accent/30"
              )}
            >
              Demander un devis
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:+33XXXXXXXXX"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "rounded-full gap-2 border-white/20 text-white hover:bg-white/10 bg-transparent"
              )}
            >
              <Phone className="w-4 h-4" />
              Appeler directement
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
