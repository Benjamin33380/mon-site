import type { Metadata } from "next";
import ServicesHero from "@/components/services/ServicesHero";
import ServicesList from "@/components/services/ServicesList";
import ServicesFaq from "@/components/services/ServicesFaq";
import CtaBanner from "@/components/home/CtaBanner";

export const metadata: Metadata = {
  title: "Nos services — Climatisation, PAC, Chauffage",
  description:
    "Découvrez tous nos services : installation et entretien de climatisation, pompe à chaleur (air/air, air/eau), chauffage fioul/gaz/électrique. Devis gratuit.",
  alternates: {
    canonical: "https://climgo.fr/services",
  },
};

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <ServicesList />
      <ServicesFaq />
      <CtaBanner />
    </>
  );
}
