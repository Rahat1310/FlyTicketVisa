import type { MetadataRoute } from "next";
import { countries } from "@/lib/data/countries";
import { services } from "@/lib/services";

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://flyticketvisa.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/contact",
    "/testimonials",
    "/services",
    "/countries",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const serviceRoutes = services.map((s) => ({
    url: `${baseUrl}/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const countryRoutes = countries.map((c) => ({
    url: `${baseUrl}/countries/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [...staticRoutes, ...serviceRoutes, ...countryRoutes];
}
