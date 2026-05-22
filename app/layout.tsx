import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://climgo.fr"),
  title: {
    default: "ClimGO — Climatisation, PAC & Chauffage",
    template: "%s | ClimGO",
  },
  description:
    "ClimGO, votre expert en climatisation, pompe à chaleur et chauffage. Installation, entretien et dépannage. Devis gratuit, intervention rapide.",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://climgo.fr",
    siteName: "ClimGO",
    title: "ClimGO — Climatisation, PAC & Chauffage",
    description:
      "Expert en climatisation, pompe à chaleur et chauffage. Devis gratuit, intervention rapide.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ClimGO — Climatisation, PAC & Chauffage",
    description:
      "Expert en climatisation, pompe à chaleur et chauffage. Devis gratuit, intervention rapide.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
