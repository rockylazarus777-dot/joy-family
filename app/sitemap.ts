import type { MetadataRoute } from "next";
import { doctors, services, healthPackages, blogs } from "@/lib/data/mockData";

const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.joyfmsclinic.com").replace(/\/$/, "");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`,                                  priority: 1.0, changeFrequency: "weekly",  lastModified: new Date() },
    { url: `${baseUrl}/about`,                             priority: 0.9, changeFrequency: "monthly", lastModified: new Date() },
    { url: `${baseUrl}/doctors`,                           priority: 0.9, changeFrequency: "weekly",  lastModified: new Date() },
    { url: `${baseUrl}/services`,                          priority: 0.9, changeFrequency: "weekly",  lastModified: new Date() },
    { url: `${baseUrl}/laboratory`,                        priority: 0.8, changeFrequency: "monthly", lastModified: new Date() },
    { url: `${baseUrl}/pharmacy`,                          priority: 0.8, changeFrequency: "monthly", lastModified: new Date() },
    { url: `${baseUrl}/health-packages`,                   priority: 0.8, changeFrequency: "weekly",  lastModified: new Date() },
    { url: `${baseUrl}/dg-shipping-medical-examination`,   priority: 0.8, changeFrequency: "monthly", lastModified: new Date() },
    { url: `${baseUrl}/gallery`,                           priority: 0.6, changeFrequency: "monthly", lastModified: new Date() },
    { url: `${baseUrl}/blog`,                              priority: 0.7, changeFrequency: "weekly",  lastModified: new Date() },
    { url: `${baseUrl}/contact`,                           priority: 0.8, changeFrequency: "yearly",  lastModified: new Date() },
    { url: `${baseUrl}/book-appointment`,                  priority: 0.9, changeFrequency: "monthly", lastModified: new Date() },
  ];

  const doctorRoutes: MetadataRoute.Sitemap = doctors.map((d) => ({
    url: `${baseUrl}/doctors/${d.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${baseUrl}/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const packageRoutes: MetadataRoute.Sitemap = healthPackages.map((p) => ({
    url: `${baseUrl}/health-packages/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogs.map((b) => ({
    url: `${baseUrl}/blog/${b.slug}`,
    lastModified: new Date(b.publishedAt),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...doctorRoutes, ...serviceRoutes, ...packageRoutes, ...blogRoutes];
}
