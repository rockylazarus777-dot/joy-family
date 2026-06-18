import type { Metadata } from "next";
import Image from "next/image";
import { ShieldCheck, FileText, ListChecks } from "lucide-react";
import PageHero from "@/components/sections/PageHero";
import Button from "@/components/ui/Button";
import CtaBand from "@/components/sections/CtaBand";
import DgShippingForm from "@/components/forms/DgShippingForm";
import { clinicInfo, dgShippingDocuments, dgShippingProcessSteps, dgShippingFaqs } from "@/lib/data/mockData";

export const metadata: Metadata = {
  title: "DG Shipping Medical Examination | Joy Family Multispeciality Clinic",
  description: `DG Shipping approved seafarer medical examination centre (Approval No. ${clinicInfo.dgShippingApprovalNo}), conducted to MLC 2006 & STCW standards.`,
};

export default function DgShippingPage() {
  return (
    <>
      <PageHero
        title="DG Shipping Medical Examination"
        subtitle="Approved seafarer medical examination centre, conducted to MLC 2006 & STCW standards."
        breadcrumbs={[{ label: "DG Shipping Medical Examination" }]}
      />

      <section className="px-4 py-12 md:px-8">
        <div className="mx-auto max-w-container">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-sm font-semibold text-accent">
            <ShieldCheck size={16} /> DG Shipping Approval No. {clinicInfo.dgShippingApprovalNo}
          </span>
        </div>
      </section>

      <section className="px-4 py-8 md:px-8">
        <div className="mx-auto grid max-w-container gap-10 lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg">
            <Image
              src="/images/dg-shipping/dg-shipping-exam-room.jpg"
              alt="DG Shipping Medical Examination Room"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div>
            <h2 className="font-heading text-2xl font-bold text-textPrimary md:text-3xl">Seafarer Medical Fitness Examinations</h2>
            <p className="mt-3 text-textSecondary">
              Our DG Shipping approved centre conducts comprehensive medical fitness examinations for seafarers,
              including pre-sea candidates, post-sea renewals, and trainees, fully compliant with MLC 2006 and STCW
              requirements.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/book-appointment?service=dg-shipping" variant="primary">Book Seafarer Exam</Button>
              <Button href={`https://wa.me/${clinicInfo.whatsapp}`} variant="outline">WhatsApp Enquiry</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-sectionBg px-4 py-16 md:px-8">
        <div className="mx-auto max-w-container">
          <h2 className="flex items-center gap-2 font-heading text-2xl font-bold text-textPrimary md:text-3xl">
            <ListChecks size={24} className="text-primary" /> Examination Process
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {dgShippingProcessSteps.map((step, i) => (
              <div key={step} className="rounded-xl border border-border bg-cardBg p-5 shadow-sm">
                <span className="font-heading text-xl font-bold text-primary">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-2 text-sm font-medium text-textPrimary">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 md:px-8">
        <div className="mx-auto max-w-container">
          <h2 className="flex items-center gap-2 font-heading text-2xl font-bold text-textPrimary md:text-3xl">
            <FileText size={24} className="text-primary" /> Documents to Bring
          </h2>
          <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {dgShippingDocuments.map((doc) => (
              <li key={doc} className="rounded-lg border border-border bg-cardBg px-4 py-3 text-sm text-textPrimary">
                {doc}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-4 py-16 md:px-8">
        <div className="mx-auto max-w-2xl">
          <DgShippingForm />
        </div>
      </section>

      <section className="bg-sectionBg px-4 py-16 md:px-8">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-heading text-2xl font-bold text-textPrimary md:text-3xl">Frequently Asked Questions</h2>
          <div className="mt-8 divide-y divide-border rounded-xl border border-border bg-cardBg">
            {dgShippingFaqs.map((f) => (
              <details key={f.q} className="group px-5 py-4">
                <summary className="cursor-pointer font-subheading font-medium text-textPrimary">{f.q}</summary>
                <p className="mt-2 text-sm text-textSecondary">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CtaBand heading="Ready for your seafarer medical examination?" primaryLabel="Book Now" primaryHref="/book-appointment?service=dg-shipping" />
    </>
  );
}
