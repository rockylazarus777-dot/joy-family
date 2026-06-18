import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ChevronDown, CheckCircle2, Stethoscope } from "lucide-react";
import PageHero from "@/components/sections/PageHero";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import Button from "@/components/ui/Button";
import DoctorCardGrid from "@/components/sections/DoctorCardGrid";
import CtaBand from "@/components/sections/CtaBand";
import { services, doctors } from "@/lib/data/mockData";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return { title: service.metaTitle, description: service.metaDescription };
}

export default async function ServiceDetailPage({ params }: Params) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const departmentDoctors = doctors.filter((d) => d.departmentId === service.departmentId);

  return (
    <>
      <PageHero
        title={service.title}
        subtitle={service.overview}
        breadcrumbs={[{ label: "Services", href: "/services" }, { label: service.title }]}
      />

      <section className="px-4 py-16 md:px-8">
        <div className="mx-auto grid max-w-container gap-10 lg:grid-cols-[1fr_320px]">
          <div>
            {service.image ? (
              <div className="relative aspect-video overflow-hidden rounded-xl">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, calc(100vw - 380px)"
                />
              </div>
            ) : (
              <ImagePlaceholder label={service.title.toUpperCase()} ratio="16:9" />
            )}

            <h2 className="mt-10 flex items-center gap-2 font-heading text-2xl font-bold text-textPrimary">
              <Stethoscope size={22} className="text-primary" /> Conditions Treated
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {service.conditionsTreated.map((c) => (
                <span key={c} className="rounded-full bg-sectionBg px-3 py-1 text-sm text-textSecondary">
                  {c}
                </span>
              ))}
            </div>

            <h2 className="mt-8 font-heading text-2xl font-bold text-textPrimary">Procedures</h2>
            <ul className="mt-3 space-y-2">
              {service.procedures.map((p) => (
                <li key={p} className="flex items-start gap-2 text-textSecondary">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-accent" /> {p}
                </li>
              ))}
            </ul>

            <h2 className="mt-8 font-heading text-2xl font-bold text-textPrimary">Benefits</h2>
            <ul className="mt-3 space-y-2">
              {service.benefits.map((b) => (
                <li key={b} className="flex items-start gap-2 text-textSecondary">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-accent" /> {b}
                </li>
              ))}
            </ul>

            <h2 className="mt-8 font-heading text-2xl font-bold text-textPrimary">Frequently Asked Questions</h2>
            <div className="mt-3 divide-y divide-border rounded-xl border border-border bg-cardBg">
              {service.faqs.map((f) => (
                <details key={f.q} className="group px-5 py-4">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 font-subheading font-medium text-textPrimary">
                    {f.q}
                    <ChevronDown size={18} className="shrink-0 text-textSecondary transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="mt-2 text-sm text-textSecondary">{f.a}</p>
                </details>
              ))}
            </div>
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-xl border border-border bg-cardBg p-6 shadow-sm">
              <h3 className="font-subheading font-semibold text-textPrimary">Need this consultation?</h3>
              <p className="mt-2 text-sm text-textSecondary">Book an appointment with our specialists for {service.title.toLowerCase()}.</p>
              <Button href={`/book-appointment?service=${service.slug}`} variant="primary" fullWidth className="mt-4">
                Book Appointment
              </Button>
              <Button href="https://wa.me/918778040424" variant="outline" fullWidth className="mt-3">
                WhatsApp Enquiry
              </Button>
            </div>
          </div>
        </div>
      </section>

      {departmentDoctors.length > 0 && <DoctorCardGrid limit={departmentDoctors.length} />}
      <CtaBand />
    </>
  );
}
