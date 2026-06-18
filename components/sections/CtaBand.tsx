import Button from "@/components/ui/Button";
import { clinicInfo } from "@/lib/data/mockData";

type CtaBandProps = {
  heading?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export default function CtaBand({
  heading = "Ready to take the next step in your family's health?",
  primaryLabel = "Book Appointment",
  primaryHref = "/book-appointment",
  secondaryLabel = "WhatsApp Us",
  secondaryHref = `https://wa.me/${clinicInfo.whatsapp}`,
}: CtaBandProps) {
  return (
    <section className="bg-primary px-4 py-14 text-center text-white md:px-8">
      <div className="mx-auto max-w-2xl">
        <h2 className="font-heading text-2xl font-bold md:text-3xl">{heading}</h2>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href={primaryHref} variant="accent" size="lg">
            {primaryLabel}
          </Button>
          <Button href={secondaryHref} variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
            {secondaryLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
