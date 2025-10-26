import { Link } from 'react-router-dom';
import { ArrowLeft, FileText } from 'lucide-react';
import SEO from '../components/SEO';

export default function Terms() {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Terms of Service - TCEvaluator"
        description="TCEvaluator's terms of service and user agreement"
        canonical="/terms"
      />

      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-lg shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex-shrink-0">
              <img src="/logo.svg" alt="TCEvaluator" className="h-8" />
            </Link>
            <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">
              <ArrowLeft size={16} />
              Back to Home
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText size={32} className="text-blue-600" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Terms of Service</h1>
            <p className="text-gray-600">Last updated: October 26, 2024</p>
          </div>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                By accessing and using TCEvaluator's services, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Use License</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Permission is granted to temporarily access and use TCEvaluator's services for institutional transfer credit evaluation purposes. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose outside your institution</li>
                <li>Attempt to reverse engineer any software contained in our services</li>
                <li>Remove any copyright or proprietary notations</li>
                <li>Transfer the materials to another person or institution without authorization</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Account Responsibilities</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                You are responsible for:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                <li>Maintaining the confidentiality of your account credentials</li>
                <li>All activities that occur under your account</li>
                <li>Ensuring compliance with FERPA and other applicable regulations</li>
                <li>Promptly notifying us of any unauthorized access</li>
                <li>Ensuring that your use complies with all applicable laws</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Service Availability</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We strive to provide reliable service but do not guarantee uninterrupted access. We may modify, suspend, or discontinue any aspect of our services at any time. We are not liable for any modification, suspension, or discontinuation of the services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data and Privacy</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Your use of our services is also governed by our Privacy Policy. We are committed to protecting student educational records in accordance with FERPA and maintaining the highest standards of data security.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Intellectual Property</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                The service and its original content, features, and functionality are owned by TCEvaluator and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Limitation of Liability</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                In no event shall TCEvaluator be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses resulting from your access to or use of or inability to access or use the services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Indemnification</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                You agree to defend, indemnify, and hold harmless TCEvaluator and its licensors from and against any claims, liabilities, damages, losses, and expenses arising out of or in any way connected with your access to or use of the services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Governing Law</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                These terms shall be governed by and construed in accordance with the laws of the United States and the State of Massachusetts, without regard to its conflict of law provisions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Changes to Terms</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We reserve the right to modify or replace these terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                If you have any questions about these Terms, please contact us at:
              </p>
              <p className="text-gray-600 leading-relaxed">
                Email: <a href="mailto:legal@tcevaluator.com" className="text-blue-600 hover:underline">legal@tcevaluator.com</a><br />
                Phone: +1 (555) 123-4567<br />
                Address: 123 Education Lane, Suite 100, Boston, MA 02101
              </p>
            </section>
          </div>
        </div>
      </main>

      <footer className="bg-gray-50 border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600">
          <p>&copy; 2024 TCEvaluator. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
