import type { MetadataRoute } from "next";
import { doctors, services, healthPackages, blogs } from "@/lib/data/mockData";

const baseUrl = "https://www.joyfmsclinic.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/doctors",
    "/services",
    "/laboratory",
    "/pharmacy",
    "/health-packages",
    "/dg-shipping-medical-examination",
    "/gallery",
    "/blog",
    "/contact",
    "/book-appointment",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const doctorRoutes = doctors.map((d) => ({
    url: `${baseUrl}/doctors/${d.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const serviceRoutes = services.map((s) => ({
    url: `${baseUrl}/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const packageRoutes = healthPackages.map((p) => ({
    url: `${baseUrl}/health-packages/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const blogRoutes = blogs.map((b) => ({
    url: `${baseUrl}/blog/${b.slug}`,
    lastModified: new Date(b.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...doctorRoutes, ...serviceRoutes, ...packageRoutes, ...blogRoutes];
}
