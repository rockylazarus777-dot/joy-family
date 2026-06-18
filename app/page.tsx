import type { Metadata } from "next";
import HeroSlider from "@/components/sections/HeroSlider";
import TrustBar from "@/components/sections/TrustBar";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import ServiceCardGrid from "@/components/sections/ServiceCardGrid";
import DoctorCardGrid from "@/components/sections/DoctorCardGrid";
import LabHighlight from "@/components/sections/LabHighlight";
import DgShippingBanner from "@/components/sections/DgShippingBanner";
import PackagePreviewGrid from "@/components/sections/PackagePreviewGrid";
import TestimonialCarousel from "@/components/sections/TestimonialCarousel";
import FaqAccordion from "@/components/sections/FaqAccordion";
import CtaBand from "@/components/sections/CtaBand";

export const metadata: Metadata = {
  title: "Home",
  description: "38 years of trusted, family-first multispeciality healthcare in Mogappair, Chennai. Book doctor appointments, lab tests, health packages and DG Shipping medical exams.",
};

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <TrustBar />
      <WhyChooseUs />
      <ServiceCardGrid limit={8} />
      <DoctorCardGrid limit={4} />
      <LabHighlight />
      <DgShippingBanner />
      <PackagePreviewGrid limit={3} />
      <TestimonialCarousel />
      <FaqAccordion limit={5} />
      <CtaBand />
    </>
  );
}
