import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/siteConfig";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  return [
    { url: base, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/turkey`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    {
      url: `${base}/blog/study-abroad-destination`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.4,
    },
  ];
}
