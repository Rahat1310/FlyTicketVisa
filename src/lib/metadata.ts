import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

type PageMetadata = {
  title: string;
  description: string;
  path: string;
};

/** Keep page details consistent in search results and shared-link previews. */
export function createPageMetadata({ title, description, path }: PageMetadata): Metadata {
  const socialTitle = path === "/" ? title : `${title} | ${siteConfig.name}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: socialTitle,
      description,
      url: path,
      siteName: siteConfig.name,
      locale: "en_BD",
      type: "website",
      images: [siteConfig.socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [siteConfig.socialImage],
    },
  };
}
