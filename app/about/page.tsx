import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/sections/PageHero";
import CtaBand from "@/components/sections/CtaBand";
import TestimonialCarousel from "@/components/sections/TestimonialCarousel";
import { clinicInfo } from "@/lib/data/mockData";
import { HeartHandshake, ShieldCheck, Users, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Joy Family Multispeciality Clinic",
  description: "38 years of trusted, family-first multispeciality healthcare in Mogappair, Chennai. Learn about our mission, values and team.",
};

const values = [
  { icon: HeartHandshake, title: "Family-First Care", desc: "We treat every patient like family, with empathy and personal attention." },
  { icon: ShieldCheck, title: "Trusted Expertise", desc: "38 years of multispeciality medical experience across generations." },
  { icon: Users, title: "Community Focused", desc: `${clinicInfo.happyPatients} happy patients served across Mogappair and beyond.` },
  { icon: Award, title: "Quality Standards", desc: "Diagnostic services through SSN Scans & Lab, our NABL-certified partner, and a DG Shipping approved examination centre." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About Joy Family Multispeciality Clinic"
        subtitle="38 years of trusted, family-first healthcare in the heart of Mogappair, Chennai."
        breadcrumbs={[{ label: "About" }]}
      />

      <section className="px-4 py-16 md:px-8">
        <div className="mx-auto grid max-w-container gap-10 lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
            <Image
              src="/images/about/about team.png"
              alt="Joy Family Multispeciality Clinic Team"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div>
            <h2 className="font-heading text-2xl font-bold text-textPrimary md:text-3xl">Our Story</h2>
            <p className="mt-4 text-textSecondary">
              Joy Family Multispeciality Clinic was founded with a simple mission: to provide premium, accessible
              healthcare to every family in our community. For 38 years, we have grown from a single family-medicine
              practice into a full multispeciality clinic offering ENT, paediatrics, gynaecology, dental, dermatology,
              orthopaedics, diabetes care, pain management, general surgery, diagnostic laboratory services through
              our NABL-certified partner SSN Scans & Lab, a pharmacy, and a DG Shipping approved seafarer medical examination centre.
            </p>
            <p className="mt-4 text-textSecondary">
              Through generations of patients, our approach has remained the same: attentive specialists, transparent
              communication, and care that puts your family's wellbeing first.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-sectionBg px-4 py-16 md:px-8">
        <div className="mx-auto max-w-container">
          <h2 className="text-center font-heading text-2xl font-bold text-textPrimary md:text-3xl">Our Values</h2>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="rounded-xl border border-border bg-cardBg p-6 text-center shadow-sm">
                <v.icon className="mx-auto text-primary" size={32} />
                <h3 className="mt-4 font-subheading font-semibold text-textPrimary">{v.title}</h3>
                <p className="mt-2 text-sm text-textSecondary">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 md:px-8">
        <div className="mx-auto grid max-w-container grid-cols-2 gap-6 text-center sm:grid-cols-4">
          <div>
            <p className="font-heading text-3xl font-bold text-primary">{clinicInfo.yearsExperience}+</p>
            <p className="mt-1 text-sm text-textSecondary">Years of Experience</p>
          </div>
          <div>
            <p className="font-heading text-3xl font-bold text-primary">{clinicInfo.happyPatients}</p>
            <p className="mt-1 text-sm text-textSecondary">Happy Patients</p>
          </div>
          <div>
            <p className="font-heading text-3xl font-bold text-primary">10</p>
            <p className="mt-1 text-sm text-textSecondary">Specialities</p>
          </div>
          <div>
            <p className="font-heading text-3xl font-bold text-primary">3</p>
            <p className="mt-1 text-sm text-textSecondary">Expert Doctors</p>
          </div>
        </div>
      </section>

      <TestimonialCarousel />
      <CtaBand />
    </>
  );
}
