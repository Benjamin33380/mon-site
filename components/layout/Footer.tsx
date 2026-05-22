import Link from "next/link";
import { Wind, Flame, Phone, Mail, MapPin, Share2, MessageSquareShare } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const services = [
  { href: "/services#climatisation", label: "Climatisation" },
  { href: "/services#pompe-a-chaleur", label: "Pompe à chaleur" },
  { href: "/services#chauffage", label: "Chauffage" },
  { href: "/services#entretien", label: "Entretien & maintenance" },
];

const pages = [
  { href: "/", label: "Accueil" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Marque */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <Wind className="w-5 h-5 text-primary" strokeWidth={2.5} />
              <Flame className="w-5 h-5 text-accent" strokeWidth={2.5} />
              <span className="text-xl font-bold tracking-tight text-white">
                Clim<span className="text-accent">GO</span>
              </span>
            </Link>
            <p className="text-sm text-background/60 leading-relaxed">
              Spécialiste en climatisation, pompe à chaleur et chauffage.
              Devis gratuit, intervention rapide.
            </p>
            <div className="flex gap-3 mt-5">
              <a
                href="#"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Share2 className="w-4 h-4" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors"
              >
                <MessageSquareShare className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-background/40 mb-4">
              Services
            </h3>
            <ul className="flex flex-col gap-2">
              {services.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="text-sm text-background/70 hover:text-accent transition-colors"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Pages */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-background/40 mb-4">
              Navigation
            </h3>
            <ul className="flex flex-col gap-2">
              {pages.map((p) => (
                <li key={p.href}>
                  <Link
                    href={p.href}
                    className="text-sm text-background/70 hover:text-primary transition-colors"
                  >
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-background/40 mb-4">
              Contact
            </h3>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="tel:+33XXXXXXXXX"
                  className="flex items-center gap-2 text-sm text-background/70 hover:text-accent transition-colors"
                >
                  <Phone className="w-4 h-4 shrink-0" />
                  <span>+33 X XX XX XX XX</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@climgo.fr"
                  className="flex items-center gap-2 text-sm text-background/70 hover:text-accent transition-colors"
                >
                  <Mail className="w-4 h-4 shrink-0" />
                  <span>contact@climgo.fr</span>
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-background/70">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                <span>Votre région, France</span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-10 bg-white/10" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-background/40">
          <p>© {new Date().getFullYear()} ClimGO. Tous droits réservés.</p>
          <div className="flex gap-4">
            <Link href="/mentions-legales" className="hover:text-background/70 transition-colors">
              Mentions légales
            </Link>
            <Link href="/politique-de-confidentialite" className="hover:text-background/70 transition-colors">
              Confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
