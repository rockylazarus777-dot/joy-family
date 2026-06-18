import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Clock, GraduationCap, Stethoscope } from "lucide-react";
import PageHero from "@/components/sections/PageHero";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import Button from "@/components/ui/Button";
import CtaBand from "@/components/sections/CtaBand";
import { doctors, departments } from "@/lib/data/mockData";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return doctors.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const doctor = doctors.find((d) => d.slug === slug);
  if (!doctor) return {};
  return {
    title: `${doctor.fullName} — ${doctor.specialization} | Joy Family Multispeciality Clinic`,
    description: doctor.bio,
  };
}

export default async function DoctorProfilePage({ params }: Params) {
  const { slug } = await params;
  const doctor = doctors.find((d) => d.slug === slug);
  if (!doctor) notFound();

  const dept = departments.find((d) => d.id === doctor.departmentId);

  return (
    <>
      <PageHero
        title={doctor.fullName}
        subtitle={doctor.specialization}
        breadcrumbs={[{ label: "Doctors", href: "/doctors" }, { label: doctor.fullName }]}
      />

      <section className="px-4 py-16 md:px-8">
        <div className="mx-auto grid max-w-container gap-10 lg:grid-cols-[320px_1fr]">
          <div>
            {doctor.image ? (
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
                <Image
                  src={doctor.image}
                  alt={doctor.fullName}
                  fill
                  priority
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 320px"
                />
              </div>
            ) : (
              <ImagePlaceholder label={`PHOTO: ${doctor.fullName.toUpperCase()}`} ratio="4:5" />
            )}
            <div className="mt-6 rounded-xl border border-border bg-cardBg p-5 shadow-sm">
              <p className="text-sm text-textSecondary">Qualification</p>
              <p className="font-subheading font-semibold text-textPrimary">{doctor.qualification}</p>
              <p className="mt-3 text-sm text-textSecondary">Experience</p>
              <p className="font-subheading font-semibold text-textPrimary">{doctor.experienceYears} years</p>
              <p className="mt-3 text-sm text-textSecondary">Languages</p>
              <p className="font-subheading font-semibold text-textPrimary">{doctor.languages.join(", ")}</p>
              {dept && (
                <>
                  <p className="mt-3 text-sm text-textSecondary">Department</p>
                  <p className="font-subheading font-semibold text-textPrimary">{dept.name}</p>
                </>
              )}
              <Button href={`/book-appointment?doctor=${doctor.slug}`} variant="primary" fullWidth className="mt-5">
                Book Appointment
              </Button>
            </div>
          </div>

          <div>
            <h2 className="font-heading text-2xl font-bold text-textPrimary">About</h2>
            <p className="mt-3 text-textSecondary">{doctor.bio}</p>

            <h2 className="mt-8 flex items-center gap-2 font-heading text-2xl font-bold text-textPrimary">
              <GraduationCap size={22} className="text-primary" /> Education
            </h2>
            <ul className="mt-3 list-inside list-disc space-y-1 text-textSecondary">
              {doctor.education.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>

            <h2 className="mt-8 flex items-center gap-2 font-heading text-2xl font-bold text-textPrimary">
              <Stethoscope size={22} className="text-primary" /> Conditions Treated
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {doctor.conditionsTreated.map((c) => (
                <span key={c} className="rounded-full bg-sectionBg px-3 py-1 text-sm text-textSecondary">
                  {c}
                </span>
              ))}
            </div>

            <h2 className="mt-8 flex items-center gap-2 font-heading text-2xl font-bold text-textPrimary">
              <Clock size={22} className="text-primary" /> Availability
            </h2>
            <div className="mt-3 overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-left text-sm">
                <thead className="bg-sectionBg">
                  <tr>
                    <th className="px-4 py-2 font-subheading text-textPrimary">Day</th>
                    <th className="px-4 py-2 font-subheading text-textPrimary">Slots</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {doctor.availability.map((a) => (
                    <tr key={a.day}>
                      <td className="px-4 py-2 text-textPrimary">{a.day}</td>
                      <td className="px-4 py-2 text-textSecondary">
                        {a.slots.length > 0 ? a.slots.join(", ") : "Closed"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        heading={`Ready to consult ${doctor.fullName}?`}
        primaryLabel="Book Appointment"
        primaryHref={`/book-appointment?doctor=${doctor.slug}`}
      />
    </>
  );
}
