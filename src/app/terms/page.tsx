import type { Metadata } from "next";
import { buildCanonicalMetadata } from "../../lib/seo";
import { SiteHeader } from "../components/SiteHeader";

const PRODUCT_NAME = "JPG to Word";
const CONTACT_EMAIL = "support@jpgtoword.best";

export default function TermsPage() {
  const lastUpdated = new Date().toLocaleDateString("en-US");

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h1 className="text-4xl font-light text-gray-900 mb-8">Terms of Service</h1>

          <div className="prose prose-gray max-w-none">
            <p className="text-lg text-gray-600 mb-8">
              <strong>Last updated:</strong> {lastUpdated}
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 mb-6">
              By accessing or using {PRODUCT_NAME}, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree, do not use the service.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">2. Description of Service</h2>
            <p className="text-gray-700 mb-4">
              {PRODUCT_NAME} is a free browser-based tool that converts JPG, JPEG, PNG, and WebP images into editable Word (DOCX) files using local OCR.
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li>All conversions occur locally in your browser.</li>
              <li>Support for up to 20 images (≤10MB each, ≤200MB total) per batch.</li>
              <li>Multi-language OCR (Tesseract.js) plus clean DOCX export.</li>
              <li>No server-side storage of your files.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">3. User Responsibilities</h2>
            <p className="text-gray-700 mb-4">You agree to:</p>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li>Use the service only for lawful purposes.</li>
              <li>Ensure you have the rights to the images you convert.</li>
              <li>Not upload files that contain malicious code or infringe intellectual property.</li>
              <li>Respect the privacy of others and avoid processing sensitive personal data.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">4. Prohibited Uses</h2>
            <p className="text-gray-700 mb-4">You must not use {PRODUCT_NAME} to:</p>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li>Violate any laws or regulations.</li>
              <li>Transmit malware, spyware, or other harmful content.</li>
              <li>Attempt to reverse engineer, scrape, or overload the service.</li>
              <li>Misrepresent the origin of converted documents.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">5. Service Availability</h2>
            <p className="text-gray-700 mb-6">
              We strive for high uptime but do not guarantee uninterrupted availability. We may modify, suspend, or discontinue any part of the service without notice.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">6. Intellectual Property</h2>
            <p className="text-gray-700 mb-6">
              {PRODUCT_NAME}, its branding, and its code remain our property or that of our licensors. You retain full ownership of the images you upload and the DOCX files generated for you.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">7. Privacy</h2>
            <p className="text-gray-700 mb-6">
              Please review our Privacy Policy to understand how we handle analytics data and protect your information. All OCR and DOCX export stay on your device.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">8. Limitation of Liability</h2>
            <p className="text-gray-700 mb-6">
              {PRODUCT_NAME} is provided “as is.” We are not liable for any indirect, incidental, or consequential damages arising from your use or inability to use the service.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">9. Disclaimer</h2>
            <p className="text-gray-700 mb-6">
              We make no warranties regarding accuracy, reliability, or availability. You use the service at your own risk.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">10. Governing Law</h2>
            <p className="text-gray-700 mb-6">
              These Terms are governed by the laws of your local jurisdiction. Any disputes will be resolved in competent courts of that jurisdiction.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">11. Changes to Terms</h2>
            <p className="text-gray-700 mb-6">
              We may update these Terms from time to time. Material changes will be posted on this page with a new “Last updated” date.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">12. Contact</h2>
            <p className="text-gray-700 mb-8">
              Questions about these Terms? Email us at <a className="text-blue-600 hover:text-blue-800" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <a
              href="/"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              ← Back to {PRODUCT_NAME}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export const metadata: Metadata = buildCanonicalMetadata("/terms");

