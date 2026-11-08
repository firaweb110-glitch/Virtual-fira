import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { SelectedWork } from "@/components/home/SelectedWork";
import { TourShowcase } from "@/components/home/TourShowcase";
import { ServicesSection } from "@/components/home/ServicesSection";
import { Industries } from "@/components/home/Industries";
import { Approach } from "@/components/home/Approach";
import { ContactCta } from "@/components/home/ContactCta";

export const metadata: Metadata = {
  title: { absolute: "VIRTUAL FIRA | Website Design, 360° Virtual Tours & Branding" },
  description:
    "VIRTUAL FIRA designs powerful websites, immersive 360° virtual tours and distinctive brand identities for ambitious Indian businesses.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <TourShowcase />
      <ServicesSection />
      <Industries />
      <Approach />
      <ContactCta />
    </>
  );
}
