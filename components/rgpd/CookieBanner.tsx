"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { acceptAll, rejectAll, type CookieConsent } from "@/lib/cookieConsent";
import CookieModal from "./CookieModal";

interface Props {
  onConsent: (consent: CookieConsent) => void;
}

export default function CookieBanner({ onConsent }: Props) {
  const [showModal, setShowModal] = useState(false);

  const handleAccept = useCallback(() => {
    onConsent(acceptAll());
  }, [onConsent]);

  const handleReject = useCallback(() => {
    onConsent(rejectAll());
  }, [onConsent]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 24 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        role="dialog"
        aria-modal="true"
        aria-label="Gestion des cookies"
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[10000] w-[calc(100vw-2rem)] max-w-2xl"
      >
        <div className="rounded-2xl border border-white/10 bg-black/90 backdrop-blur-xl shadow-2xl shadow-black/60 p-6">
          {/* En-tête */}
          <div className="flex items-start gap-3 mb-4">
            <span className="text-xl mt-0.5" aria-hidden>🍪</span>
            <div>
              <p className="text-white font-semibold text-sm mb-1">
                Ce site utilise des cookies
              </p>
              <p className="text-gray-400 text-xs leading-relaxed">
                Nous utilisons des cookies essentiels au fonctionnement du site et, avec votre
                consentement, des cookies analytiques pour mesurer l&apos;audience.
                Conformément à la{" "}
                <a
                  href="https://www.cnil.fr/fr/cookies-et-autres-traceurs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 underline underline-offset-2 hover:text-blue-300"
                >
                  réglementation CNIL
                </a>
                , vous pouvez accepter, refuser ou personnaliser vos choix à tout moment.
              </p>
            </div>
          </div>

          {/* Boutons — équiprominence imposée par la CNIL */}
          <div className="flex flex-wrap gap-2 justify-end">
            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2 rounded-full text-xs font-medium text-gray-400 border border-white/10 hover:border-white/25 hover:text-white transition-colors"
            >
              Personnaliser
            </button>
            <button
              onClick={handleReject}
              className="px-4 py-2 rounded-full text-xs font-medium text-white border border-white/20 hover:bg-white/10 transition-colors"
            >
              Tout refuser
            </button>
            <button
              onClick={handleAccept}
              className="px-4 py-2 rounded-full text-xs font-medium bg-white text-black hover:bg-gray-100 transition-colors"
            >
              Tout accepter
            </button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showModal && (
          <CookieModal
            onSave={(consent) => {
              setShowModal(false);
              onConsent(consent);
            }}
            onClose={() => setShowModal(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
