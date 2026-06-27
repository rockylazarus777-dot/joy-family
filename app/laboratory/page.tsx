import type { Metadata } from "next";
import Image from "next/image";
import { FlaskConical, Home, Clock, FileCheck } from "lucide-react";
import PageHero from "@/components/sections/PageHero";
import Button from "@/components/ui/Button";
import FaqAccordion from "@/components/sections/FaqAccordion";
import CtaBand from "@/components/sections/CtaBand";
import LabBookingForm from "@/components/forms/LabBookingForm";

export const metadata: Metadata = {
  title: "Laboratory & Diagnostics | Joy Family Multispeciality Clinic",
  description: "Diagnostic tests at Joy Family Multispeciality Clinic are processed through SSN Scans & Lab, a NABL-certified partner, with home sample collection and fast report turnaround.",
};

const popularTests = [
  { name: "Complete Blood Count (CBC)", price: 250 },
  { name: "Lipid Profile", price: 500 },
  { name: "Liver Function Test", price: 600 },
  { name: "Kidney Function Test", price: 600 },
  { name: "Thyroid Profile (T3, T4, TSH)", price: 450 },
  { name: "HbA1c (Diabetes)", price: 400 },
  { name: "Blood Sugar (Fasting/PP)", price: 100 },
  { name: "Urine Routine", price: 150 },
];

const features = [
  { icon: FlaskConical, title: "NABL-Certified Partner", desc: "Tests processed through SSN Scans & Lab, a NABL-certified diagnostic centre." },
  { icon: Home, title: "Home Collection", desc: "Sample pickup at your doorstep across Villivakkam and nearby areas." },
  { icon: Clock, title: "Fast Turnaround", desc: "Most reports delivered within the same day." },
  { icon: FileCheck, title: "Digital Reports", desc: "Reports shared digitally via WhatsApp or email." },
];

export default function LaboratoryPage() {
  return (
    <>
      <PageHero
        title="Laboratory & Diagnostics"
        subtitle="Diagnostic services in partnership with SSN Scans & Lab, a NABL-certified centre, with home collection and fast turnaround."
        breadcrumbs={[{ label: "Laboratory" }]}
      />

      <section className="px-4 py-16 md:px-8">
        <div className="mx-auto grid max-w-container grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div key={f.title} className="rounded-xl border border-border bg-cardBg p-6 text-center shadow-sm">
              <f.icon className="mx-auto text-primary" size={32} />
              <h3 className="mt-4 font-subheading font-semibold text-textPrimary">{f.title}</h3>
              <p className="mt-2 text-sm text-textSecondary">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-sectionBg px-4 py-16 md:px-8">
        <div className="mx-auto max-w-container">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg">
              <Image
                src="/images/laboratory/lab.png"
                alt="Laboratory Sample Collection"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div>
              <h2 className="font-heading text-2xl font-bold text-textPrimary md:text-3xl">Popular Tests</h2>
              <div className="mt-6 divide-y divide-border rounded-xl border border-border bg-cardBg">
                {popularTests.map((t) => (
                  <div key={t.name} className="flex items-center justify-between px-5 py-3">
                    <span className="text-sm text-textPrimary">{t.name}</span>
                    <span className="text-sm font-semibold text-primary">₹{t.price}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button href="/book-appointment?service=laboratory" variant="primary">Book a Test</Button>
                <Button href="https://wa.me/918778040424" variant="outline">Book Home Collection via WhatsApp</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 md:px-8">
        <div className="mx-auto max-w-2xl">
          <LabBookingForm />
        </div>
      </section>

      <FaqAccordion limit={3} />
      <CtaBand heading="Need a lab test? We'll come to you." primaryLabel="Book Home Collection" primaryHref="/book-appointment?service=laboratory" />
    </>
  );
}
