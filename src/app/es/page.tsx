import type { Metadata } from "next";
import { buildCanonicalMetadata } from "../../lib/seo";

export { default } from "../page";

export const metadata: Metadata = buildCanonicalMetadata("/es");


