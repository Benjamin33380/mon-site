"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { saveConsent, type ConsentChoice, type CookieConsent } from "@/lib/cookieConsent";

interface Category {
  id:          "essential" | "analytics" | "marketing";
  label:       string;
  description: string;
  required:    boolean;
}

const CATEGORIES: Category[] = [
  {
    id:          "essential",
    label:       "Cookies essentiels",
    description: "Nécessaires au fonctionnement du site (session, sécurité, préférences de base). Ils ne peuvent pas être désactivés.",
    required:    true,
  },
  {
    id:          "analytics",
    label:       "Cookies analytiques",
    description: "Nous permettent de mesurer l'audience et d'améliorer nos services (ex : nombre de visites, pages consultées). Aucune donnée personnelle identifiable n'est transmise à des tiers sans votre accord.",
    required:    false,
  },
  {
    id:          "marketing",
    label:       "Cookies marketing",
    description: "Utilisés pour vous proposer des publicités personnalisées sur d'autres sites. Désactivés par défaut.",
    required:    false,
  },
];

interface Props {
  onSave:  (consent: CookieConsent) => void;
  onClose: () => void;
}

function Toggle({ enabled, onChange, disabled }: { enabled: boolean; onChange: (v: boolean) => void; disabled?: boolean }) {
  return (
    <button
      role="switch"
      aria-checked={enabled}
      onClick={() => !disabled && onChange(!enabled)}
      disabled={disabled}
      className={`relative inline-flex h-6 w-11 shrink-0 rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 ${
        disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"
      } ${enabled ? "bg-white" : "bg-white/15"}`}
    >
      <span
        className={`pointer-events-none inline-block h-5 w-5 mt-0.5 rounded-full shadow transform transition-transform duration-200 ${
          enabled ? "translate-x-5 bg-black" : "translate-x-0.5 bg-white/60"
        }`}
      />
    </button>
  );
}

export default function CookieModal({ onSave, onClose }: Props) {
  const [analytics, setAnalytics] = useState<boolean>(false);
  const [marketing, setMarketing] = useState<boolean>(false);

  const handleSave = () => {
    const consent = saveConsent(
      analytics ? "granted" : "denied",
      marketing ? "granted" : "denied",
    );
    onSave(consent);
  };

  const getChoice = (id: Category["id"]): boolean => {
    if (id === "essential") return true;
    if (id === "analytics") return analytics;
    return marketing;
  };

  const setChoice = (id: Category["id"], value: boolean) => {
    if (id === "analytics") setAnalytics(value);
    if (id === "marketing") setMarketing(value);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[10001] flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 32, scale: 0.97 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#0d0d0d] shadow-2xl shadow-black/80 overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Personnaliser les cookies"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/8">
          <h2 className="text-white font-semibold text-sm">Personnaliser les cookies</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-white transition-colors p-1"
            aria-label="Fermer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Catégories */}
        <div className="px-6 py-4 space-y-5 max-h-[60vh] overflow-y-auto">
          <p className="text-gray-500 text-xs leading-relaxed">
            Sélectionnez les catégories de cookies que vous acceptez. Votre choix est conservé
            pendant <strong className="text-gray-300">30 minutes</strong>. Vous pouvez modifier vos préférences à tout moment.
          </p>

          {CATEGORIES.map((cat) => (
            <div key={cat.id} className="flex items-start gap-4">
              <div className="flex-1">
                <p className="text-white text-xs font-medium mb-1">{cat.label}</p>
                <p className="text-gray-500 text-xs leading-relaxed">{cat.description}</p>
                {cat.required && (
                  <span className="inline-block mt-1.5 text-[10px] text-gray-600 border border-white/8 rounded px-1.5 py-0.5">
                    Toujours actif
                  </span>
                )}
              </div>
              <div className="mt-0.5 shrink-0">
                <Toggle
                  enabled={getChoice(cat.id)}
                  onChange={(v) => setChoice(cat.id, v)}
                  disabled={cat.required}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex flex-wrap gap-2 justify-between items-center px-6 py-4 border-t border-white/8">
          <a
            href="/politique-de-confidentialite"
            className="text-[11px] text-gray-600 hover:text-gray-400 underline underline-offset-2 transition-colors"
          >
            Politique de confidentialité
          </a>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-full text-xs font-medium text-gray-400 border border-white/10 hover:text-white transition-colors"
            >
              Annuler
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded-full text-xs font-medium bg-white text-black hover:bg-gray-100 transition-colors"
            >
              Enregistrer mes choix
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
