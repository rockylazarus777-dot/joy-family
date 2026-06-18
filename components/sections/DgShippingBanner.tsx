import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import { clinicInfo } from "@/lib/data/mockData";
import Button from "@/components/ui/Button";

export default function DgShippingBanner() {
  return (
    <section className="bg-primary px-4 py-16 text-white md:px-8">
      <div className="mx-auto grid max-w-container grid-cols-1 items-center gap-10 md:grid-cols-2">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">
            <ShieldCheck size={14} /> Approval No. {clinicInfo.dgShippingApprovalNo}
          </span>
          <h2 className="mt-4 font-heading text-2xl font-bold md:text-3xl">
            DG Shipping Approved Medical Examination Centre
          </h2>
          <p className="mt-3 text-white/85">
            Seafarer medical examinations conducted to MLC 2006, STCW I/9, and ILO 147 standards — for pre-sea,
            post-sea, and trainee candidates.
          </p>
          <div className="mt-6">
            <Button href="/dg-shipping-medical-examination" variant="accent">
              Book Seafarer Examination
            </Button>
          </div>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl">
          <Image
            src="/images/dg-shipping/dg-medical.png"
            alt="DG Shipping Medical Examination"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}
