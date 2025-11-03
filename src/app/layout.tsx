import "./../styles/globals.css";
import type { ReactNode } from "react";
import Script from "next/script";

export const metadata = {
  title: "PDF to PNG — Free Online Converter | High Quality & Private",
  description: "Convert PDF to PNG instantly in your browser. Fast, high-quality PDF to PNG conversion with multi-page support, batch export, and ZIP download. 100% client-side processing, no uploads required, complete privacy protection.",
  metadataBase: new URL("https://pdftopng.online"),
  alternates: {
    canonical: "https://pdftopng.online/"
  },
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
    url: "https://pdftopng.online/",
    title: "PDF to PNG — Free Online Converter | High Quality & Private",
    siteName: "PDF to PNG Online",
    description: "Convert PDF to PNG instantly in your browser. Fast, high-quality PDF to PNG conversion with multi-page support, batch export, and ZIP download. 100% client-side processing, no uploads required, complete privacy protection.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "PDF to PNG Online"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "PDF to PNG — Free Online Converter | High Quality & Private",
    description: "Convert PDF to PNG instantly in your browser. Fast, high-quality PDF to PNG conversion with multi-page support, batch export, and ZIP download. 100% client-side processing, no uploads required, complete privacy protection.",
    images: ["/og.png"],
    site: "@",
    creator: "@"
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-SLP1QZLBL3";
  return (
    <html lang="zh-CN">
      <head>
        <Script id="ld-json-website" type="application/ld+json" strategy="afterInteractive">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "PDF to PNG Online",
              "url": "https://pdftopng.online/",
              "inLanguage": "en",
              "alternateName": ["PDF 转 PNG 在线转换", "PDF to PNG Converter"],
              "description": "Convert PDF to PNG instantly in your browser. Fast, high-quality PDF to PNG conversion with multi-page support, batch export, and ZIP download. 100% client-side processing, no uploads required, complete privacy protection.",
              "publisher": {
                "@type": "Organization",
                "name": "PDF to PNG",
                "url": "https://pdftopng.online/",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://pdftopng.online/android-chrome-512x512.png",
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
              "name": "PDF to PNG Online Converter",
              "applicationCategory": "Utility",
              "operatingSystem": "Web",
              "url": "https://pdftopng.online/",
              "image": "https://pdftopng.online/og.png",
              "description": "Convert PDF to PNG instantly in your browser. Fast, high-quality PDF to PNG conversion with multi-page support, batch export, and ZIP download. 100% client-side processing, no uploads required, complete privacy protection.",
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
        {process.env.NODE_ENV === 'production' && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-gtag" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        )}
        {children}
      </body>
    </html>
  );
}