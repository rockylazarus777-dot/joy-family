import Image from "next/image";
import { FlaskConical, Home, Clock } from "lucide-react";
import Button from "@/components/ui/Button";

export default function LabHighlight() {
  return (
    <section className="px-4 py-16 md:px-8">
      <div className="mx-auto grid max-w-container grid-cols-1 items-center gap-10 md:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
          <Image
            src="/images/laboratory/lab.png"
            alt="NABL-Certified Laboratory at Joy Family Clinic"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
            <FlaskConical size={14} /> NABL Certified
          </span>
          <h2 className="mt-4 font-heading text-2xl font-bold text-textPrimary md:text-3xl">
            Precision Diagnostics You Can Trust
          </h2>
          <p className="mt-3 text-textSecondary">
            Our laboratory partner runs accredited tests with fast turnaround, backed by modern equipment and
            stringent quality standards.
          </p>
          <ul className="mt-5 space-y-3 text-sm text-textPrimary">
            <li className="flex items-center gap-2"><Home size={18} className="text-accent" /> Home sample collection available</li>
            <li className="flex items-center gap-2"><Clock size={18} className="text-accent" /> Same-day report delivery on most tests</li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="/laboratory" variant="primary">Book Lab Test</Button>
            <Button href="/laboratory" variant="outline">Book Home Collection</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
