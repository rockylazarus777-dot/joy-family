import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { doctors } from "@/lib/data/mockData";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import Button from "@/components/ui/Button";

export default function DoctorCardGrid({ limit }: { limit?: number }) {
  const list = limit ? doctors.slice(0, limit) : doctors;

  return (
    <section className="bg-sectionBg px-4 py-16 md:px-8">
      <div className="mx-auto max-w-container">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-2xl font-bold text-textPrimary md:text-3xl">Meet Our Specialists</h2>
          {limit && (
            <Link href="/doctors" className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
              View All <ArrowRight size={16} />
            </Link>
          )}
        </div>

        <div className="mt-8 flex gap-6 overflow-x-auto pb-2 lg:grid lg:grid-cols-4 lg:overflow-visible">
          {list.map((d) => (
            <div
              key={d.id}
              className="min-w-[260px] flex-shrink-0 rounded-xl border border-border bg-cardBg p-5 shadow-sm lg:min-w-0"
            >
              <ImagePlaceholder label={`PHOTO: ${d.fullName.toUpperCase()}`} ratio="4:5" />
              <h3 className="mt-4 font-subheading font-semibold text-textPrimary">{d.fullName}</h3>
              <p className="text-sm text-textSecondary">{d.qualification}</p>
              <p className="mt-1 text-sm font-medium text-accent">{d.specialization}</p>
              <p className="mt-1 text-xs text-textSecondary">{d.experienceYears} years experience</p>
              <Button href={`/book-appointment?doctor=${d.slug}`} variant="outline" size="sm" className="mt-4 w-full">
                Book Appointment
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
