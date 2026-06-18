import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import PageHero from "@/components/sections/PageHero";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import Button from "@/components/ui/Button";
import CtaBand from "@/components/sections/CtaBand";
import { healthPackages } from "@/lib/data/mockData";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return healthPackages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const pkg = healthPackages.find((p) => p.slug === slug);
  if (!pkg) return {};
  return {
    title: `${pkg.title} | Joy Family Multispeciality Clinic`,
    description: pkg.description,
  };
}

export default async function HealthPackageDetailPage({ params }: Params) {
  const { slug } = await params;
  const pkg = healthPackages.find((p) => p.slug === slug);
  if (!pkg) notFound();

  return (
    <>
      <PageHero
        title={pkg.title}
        subtitle={pkg.description}
        breadcrumbs={[{ label: "Health Packages", href: "/health-packages" }, { label: pkg.title }]}
      />

      <section className="px-4 py-16 md:px-8">
        <div className="mx-auto grid max-w-container gap-10 lg:grid-cols-[1fr_320px]">
          <div>
            <ImagePlaceholder label={pkg.title.toUpperCase()} ratio="16:9" />

            <h2 className="mt-10 font-heading text-2xl font-bold text-textPrimary">Tests Included ({pkg.testsCount})</h2>
            <ul className="mt-3 space-y-2">
              {pkg.testsIncluded.map((t) => (
                <li key={t} className="flex items-start gap-2 text-textSecondary">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-accent" /> {t}
                </li>
              ))}
            </ul>

            <h2 className="mt-8 font-heading text-2xl font-bold text-textPrimary">Benefits</h2>
            <ul className="mt-3 space-y-2">
              {pkg.benefits.map((b) => (
                <li key={b} className="flex items-start gap-2 text-textSecondary">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-accent" /> {b}
                </li>
              ))}
            </ul>

            <h2 className="mt-8 font-heading text-2xl font-bold text-textPrimary">Eligibility</h2>
            <p className="mt-3 text-textSecondary">{pkg.eligibility}</p>
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-xl border border-border bg-cardBg p-6 shadow-sm">
              <p className="text-sm text-textSecondary">Package Price</p>
              <p className="font-heading text-3xl font-bold text-primary">₹{pkg.price.toLocaleString("en-IN")}</p>
              <p className="mt-1 text-xs text-textSecondary">{pkg.testsCount} tests included</p>
              <Button href={`/book-appointment?package=${pkg.slug}`} variant="primary" fullWidth className="mt-4">
                Book This Package
              </Button>
              <Button href="https://wa.me/918778040424" variant="outline" fullWidth className="mt-3">
                Ask on WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
