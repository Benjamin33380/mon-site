import type { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact — Devis gratuit sous 24h",
  description:
    "Demandez votre devis gratuit pour une installation de climatisation, pompe à chaleur ou chauffage. Réponse sous 24h, intervention rapide.",
  alternates: {
    canonical: "https://climgo.fr/contact",
  },
};

const infos = [
  {
    icon: Phone,
    label: "Téléphone",
    value: "+33 X XX XX XX XX",
    href: "tel:+33XXXXXXXXX",
  },
  {
    icon: Mail,
    label: "E-mail",
    value: "contact@climgo.fr",
    href: "mailto:contact@climgo.fr",
  },
  {
    icon: MapPin,
    label: "Zone d'intervention",
    value: "Votre région et alentours",
    href: null,
  },
  {
    icon: Clock,
    label: "Horaires",
    value: "Lun–Ven : 8h–18h · Sam : 9h–13h",
    href: null,
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-b from-slate-900 to-slate-800 relative overflow-hidden">
        <div className="absolute -top-20 right-0 w-[400px] h-[400px] rounded-full bg-primary/15 blur-3xl pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-3">
            Contact
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Demandez votre devis gratuit
          </h1>
          <p className="text-white/60 text-lg max-w-xl">
            Réponse sous 24h garantie. Aucun engagement, aucun frais de déplacement.
          </p>
        </div>
        <div className="absolute bottom-0 inset-x-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
            <path d="M0 60L1440 60L1440 20C1200 60 960 0 720 20C480 40 240 0 0 20L0 60Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Contenu */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Formulaire */}
            <div className="lg:col-span-3">
              <ContactForm />
            </div>

            {/* Infos contact */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <div>
                <h2 className="text-xl font-semibold mb-1">Nos coordonnées</h2>
                <p className="text-sm text-muted-foreground">
                  Vous préférez nous appeler ? Pas de problème.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                {infos.map((info) => (
                  <div key={info.label} className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <info.icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-0.5">
                        {info.label}
                      </p>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="font-medium hover:text-primary transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="font-medium">{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Engagement */}
              <div className="mt-4 p-5 bg-secondary rounded-2xl border border-border">
                <h3 className="font-semibold mb-2">Notre engagement</h3>
                <ul className="text-sm text-muted-foreground flex flex-col gap-2">
                  <li>✅ Devis 100% gratuit, sans engagement</li>
                  <li>✅ Réponse sous 24h ouvrées</li>
                  <li>✅ Artisans certifiés RGE</li>
                  <li>✅ Accompagnement pour les aides de l'État</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
