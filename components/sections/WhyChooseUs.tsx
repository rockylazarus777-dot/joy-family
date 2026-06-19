import { ShieldCheck, Users, Clock4, Stethoscope } from "lucide-react";

const items = [
  { icon: ShieldCheck, title: "Trusted & Certified", desc: "Diagnostic services through SSN Scans & Lab, our NABL-certified partner, and DG Shipping approved examination centre." },
  { icon: Users, title: "Family-Focused Care", desc: "Specialists for every age group, from infants to seniors." },
  { icon: Clock4, title: "Fast & Convenient", desc: "Quick appointments, home lab collection, and same-day reports." },
  { icon: Stethoscope, title: "Experienced Specialists", desc: "38+ years of combined clinical experience across departments." },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-sectionBg px-4 py-16 md:px-8">
      <div className="mx-auto max-w-container">
        <h2 className="font-heading text-2xl font-bold text-textPrimary md:text-3xl">Why Families Choose Us</h2>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div key={item.title} className="rounded-xl border border-border bg-cardBg p-6 shadow-sm">
              <item.icon className="text-accent" size={32} />
              <h3 className="mt-4 font-subheading font-semibold text-textPrimary">{item.title}</h3>
              <p className="mt-2 text-sm text-textSecondary">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
