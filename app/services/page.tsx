import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import ServiceCardGrid from "@/components/sections/ServiceCardGrid";
import FaqAccordion from "@/components/sections/FaqAccordion";
import CtaBand from "@/components/sections/CtaBand";

export const metadata: Metadata = {
  title: "Our Specialities & Services | Joy Family Multispeciality Clinic",
  description: "Explore all medical specialities at Joy Family Multispeciality Clinic — ENT, family medicine, dental, dermatology, orthopaedics, diabetes care, and more.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Our Specialities & Services"
        subtitle="Comprehensive multispeciality care for every member of your family, under one roof."
        breadcrumbs={[{ label: "Services" }]}
      />
      <ServiceCardGrid />
      <FaqAccordion limit={5} />
      <CtaBand />
    </>
  );
}
