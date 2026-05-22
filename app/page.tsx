import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import ServicesPreview from "@/components/home/ServicesPreview";
import WhyUs from "@/components/home/WhyUs";
import CtaBanner from "@/components/home/CtaBanner";

export const metadata: Metadata = {
  title: "ClimGO — Climatisation, PAC & Chauffage | Devis gratuit",
  description:
    "ClimGO installe et entretient vos systèmes de climatisation, pompe à chaleur et chauffage. Intervention rapide, devis gratuit sous 24h.",
  alternates: {
    canonical: "https://climgo.fr",
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesPreview />
      <WhyUs />
      <CtaBanner />
    </>
  );
}
