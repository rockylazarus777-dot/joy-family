import Link from "next/link";
import { ChevronRight } from "lucide-react";

type Crumb = { label: string; href?: string };

type PageHeroProps = {
  title: string;
  subtitle?: string;
  breadcrumbs?: Crumb[];
};

export default function PageHero({ title, subtitle, breadcrumbs }: PageHeroProps) {
  return (
    <section className="bg-sectionBg px-4 py-12 md:px-8 md:py-16">
      <div className="mx-auto max-w-container">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="mb-4 flex flex-wrap items-center gap-1 text-sm text-textSecondary">
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-1">
                <ChevronRight size={14} />
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-primary">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-textPrimary">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        <h1 className="font-heading text-3xl font-bold text-textPrimary md:text-4xl">{title}</h1>
        {subtitle && <p className="mt-3 max-w-2xl text-textSecondary">{subtitle}</p>}
      </div>
    </section>
  );
}
