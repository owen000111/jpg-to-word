import "./../styles/globals.css";
import type { ReactNode } from "react";
import Script from "next/script";

export const metadata = {
  title: "JPG to Word — Free Online OCR | Private & Fast",
  description: "Convert JPG/PNG images to editable Word (DOCX) directly in your browser. Local OCR, multi-image merge, zero uploads.",
  metadataBase: new URL("https://jpgtoword.best"),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" }
    ],
    apple: "/apple-touch-icon.png"
  },
  openGraph: {
    type: "website",
    url: "https://jpgtoword.best/",
    title: "JPG to Word — Free Online OCR | Private & Fast",
    siteName: "JPG to Word Online",
    description: "Convert JPG/PNG images to editable Word (DOCX) directly in your browser. Local OCR, multi-image merge, zero uploads.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "JPG to Word Online"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "JPG to Word — Free Online OCR | Private & Fast",
    description: "Convert JPG/PNG images to editable Word (DOCX) directly in your browser. Local OCR, multi-image merge, zero uploads.",
    images: ["/og.png"],
    site: "@",
    creator: "@"
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-WC7LHLMKXJ";
  const SHOULD_LOAD_GA = process.env.NEXT_PUBLIC_LOAD_GA === "true" || process.env.NODE_ENV === "production";
  return (
    <html lang="zh-CN">
      <head>
        <Script id="ld-json-website" type="application/ld+json" strategy="afterInteractive">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "JPG to Word Online",
              "url": "https://jpgtoword.best/",
              "inLanguage": "en",
              "alternateName": ["JPG to Word Online Converter", "Image to Word OCR"],
              "description": "Convert JPG/PNG images to editable Word (DOCX) directly in your browser. Local OCR, multi-image merge, zero uploads.",
              "publisher": {
                "@type": "Organization",
                "name": "JPG to Word",
                "url": "https://jpgtoword.best/",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://jpgtoword.best/android-chrome-512x512.png",
                  "width": 512,
                  "height": 512
                }
              }
            }
          `}
        </Script>
        <Script id="ld-json-software" type="application/ld+json" strategy="afterInteractive">
          {`
            {
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "JPG to Word Online Converter",
              "applicationCategory": "Utility",
              "operatingSystem": "Web",
              "url": "https://jpgtoword.best/",
              "image": "https://jpgtoword.best/og.png",
              "description": "Convert JPG/PNG images to editable Word (DOCX) directly in your browser. Local OCR, multi-image merge, zero uploads.",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              }
            }
          `}
        </Script>
      </head>
      <body className="min-h-screen bg-gray-50">
        {SHOULD_LOAD_GA && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
              onError={(e) => {
                console.warn("Failed to load GA script", e);
              }}
            />
            <Script id="ga-gtag" strategy="afterInteractive">
              {`
                try {
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_ID}');
                } catch (err) {
                  console.warn('GA init skipped', err);
                }
              `}
            </Script>
          </>
        )}
        {children}
      </body>
    </html>
  );
}