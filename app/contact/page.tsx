import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import PageHero from "@/components/sections/PageHero";
import ContactForm from "@/components/forms/ContactForm";
import { clinicInfo } from "@/lib/data/mockData";

export const metadata: Metadata = {
  title: "Contact Us | Joy Family Multispeciality Clinic",
  description: "Get in touch with Joy Family Multispeciality Clinic in Mogappair, Chennai — call, WhatsApp, or send us a message.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact Us"
        subtitle="We're here to help. Reach out by phone, WhatsApp, or the form below."
        breadcrumbs={[{ label: "Contact" }]}
      />

      <section className="px-4 py-16 md:px-8">
        <div className="mx-auto grid max-w-container gap-10 lg:grid-cols-2">
          <div>
            <div className="space-y-5 rounded-xl border border-border bg-cardBg p-6 shadow-sm">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 shrink-0 text-primary" size={20} />
                <p className="text-textSecondary">{clinicInfo.address}</p>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 shrink-0 text-primary" size={20} />
                <div>
                  {clinicInfo.phones.map((p) => (
                    <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className="block text-textSecondary hover:text-primary">{p}</a>
                  ))}
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 shrink-0 text-primary" size={20} />
                <a href={`mailto:${clinicInfo.email}`} className="text-textSecondary hover:text-primary">{clinicInfo.email}</a>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 shrink-0 text-primary" size={20} />
                <div>
                  {clinicInfo.hours.map((h) => (
                    <p key={h.day} className="text-textSecondary">{h.day}: {h.time}</p>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 overflow-hidden rounded-xl border border-border">
              <iframe
                src={clinicInfo.mapEmbedUrl}
                title="Clinic location map"
                className="h-72 w-full"
                loading="lazy"
              />
            </div>
          </div>

          <ContactForm />
        </div>
      </section>
    </>
  );
}
