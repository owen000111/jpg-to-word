"use client";
import { useLanguage } from "../../../hooks/useLanguage";
import { getTranslation } from "../../../lib/i18n";

export default function PrivacyPage() {
  const language = useLanguage();
  const t = (key: keyof typeof import('../../../lib/i18n').translations.zh, params?: Record<string, string | number>) => 
    getTranslation(language, key, params);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h1 className="text-4xl font-light text-gray-900 mb-8">Privacy Policy</h1>
          
          <div className="prose prose-gray max-w-none">
            <p className="text-lg text-gray-600 mb-8">
              <strong>Last updated:</strong> {new Date().toLocaleDateString('en-US')}
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">1. Information We Collect</h2>
            <p className="text-gray-700 mb-4">
              When you use our PNG to PDF conversion service, we may collect the following information:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li><strong>Usage Data:</strong> We collect information about how you interact with our website, including pages visited, time spent on pages, and conversion activities.</li>
              <li><strong>Device Information:</strong> We may collect information about your device, including browser type, operating system, and IP address.</li>
              <li><strong>File Information:</strong> We collect metadata about the image files you upload, such as file size, number of images, and conversion settings.</li>
              <li><strong>Performance Data:</strong> We track conversion success rates, processing times, and error logs to improve our service.</li>
              <li>etc.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-700 mb-4">We use the collected information to:</p>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li>Provide and improve our PNG to PDF conversion services</li>
              <li>Analyze usage patterns to enhance user experience</li>
              <li>Monitor service performance and troubleshoot issues</li>
              <li>Generate anonymous usage statistics and analytics</li>
              <li>Ensure the security and integrity of our platform</li>
              <li>etc.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">3. Data Processing and Storage</h2>
            <p className="text-gray-700 mb-4">
              <strong>Local Processing:</strong> All PNG to PDF conversions are performed locally in your browser. 
              Your files are never uploaded to our servers, ensuring maximum privacy and security.
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Data Retention:</strong> We do not store your image files or converted PDF files.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">4. Third-Party Services</h2>
            <p className="text-gray-700 mb-4">
              We use the following third-party services that may collect additional information:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li><strong>Analytics:</strong> We use Google Analytics to understand website usage patterns</li>
              <li><strong>CDN Services:</strong> We use content delivery networks to serve our PDF processing libraries (pdf-lib)</li>
              <li><strong>Hosting:</strong> Our website is hosted on Vercel, which may collect standard web server logs</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">5. Your Rights</h2>
            <p className="text-gray-700 mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of data collection (though this may affect service functionality)</li>
              <li>Data portability</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">6. Cookies and Tracking</h2>
            <p className="text-gray-700 mb-4">
              We use essential cookies to maintain your language preference and session state. 
              We do not use tracking cookies or advertising cookies.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">7. Security</h2>
            <p className="text-gray-700 mb-4">
              We implement appropriate technical and organizational measures to protect your information 
              against unauthorized access, alteration, disclosure, or destruction.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">8. Changes to This Policy</h2>
            <p className="text-gray-700 mb-4">
              We may update this Privacy Policy from time to time. We will notify you of any changes 
              by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">9. Contact Us</h2>
            <p className="text-gray-700 mb-4">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p className="text-gray-700 mb-8">
              Email: ouyanghuiping@gmail.com
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">10. Final Interpretation</h2>
            <p className="text-gray-700 mb-8">
              The final interpretation right of this privacy agreement belongs to this website. If you have any questions, please feel free to contact us.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <a 
              href="/en" 
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              ← Back to PNG to PDF Converter
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
