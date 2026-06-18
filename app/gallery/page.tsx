import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import GalleryMasonry from "@/components/sections/GalleryMasonry";
import CtaBand from "@/components/sections/CtaBand";

export const metadata: Metadata = {
  title: "Gallery | Joy Family Multispeciality Clinic",
  description: "Take a look inside Joy Family Multispeciality Clinic — our facilities, doctors, laboratory, and community events.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        title="Gallery"
        subtitle="A glimpse into our clinic, our team, and our community initiatives."
        breadcrumbs={[{ label: "Gallery" }]}
      />
      <GalleryMasonry />
      <CtaBand />
    </>
  );
}
