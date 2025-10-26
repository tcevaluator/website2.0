import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Navigation from '../components/Navigation';

function Terms() {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Terms of Service | TCEvaluator"
        description="Read TCEvaluator's terms of service to understand the terms and conditions of using our platform."
        canonical="https://tcevaluator.com/terms"
      />

      <Navigation />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-44 pb-20">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">Terms of Service</h1>
        <p className="text-gray-600 mb-12">Last updated: October 24, 2025</p>

        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Agreement to Terms</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              By accessing or using TCEvaluator's platform and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Description of Services</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              TCEvaluator provides an AI-powered platform for evaluating transfer credits in higher education. Our services include:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>Automated transcript analysis and course equivalency evaluation</li>
              <li>AI-assisted decision-making tools for transfer credit officers</li>
              <li>Dashboard and reporting capabilities</li>
              <li>Integration with institutional systems</li>
              <li>Training and support resources</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">User Accounts</h2>

            <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">Registration</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              To access our services, you must create an account and provide accurate, complete information. You are responsible for maintaining the confidentiality of your account credentials.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">Account Responsibilities</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              You are responsible for:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>All activities that occur under your account</li>
              <li>Maintaining the security of your login credentials</li>
              <li>Notifying us immediately of any unauthorized access</li>
              <li>Ensuring your institution's authorized use of the platform</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Acceptable Use</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You agree not to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>Use the platform for any unlawful purpose</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with or disrupt the platform's operation</li>
              <li>Reverse engineer or attempt to extract source code</li>
              <li>Use automated systems to access the platform without permission</li>
              <li>Share your account access with unauthorized users</li>
              <li>Upload malicious code or harmful content</li>
              <li>Violate any applicable laws or regulations</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Intellectual Property</h2>

            <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">Our Intellectual Property</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              All content, features, and functionality of TCEvaluator, including but not limited to software, text, graphics, logos, and trademarks, are owned by TCEvaluator and protected by intellectual property laws.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">Your Content</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              You retain ownership of any academic data, transcripts, and content you upload to our platform. By uploading content, you grant us a limited license to process, store, and analyze this data solely to provide our services.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Subscription and Payment</h2>

            <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">Fees and Billing</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              You agree to pay all fees associated with your subscription plan. Fees are billed in advance on a recurring basis. All fees are non-refundable except as required by law.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">Price Changes</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may change our pricing at any time. We will provide you with advance notice of any price changes, and you will have the opportunity to cancel your subscription before the new prices take effect.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-6">Cancellation</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              You may cancel your subscription at any time. Cancellations will take effect at the end of your current billing period. No refunds will be provided for partial billing periods.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Data and Privacy</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Your use of our services is also governed by our <Link to="/privacy" className="text-blue-600 hover:text-blue-700 underline">Privacy Policy</Link>. We are committed to protecting your data and complying with applicable privacy laws including FERPA for educational institutions.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">AI-Generated Results</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              TCEvaluator uses artificial intelligence to assist with transfer credit evaluations. You acknowledge that:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>AI-generated recommendations are tools to assist human decision-makers</li>
              <li>Final transfer credit decisions remain the responsibility of your institution</li>
              <li>You should review and verify AI-generated results before making final decisions</li>
              <li>The accuracy of AI recommendations depends on the quality of input data</li>
              <li>We continuously improve our AI models but cannot guarantee perfect accuracy</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Service Availability</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We strive to maintain high availability of our platform. However, we do not guarantee uninterrupted access and may experience downtime for maintenance, updates, or unforeseen issues. We are not liable for any damages resulting from service interruptions.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              To the maximum extent permitted by law, TCEvaluator shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or other intangible losses resulting from:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
              <li>Your use or inability to use our services</li>
              <li>Any unauthorized access to or use of our servers</li>
              <li>Any interruption or cessation of services</li>
              <li>Any errors or omissions in content or AI-generated results</li>
              <li>Any conduct or content of third parties</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Indemnification</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You agree to indemnify and hold harmless TCEvaluator and its affiliates from any claims, damages, losses, liabilities, and expenses arising from your use of our services or violation of these terms.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Termination</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We reserve the right to suspend or terminate your account and access to our services at any time, with or without notice, for conduct that we believe violates these Terms of Service or is harmful to other users, us, or third parties, or for any other reason.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Modifications to Terms</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We reserve the right to modify these Terms of Service at any time. We will notify you of any material changes by posting the new terms on our platform and updating the "Last updated" date. Your continued use of the platform after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Governing Law</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              These Terms of Service shall be governed by and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Dispute Resolution</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Any disputes arising from these terms or your use of our services shall first be attempted to be resolved through good faith negotiations. If negotiations fail, disputes shall be resolved through binding arbitration in accordance with applicable arbitration rules.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Severability</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If any provision of these Terms of Service is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have questions about these Terms of Service, please contact us at:
            </p>
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <p className="text-gray-700 mb-2"><strong>Email:</strong> info@tcevaluator.com</p>
              <p className="text-gray-700 mb-2"><strong>Website:</strong> www.tcevaluator.com</p>
              
            </div>
          </section>
        </div>
      </div>

      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <img src="/logo.svg" alt="TCEvaluator" className="h-8 mb-4 brightness-0 invert" />
              <p className="text-gray-400 leading-relaxed">
                AI-powered transfer credit evaluation platform designed for modern higher education institutions.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 TCEvaluator. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Terms;