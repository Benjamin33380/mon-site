"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { getConsent, type CookieConsent } from "@/lib/cookieConsent";
import CookieBanner from "@/components/rgpd/CookieBanner";

export default function CookieProvider({ children }: { children: React.ReactNode }) {
  const [consent,  setConsent]  = useState<CookieConsent | null | "loading">("loading");
  const [siteEntered, setSiteEntered] = useState(false);

  useEffect(() => {
    setConsent(getConsent());

    const onEntered = () => setSiteEntered(true);
    window.addEventListener("site:entered", onEntered);
    return () => window.removeEventListener("site:entered", onEntered);
  }, []);

  const handleConsent = (c: CookieConsent) => setConsent(c);

  const showBanner = siteEntered && consent === null;

  return (
    <>
      {children}
      <AnimatePresence>
        {showBanner && <CookieBanner onConsent={handleConsent} />}
      </AnimatePresence>
    </>
  );
}
