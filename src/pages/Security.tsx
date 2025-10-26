import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Lock, Eye, CheckCircle2, Server, FileCheck } from 'lucide-react';
import SEO from '../components/SEO';

export default function Security() {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Security - TCEvaluator"
        description="Learn about TCEvaluator's security measures and data protection practices"
        canonical="/security"
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield size={32} className="text-blue-600" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Security & Compliance</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your data security is our top priority. We implement industry-leading security measures to protect sensitive student information.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
              <Lock size={40} className="mb-4" />
              <h3 className="text-2xl font-bold mb-4">End-to-End Encryption</h3>
              <p className="text-blue-100 leading-relaxed">
                All data is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption. Your sensitive information is protected at every stage.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-2xl p-8 text-white">
              <FileCheck size={40} className="mb-4" />
              <h3 className="text-2xl font-bold mb-4">FERPA Compliant</h3>
              <p className="text-green-100 leading-relaxed">
                Fully compliant with the Family Educational Rights and Privacy Act (FERPA) and other education-specific regulations.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl p-8 text-white">
              <Eye size={40} className="mb-4" />
              <h3 className="text-2xl font-bold mb-4">Access Controls</h3>
              <p className="text-purple-100 leading-relaxed">
                Role-based access controls and multi-factor authentication ensure only authorized users can access sensitive data.
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-600 to-orange-800 rounded-2xl p-8 text-white">
              <Server size={40} className="mb-4" />
              <h3 className="text-2xl font-bold mb-4">Secure Infrastructure</h3>
              <p className="text-orange-100 leading-relaxed">
                Hosted on enterprise-grade infrastructure with 99.9% uptime SLA, regular backups, and disaster recovery plans.
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-12 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Security Features</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <CheckCircle2 size={24} className="text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Regular Security Audits</h4>
                  <p className="text-gray-600">Third-party security assessments and penetration testing</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 size={24} className="text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Continuous Monitoring</h4>
                  <p className="text-gray-600">24/7 system monitoring and intrusion detection</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 size={24} className="text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Data Backup</h4>
                  <p className="text-gray-600">Automated daily backups with encryption</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 size={24} className="text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Audit Trails</h4>
                  <p className="text-gray-600">Complete logging of all system access and changes</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 size={24} className="text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Secure Development</h4>
                  <p className="text-gray-600">Secure coding practices and code review processes</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 size={24} className="text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Incident Response</h4>
                  <p className="text-gray-600">Dedicated security team with rapid response protocols</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 size={24} className="text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Staff Training</h4>
                  <p className="text-gray-600">Regular security training for all team members</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 size={24} className="text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Compliance Updates</h4>
                  <p className="text-gray-600">Continuous updates to meet evolving security standards</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-12 text-center text-white">
            <h2 className="text-4xl font-bold mb-4">Questions About Security?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Our security team is here to answer any questions about our data protection practices and compliance standards.
            </p>
            <Link
              to="/contact"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Contact Security Team
            </Link>
          </div>
        </div>
      </main>

      <footer className="bg-gray-50 border-t border-gray-200 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600">
          <p>&copy; 2024 TCEvaluator. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
