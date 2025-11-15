import type { Metadata } from "next";

const RAW_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://jpgtoword.best";
const SITE_URL = RAW_SITE_URL.replace(/\/+$/, "");

export function canonical(path: string = "/"): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (normalized === "/" || normalized === "") {
    return `${SITE_URL}/`;
  }
  return `${SITE_URL}${normalized}`;
}

export function buildCanonicalMetadata(path: string): Metadata {
  return {
    alternates: {
      canonical: canonical(path),
    },
  };
}

