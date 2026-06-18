import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/sections/PageHero";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import Button from "@/components/ui/Button";
import CtaBand from "@/components/sections/CtaBand";
import { doctors, departments } from "@/lib/data/mockData";

export const metadata: Metadata = {
  title: "Our Doctors | Joy Family Multispeciality Clinic",
  description: "Meet our team of experienced specialists across ENT, family medicine, anaesthesia and pain management at Joy Family Multispeciality Clinic.",
};

export default function DoctorsPage() {
  return (
    <>
      <PageHero
        title="Meet Our Doctors"
        subtitle="Experienced specialists dedicated to your family's health, across every life stage."
        breadcrumbs={[{ label: "Doctors" }]}
      />

      <section className="px-4 py-16 md:px-8">
        <div className="mx-auto max-w-container">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {doctors.map((d) => {
              const dept = departments.find((dep) => dep.id === d.departmentId);
              return (
                <div key={d.id} className="rounded-xl border border-border bg-cardBg p-5 shadow-sm">
                  <Link href={`/doctors/${d.slug}`}>
                    <ImagePlaceholder label={`PHOTO: ${d.fullName.toUpperCase()}`} ratio="4:5" />
                  </Link>
                  <Link href={`/doctors/${d.slug}`}>
                    <h2 className="mt-4 font-subheading font-semibold text-textPrimary hover:text-primary">{d.fullName}</h2>
                  </Link>
                  <p className="text-sm text-textSecondary">{d.qualification}</p>
                  <p className="mt-1 text-sm font-medium text-accent">{d.specialization}</p>
                  {dept && <p className="mt-1 text-xs text-textSecondary">{dept.name} Department</p>}
                  <p className="mt-1 text-xs text-textSecondary">{d.experienceYears} years experience</p>
                  <div className="mt-4 flex gap-2">
                    <Button href={`/doctors/${d.slug}`} variant="outline" size="sm" className="flex-1">
                      View Profile
                    </Button>
                    <Button href={`/book-appointment?doctor=${d.slug}`} variant="primary" size="sm" className="flex-1">
                      Book
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
