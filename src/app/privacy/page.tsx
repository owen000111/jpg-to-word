import type { Metadata } from "next";
import { buildCanonicalMetadata } from "../../lib/seo";
import { SiteHeader } from "../components/SiteHeader";

const PRODUCT_NAME = "JPG to Word";
const CONTACT_EMAIL = "support@jpgtoword.best";

export default function PrivacyPage() {
  const lastUpdated = new Date().toLocaleDateString("en-US");

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h1 className="text-4xl font-light text-gray-900 mb-8">Privacy Policy</h1>

          <div className="prose prose-gray max-w-none">
            <p className="text-lg text-gray-600 mb-8">
              <strong>Last updated:</strong> {lastUpdated}
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">1. Information We Collect</h2>
            <p className="text-gray-700 mb-4">
              When you use {PRODUCT_NAME}, a browser-based JPG image to Word (DOCX) converter, we may collect limited technical information:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li><strong>Usage data:</strong> anonymous analytics on pages visited, time on page, features used, etc.</li>
              <li><strong>Device data:</strong> browser type, operating system, and general location (city/country).</li>
              <li><strong>Performance diagnostics:</strong> success rates, error messages, processing times, network timing, rendering stats, etc.</li>
              <li><strong>No file contents:</strong> the images you process never leave your browser and are not transmitted to our servers.</li>
              <li>And more.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">2. How We Use Information</h2>
            <p className="text-gray-700 mb-4">We use the limited data above to:</p>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li>Improve recognition accuracy and product stability.</li>
              <li>Monitor service uptime and investigate failures.</li>
              <li>Plan new features for {PRODUCT_NAME} and prioritize languages.</li>
              <li>Detect abuse and keep the platform secure.</li>
              <li>Compile high-level product metrics for roadmap planning, etc.</li>
              <li>And more.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">3. Local Processing</h2>
            <p className="text-gray-700 mb-4">
              Every JPG-to-DOCX conversion is performed locally in your browser with WebAssembly (Tesseract.js + docx). 
              We do not upload the images you select, the extracted text, or the generated DOCX files to any remote server.
            </p>
            <p className="text-gray-700 mb-6">
              Closing or refreshing the page immediately clears the files from memory. You are responsible for securely storing downloaded DOCX files on your device.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">4. Third-Party Services</h2>
            <p className="text-gray-700 mb-4">
              We rely on a few subprocessors to operate {PRODUCT_NAME}:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li><strong>Vercel:</strong> hosts the marketing site and serves static assets.</li>
              <li><strong>Google Analytics 4:</strong> optional analytics loaded only when enabled to understand aggregated usage.</li>
              <li><strong>CDNs:</strong> deliver open-source libraries (e.g., Tesseract.js, docx) efficiently.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">5. Data Retention</h2>
            <p className="text-gray-700 mb-6">
              We do not store your uploaded images or generated DOCX files.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">6. Your Rights</h2>
            <p className="text-gray-700 mb-4">
              Depending on your jurisdiction, you may have rights to access, correct, or delete personal data we hold. Because {PRODUCT_NAME} processes files locally, the only data we typically hold is anonymous analytics. 
              Contact us if you need assistance with a data request.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">7. Cookies</h2>
            <p className="text-gray-700 mb-6">
              We use essential cookies solely for remembering language preference and session state.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">8. Security</h2>
            <p className="text-gray-700 mb-6">
              We implement HTTPS/TLS, strict Content Security Policy headers, and dependency monitoring to keep the site secure. 
              Because conversions happen in your browser, the security of your device also plays a critical role.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">9. Changes to This Policy</h2>
            <p className="text-gray-700 mb-6">
              We may revise this Privacy Policy as the product evolves. Updated versions will be posted at this URL with a new "Last updated" date.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">10. Contact</h2>
            <p className="text-gray-700 mb-6">
              Questions about privacy? Email us at <a className="text-blue-600 hover:text-blue-800" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">11. Interpretation</h2>
            <p className="text-gray-700 mb-8">
              This Privacy Policy is written in English, and {PRODUCT_NAME} retains the final right of interpretation for all provisions herein.
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

export const metadata: Metadata = buildCanonicalMetadata("/privacy");

