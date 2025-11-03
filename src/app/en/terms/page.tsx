"use client";
import { useLanguage } from "../../../hooks/useLanguage";
import { getTranslation } from "../../../lib/i18n";

export default function TermsPage() {
  const language = useLanguage();
  const t = (key: keyof typeof import('../../../lib/i18n').translations.zh, params?: Record<string, string | number>) => 
    getTranslation(language, key, params);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h1 className="text-4xl font-light text-gray-900 mb-8">Terms of Service</h1>
          
          <div className="prose prose-gray max-w-none">
            <p className="text-lg text-gray-600 mb-8">
              <strong>Last updated:</strong> {new Date().toLocaleDateString('en-US')}
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 mb-6">
              By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. 
              If you do not agree to abide by the above, please do not use this service.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">2. Description of Service</h2>
            <p className="text-gray-700 mb-4">
              Our service provides a free online tool to convert PNG images to PDF files. The service includes:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li>Client-side PNG to PDF conversion</li>
              <li>Support for multiple image formats (PNG, JPG, JPEG, WEBP)</li>
              <li>Batch image merge functionality</li>
              <li>High-quality output</li>
              <li>Preserves original image quality</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">3. User Responsibilities</h2>
            <p className="text-gray-700 mb-4">As a user of our service, you agree to:</p>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li>Use the service only for lawful purposes</li>
              <li>Not upload malicious or harmful files</li>
              <li>Respect intellectual property rights</li>
              <li>Not attempt to reverse engineer or exploit the service</li>
              <li>Not use the service for commercial purposes without permission</li>
              <li>Ensure you have the right to convert any image files you upload</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">4. Prohibited Uses</h2>
            <p className="text-gray-700 mb-4">You may not use our service:</p>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
              <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
              <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
              <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
              <li>To submit false or misleading information</li>
              <li>To upload or transmit viruses or any other type of malicious code</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">5. Service Availability</h2>
            <p className="text-gray-700 mb-6">
              We strive to provide continuous service availability, but we do not guarantee uninterrupted access. 
              The service may be temporarily unavailable due to maintenance, updates, or technical issues. 
              We reserve the right to modify or discontinue the service at any time without notice.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">6. Intellectual Property</h2>
            <p className="text-gray-700 mb-4">
              The service and its original content, features, and functionality are and will remain the exclusive property 
              of our company and its licensors. The service is protected by copyright, trademark, and other laws.
            </p>
            <p className="text-gray-700 mb-6">
              You retain all rights to the image files you upload and the PDF files generated from them. 
              We do not claim ownership of your content.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">7. Privacy and Data Protection</h2>
            <p className="text-gray-700 mb-6">
              Your privacy is important to us. All PNG to PDF conversions are performed locally in your browser, 
              and your files are never uploaded to our servers. Please review our Privacy Policy 
              for detailed information about how we collect, use, and protect your information.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">8. Limitation of Liability</h2>
            <p className="text-gray-700 mb-6">
              In no event shall our company, nor its directors, employees, partners, agents, suppliers, or affiliates, 
              be liable for any indirect, incidental, special, consequential, or punitive damages, including without 
              limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use 
              of the service.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">9. Disclaimer</h2>
            <p className="text-gray-700 mb-6">
              The information on this website is provided on an "as is" basis. To the fullest extent permitted by law, 
              this company excludes all representations, warranties, conditions and terms relating to our website and 
              the use of this website.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">10. Governing Law</h2>
            <p className="text-gray-700 mb-6">
              These Terms shall be interpreted and governed by the laws of [Your Jurisdiction], without regard to 
              its conflict of law provisions. Our failure to enforce any right or provision of these Terms will 
              not be considered a waiver of those rights.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">11. Changes to Terms</h2>
            <p className="text-gray-700 mb-6">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. 
              If a revision is material, we will try to provide at least 30 days notice prior to any new terms 
              taking effect.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">12. Contact Information</h2>
            <p className="text-gray-700 mb-8">
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <p className="text-gray-700 mb-8">
              Email: legal@pdf2png.com<br />
              Address: [Your Company Address]
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
