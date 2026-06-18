import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PageHero from "@/components/sections/PageHero";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import CtaBand from "@/components/sections/CtaBand";
import { blogs, blogCategories, doctors } from "@/lib/data/mockData";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blogs.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const blog = blogs.find((b) => b.slug === slug);
  if (!blog) return {};
  return { title: blog.metaTitle, description: blog.metaDescription };
}

export default async function BlogDetailPage({ params }: Params) {
  const { slug } = await params;
  const blog = blogs.find((b) => b.slug === slug);
  if (!blog) notFound();

  const category = blogCategories.find((c) => c.id === blog.categoryId);
  const author = doctors.find((d) => d.id === blog.authorDoctorId);
  const related = blogs.filter((b) => b.id !== blog.id && b.categoryId === blog.categoryId).slice(0, 2);

  return (
    <>
      <PageHero
        title={blog.title}
        subtitle={blog.excerpt}
        breadcrumbs={[{ label: "Blog", href: "/blog" }, { label: blog.title }]}
      />

      <section className="px-4 py-12 md:px-8">
        <div className="mx-auto max-w-2xl">
          <Link href="/blog" className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
            <ArrowLeft size={16} /> Back to Blog
          </Link>

          <ImagePlaceholder label={blog.title.toUpperCase()} ratio="16:9" className="mt-6" />

          <div className="mt-4 flex items-center gap-3 text-xs text-textSecondary">
            {category && <span className="rounded-full bg-accent/10 px-3 py-1 font-semibold text-accent">{category.name}</span>}
            <span>{author ? author.fullName : "Joy Family Clinic"}</span>
            <span>·</span>
            <span>{new Date(blog.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
          </div>

          <div className="mt-6 space-y-4">
            {blog.body.map((para, i) => (
              <p key={i} className="text-textSecondary">{para}</p>
            ))}
          </div>

          {related.length > 0 && (
            <div className="mt-12 border-t border-border pt-8">
              <h2 className="font-heading text-xl font-bold text-textPrimary">Related Articles</h2>
              <ul className="mt-4 space-y-2">
                {related.map((r) => (
                  <li key={r.id}>
                    <Link href={`/blog/${r.slug}`} className="text-primary hover:underline">
                      {r.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
