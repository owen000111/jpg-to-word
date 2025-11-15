import type { Metadata } from "next";
import HomePageClient from "./components/HomePageClient";
import { buildCanonicalMetadata } from "../lib/seo";

export const metadata: Metadata = buildCanonicalMetadata("/");

export default function Page() {
  return <HomePageClient />;
}
 
