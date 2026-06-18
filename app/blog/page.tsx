import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/sections/PageHero";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import CtaBand from "@/components/sections/CtaBand";
import { blogs, blogCategories, doctors } from "@/lib/data/mockData";

export const metadata: Metadata = {
  title: "Health Blog | Joy Family Multispeciality Clinic",
  description: "Health tips, preventive care advice, and seafarer medical examination guidance from the specialists at Joy Family Multispeciality Clinic.",
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        title="Health Blog"
        subtitle="Practical health guidance from our specialists, for your family."
        breadcrumbs={[{ label: "Blog" }]}
      />

      <section className="px-4 py-16 md:px-8">
        <div className="mx-auto max-w-container">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map((b) => {
              const category = blogCategories.find((c) => c.id === b.categoryId);
              const author = doctors.find((d) => d.id === b.authorDoctorId);
              return (
                <Link
                  key={b.id}
                  href={`/blog/${b.slug}`}
                  className="group rounded-xl border border-border bg-cardBg p-5 shadow-sm transition-shadow hover:shadow-md"
                >
                  <ImagePlaceholder label={b.title.toUpperCase()} ratio="4:3" />
                  {category && (
                    <span className="mt-4 inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                      {category.name}
                    </span>
                  )}
                  <h2 className="mt-3 font-subheading font-semibold text-textPrimary group-hover:text-primary">{b.title}</h2>
                  <p className="mt-2 text-sm text-textSecondary">{b.excerpt}</p>
                  <p className="mt-3 text-xs text-textSecondary">
                    {author ? author.fullName : "Joy Family Clinic"} · {new Date(b.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
