// Durée de validité du consentement : 13 mois (recommandation CNIL)
const CONSENT_KEY    = "climgo_cookie_consent";
const CONSENT_MAX_MS = 30 * 60 * 1000;

export type ConsentChoice = "granted" | "denied";

export interface CookieConsent {
  version:   number;         // permet d'invalider un ancien consentement si les finalités changent
  savedAt:   number;         // timestamp de sauvegarde (ms)
  essential: true;           // toujours actif, pas de choix possible
  analytics: ConsentChoice;  // mesure d'audience (ex: Google Analytics)
  marketing: ConsentChoice;  // publicité ciblée
}

const CURRENT_VERSION = 1;

export function getConsent(): CookieConsent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed: CookieConsent = JSON.parse(raw);
    // Invalider si trop ancien ou version dépassée
    if (
      parsed.version !== CURRENT_VERSION ||
      Date.now() - parsed.savedAt > CONSENT_MAX_MS
    ) {
      localStorage.removeItem(CONSENT_KEY);
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function saveConsent(analytics: ConsentChoice, marketing: ConsentChoice): CookieConsent {
  const consent: CookieConsent = {
    version:   CURRENT_VERSION,
    savedAt:   Date.now(),
    essential: true,
    analytics,
    marketing,
  };
  localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
  return consent;
}

export function acceptAll(): CookieConsent {
  return saveConsent("granted", "granted");
}

export function rejectAll(): CookieConsent {
  return saveConsent("denied", "denied");
}

export function clearConsent(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(CONSENT_KEY);
  }
}
