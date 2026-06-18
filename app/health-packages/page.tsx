import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import PackagePreviewGrid from "@/components/sections/PackagePreviewGrid";
import FaqAccordion from "@/components/sections/FaqAccordion";
import CtaBand from "@/components/sections/CtaBand";
import PackageEnquiryForm from "@/components/forms/PackageEnquiryForm";

export const metadata: Metadata = {
  title: "Health Checkup Packages | Joy Family Multispeciality Clinic",
  description: "Affordable, comprehensive health checkup packages for every age group at Joy Family Multispeciality Clinic, Mogappair.",
};

export default function HealthPackagesPage() {
  return (
    <>
      <PageHero
        title="Health Checkup Packages"
        subtitle="Comprehensive, affordable health screening packages tailored to every life stage."
        breadcrumbs={[{ label: "Health Packages" }]}
      />
      <PackagePreviewGrid />

      <section className="px-4 py-16 md:px-8">
        <div className="mx-auto max-w-2xl">
          <PackageEnquiryForm />
        </div>
      </section>

      <FaqAccordion limit={3} />
      <CtaBand heading="Not sure which package to choose?" primaryLabel="Talk to Us" primaryHref="https://wa.me/918778040424" />
    </>
  );
}
