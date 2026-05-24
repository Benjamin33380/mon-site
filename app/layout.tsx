import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import CookieProvider from "@/components/rgpd/CookieProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ClimGO — Climatisation & Pompe à chaleur | Bassin d'Arcachon",
  description:
    "Artisan RGE QualiPAC sur le Bassin d'Arcachon. Installation, entretien et dépannage de climatisation, pompe à chaleur et chauffage. Devis gratuit — intervention rapide.",
  keywords: [
    "climatisation Bassin d'Arcachon",
    "installation pompe à chaleur Arcachon",
    "artisan RGE 33",
    "dépannage climatisation Gironde",
    "QualiPAC Mios",
    "chauffage pompe à chaleur Gironde",
    "ClimGO",
  ],
  authors: [{ name: "ClimGO" }],
  creator: "ClimGO",
  metadataBase: new URL("https://climgo.fr"),
  openGraph: {
    title: "ClimGO — Climatisation & Pompe à chaleur | Bassin d'Arcachon",
    description:
      "Artisan RGE QualiPAC sur le Bassin d'Arcachon. Installation, entretien et dépannage de climatisation, pompe à chaleur et chauffage.",
    url: "https://climgo.fr",
    siteName: "ClimGO",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="min-h-screen">
          <Header />
          <CookieProvider>
            <main>{children}</main>
          </CookieProvider>
        </body>
    </html>
  );
}
