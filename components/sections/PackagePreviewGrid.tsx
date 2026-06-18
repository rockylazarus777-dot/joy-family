import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { healthPackages } from "@/lib/data/mockData";
import Button from "@/components/ui/Button";

export default function PackagePreviewGrid({ limit }: { limit?: number }) {
  const list = limit ? healthPackages.slice(0, limit) : healthPackages;

  return (
    <section className="px-4 py-16 md:px-8">
      <div className="mx-auto max-w-container">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-2xl font-bold text-textPrimary md:text-3xl">Health Packages</h2>
          {limit && (
            <Link href="/health-packages" className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
              View All <ArrowRight size={16} />
            </Link>
          )}
        </div>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <div key={p.id} className="flex flex-col rounded-xl border border-border bg-cardBg p-6 shadow-sm">
              <span className="text-xs font-semibold text-accent">{p.testsCount} Tests Included</span>
              <h3 className="mt-2 font-subheading font-semibold text-textPrimary">{p.title}</h3>
              <p className="mt-2 flex-1 text-sm text-textSecondary">{p.description}</p>
              <p className="mt-4 font-heading text-xl font-bold text-primary">₹{p.price.toLocaleString("en-IN")}</p>
              <Button href={`/health-packages/${p.slug}`} variant="primary" size="sm" className="mt-4 w-full">
                Book This Package
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
