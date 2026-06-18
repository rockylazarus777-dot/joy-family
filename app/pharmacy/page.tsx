import type { Metadata } from "next";
import { Pill, Truck, ShieldCheck, Clock } from "lucide-react";
import PageHero from "@/components/sections/PageHero";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import Button from "@/components/ui/Button";
import CtaBand from "@/components/sections/CtaBand";
import { clinicInfo } from "@/lib/data/mockData";

export const metadata: Metadata = {
  title: "In-House Pharmacy | Joy Family Multispeciality Clinic",
  description: "Genuine medicines, fast dispensing and home delivery from our in-house pharmacy at Joy Family Multispeciality Clinic, Mogappair.",
};

const features = [
  { icon: Pill, title: "Genuine Medicines", desc: "Sourced directly from licensed distributors." },
  { icon: Clock, title: "Quick Dispensing", desc: "Minimal wait time for prescriptions filled on-site." },
  { icon: Truck, title: "Home Delivery", desc: "Medicines delivered to your doorstep on request." },
  { icon: ShieldCheck, title: "Pharmacist Guidance", desc: "Expert advice on dosage and usage from our pharmacist." },
];

export default function PharmacyPage() {
  return (
    <>
      <PageHero
        title="In-House Pharmacy"
        subtitle="Genuine medicines, fast dispensing, and home delivery — all under one roof."
        breadcrumbs={[{ label: "Pharmacy" }]}
      />

      <section className="px-4 py-16 md:px-8">
        <div className="mx-auto grid max-w-container gap-10 lg:grid-cols-2 lg:items-center">
          <ImagePlaceholder label="PHARMACY COUNTER" ratio="4:3" />
          <div>
            <h2 className="font-heading text-2xl font-bold text-textPrimary md:text-3xl">Your Prescription, Ready Fast</h2>
            <p className="mt-3 text-textSecondary">
              Our in-house pharmacy stocks a wide range of prescription and over-the-counter medicines so you can
              consult and collect your medication in a single visit. Need a refill or can't visit in person? Send us
              your prescription via WhatsApp and we'll arrange delivery.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href={`https://wa.me/${clinicInfo.whatsapp}`} variant="primary">Order via WhatsApp</Button>
              <Button href="/contact" variant="outline">Contact Pharmacy</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-sectionBg px-4 py-16 md:px-8">
        <div className="mx-auto max-w-container">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <div key={f.title} className="rounded-xl border border-border bg-cardBg p-6 text-center shadow-sm">
                <f.icon className="mx-auto text-primary" size={32} />
                <h3 className="mt-4 font-subheading font-semibold text-textPrimary">{f.title}</h3>
                <p className="mt-2 text-sm text-textSecondary">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand heading="Need to refill a prescription?" primaryLabel="WhatsApp Pharmacy" primaryHref={`https://wa.me/${clinicInfo.whatsapp}`} />
    </>
  );
}
