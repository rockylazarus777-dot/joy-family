import { clinicInfo } from "@/lib/data/mockData";

const stats = [
  { label: "Years of Experience", value: `${clinicInfo.yearsExperience}+` },
  { label: "Happy Patients", value: clinicInfo.happyPatients },
  { label: "NABL-Certified Lab Partner", value: "SSN Scans" },
  { label: "DG Shipping Approved", value: clinicInfo.dgShippingApprovalNo },
  { label: "Specialist Departments", value: "10+" },
];

export default function TrustBar() {
  return (
    <section className="border-y border-border bg-cardBg">
      <div className="mx-auto flex max-w-container gap-8 overflow-x-auto px-4 py-6 md:justify-between md:overflow-visible md:px-8">
        {stats.map((s) => (
          <div key={s.label} className="flex min-w-[140px] flex-col items-center text-center">
            <span className="font-heading text-xl font-bold text-primary md:text-2xl">{s.value}</span>
            <span className="mt-1 text-xs text-textSecondary md:text-sm">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
