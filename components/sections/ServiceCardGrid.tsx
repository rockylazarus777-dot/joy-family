import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/data/mockData";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import Button from "@/components/ui/Button";

export default function ServiceCardGrid({ limit }: { limit?: number }) {
  const list = limit ? services.slice(0, limit) : services;

  return (
    <section className="px-4 py-16 md:px-8">
      <div className="mx-auto max-w-container">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-2xl font-bold text-textPrimary md:text-3xl">Our Specialities</h2>
          {limit && (
            <Link href="/services" className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
              View All <ArrowRight size={16} />
            </Link>
          )}
        </div>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((s) => (
            <Link
              key={s.id}
              href={`/services/${s.slug}`}
              className="group rounded-xl border border-border bg-cardBg p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <ImagePlaceholder label={s.title.toUpperCase()} ratio="4:3" />
              <h3 className="mt-4 font-subheading font-semibold text-textPrimary group-hover:text-primary">{s.title}</h3>
              <p className="mt-2 text-sm text-textSecondary">{s.overview}</p>
            </Link>
          ))}
        </div>
        {!limit && (
          <div className="mt-10 text-center">
            <Button href="/book-appointment" variant="primary">Book a Consultation</Button>
          </div>
        )}
      </div>
    </section>
  );
}
