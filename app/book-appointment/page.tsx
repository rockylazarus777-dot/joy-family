import type { Metadata } from "next";
import { Suspense } from "react";
import { Phone, MessageCircle } from "lucide-react";
import PageHero from "@/components/sections/PageHero";
import BookAppointmentClient from "@/app/book-appointment/BookAppointmentClient";
import { clinicInfo } from "@/lib/data/mockData";

export const metadata: Metadata = {
  title: "Book Appointment | Joy Family Multispeciality Clinic",
  description: "Book your appointment with Joy Family Multispeciality Clinic specialists online, by phone, or via WhatsApp.",
};

export default function BookAppointmentPage() {
  return (
    <>
      <PageHero
        title="Book an Appointment"
        subtitle="Choose your preferred doctor, service, or package, and we'll confirm your slot."
        breadcrumbs={[{ label: "Book Appointment" }]}
      />

      <section className="px-4 py-16 md:px-8">
        <div className="mx-auto grid max-w-container gap-10 lg:grid-cols-[1fr_320px]">
          <Suspense fallback={<div className="rounded-xl border border-border bg-cardBg p-8 text-textSecondary">Loading form…</div>}>
            <BookAppointmentClient />
          </Suspense>

          <div className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-xl border border-border bg-cardBg p-6 shadow-sm">
              <h3 className="font-subheading font-semibold text-textPrimary">Prefer to talk?</h3>
              <a href={`tel:${clinicInfo.phones[0].replace(/\s/g, "")}`} className="mt-3 flex items-center gap-2 text-textSecondary hover:text-primary">
                <Phone size={18} /> {clinicInfo.phones[0]}
              </a>
              <a href={`https://wa.me/${clinicInfo.whatsapp}`} className="mt-2 flex items-center gap-2 text-textSecondary hover:text-primary">
                <MessageCircle size={18} /> WhatsApp Us
              </a>
            </div>
            <div className="rounded-xl border border-border bg-cardBg p-6 shadow-sm">
              <h3 className="font-subheading font-semibold text-textPrimary">Clinic Hours</h3>
              {clinicInfo.hours.map((h) => (
                <p key={h.day} className="mt-2 text-sm text-textSecondary">{h.day}: {h.time}</p>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
