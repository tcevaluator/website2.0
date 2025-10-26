import { Link } from 'react-router-dom';
import { Shield, Lock, Eye, FileCheck, Server, AlertTriangle, CheckCircle2, Key } from 'lucide-react';
import SEO from '../components/SEO';
import Navigation from '../components/Navigation';

function Security() {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Security | TCEvaluator"
        description="Learn about TCEvaluator's security practices and commitment to protecting your institution's data."
        canonical="https://tcevaluator.com/security"
      />

      <Navigation activeLink="security" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
            <Shield className="text-blue-600" size={32} />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Security at TCEvaluator</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We understand the sensitivity of academic data. Our security practices are designed to protect your institution's information with industry-leading standards.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Lock className="text-blue-600" size={24} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Data Encryption</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              All data is encrypted both in transit and at rest using industry-standard AES-256 encryption. We use TLS 1.3 for all data transmission to ensure your information remains secure.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-gray-700">
                <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={18} />
                <span>AES-256 encryption at rest</span>
              </li>
              <li className="flex items-start gap-2 text-gray-700">
                <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={18} />
                <span>TLS 1.3 for data in transit</span>
              </li>
              <li className="flex items-start gap-2 text-gray-700">
                <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={18} />
                <span>Encrypted database backups</span>
              </li>
            </ul>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Key className="text-blue-600" size={24} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Access Control</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Strict access controls ensure that only authorized users can access your data. We implement role-based access control and multi-factor authentication.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-gray-700">
                <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={18} />
                <span>Role-based access control (RBAC)</span>
              </li>
              <li className="flex items-start gap-2 text-gray-700">
                <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={18} />
                <span>Multi-factor authentication (MFA)</span>
              </li>
              <li className="flex items-start gap-2 text-gray-700">
                <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={18} />
                <span>Regular access reviews and audits</span>
              </li>
            </ul>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Server className="text-blue-600" size={24} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Infrastructure Security</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our platform is hosted on enterprise-grade cloud infrastructure with redundancy, automated backups, and 24/7 monitoring to ensure reliability and security.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-gray-700">
                <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={18} />
                <span>Enterprise cloud hosting with SOC 2 compliance</span>
              </li>
              <li className="flex items-start gap-2 text-gray-700">
                <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={18} />
                <span>Automated daily backups with point-in-time recovery</span>
              </li>
              <li className="flex items-start gap-2 text-gray-700">
                <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={18} />
                <span>99.9% uptime SLA</span>
              </li>
            </ul>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Eye className="text-blue-600" size={24} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Monitoring & Logging</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Comprehensive monitoring and logging help us detect and respond to security threats in real-time, ensuring your data remains protected.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-gray-700">
                <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={18} />
                <span>24/7 security monitoring and alerts</span>
              </li>
              <li className="flex items-start gap-2 text-gray-700">
                <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={18} />
                <span>Detailed audit logs for all activities</span>
              </li>
              <li className="flex items-start gap-2 text-gray-700">
                <CheckCircle2 className="text-green-600 flex-shrink-0 mt-1" size={18} />
                <span>Automated threat detection</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <FileCheck className="text-blue-600" size={32} />
              <h2 className="text-3xl font-bold text-gray-900">Compliance & Certifications</h2>
            </div>
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <p className="text-gray-700 leading-relaxed mb-6">
                TCEvaluator is committed to meeting and exceeding industry standards for data security and privacy. We maintain compliance with relevant regulations for educational institutions.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">FERPA Compliance</h4>
                  <p className="text-gray-700 text-sm">
                    Our platform is designed to comply with the Family Educational Rights and Privacy Act (FERPA) to protect student education records.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">SOC 2 Type II</h4>
                  <p className="text-gray-700 text-sm">
                    Our infrastructure providers maintain SOC 2 Type II certification, demonstrating commitment to security, availability, and confidentiality.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">GDPR Ready</h4>
                  <p className="text-gray-700 text-sm">
                    We follow GDPR principles for data protection and provide tools for data subject rights management.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Regular Audits</h4>
                  <p className="text-gray-700 text-sm">
                    We conduct regular security audits and penetration testing to identify and address potential vulnerabilities.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="text-blue-600" size={32} />
              <h2 className="text-3xl font-bold text-gray-900">Incident Response</h2>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-gray-200">
              <p className="text-gray-700 leading-relaxed mb-6">
                We maintain a comprehensive incident response plan to quickly address any security events:
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-600 font-semibold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Detection</h4>
                    <p className="text-gray-700 text-sm">Automated monitoring systems detect potential security incidents in real-time.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-600 font-semibold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Response</h4>
                    <p className="text-gray-700 text-sm">Our security team responds immediately to contain and investigate the incident.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-600 font-semibold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Communication</h4>
                    <p className="text-gray-700 text-sm">Affected customers are notified promptly with transparent information about the incident.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-600 font-semibold text-sm">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Recovery</h4>
                    <p className="text-gray-700 text-sm">We restore normal operations and implement measures to prevent future incidents.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Security Best Practices for Users</h2>
            <div className="bg-blue-50 rounded-2xl p-8 border border-blue-200">
              <p className="text-gray-700 leading-relaxed mb-6">
                While we implement robust security measures, you can help protect your account by following these best practices:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-gray-700">
                  <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-1" size={18} />
                  <span>Use strong, unique passwords and enable multi-factor authentication</span>
                </li>
                <li className="flex items-start gap-2 text-gray-700">
                  <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-1" size={18} />
                  <span>Never share your login credentials with others</span>
                </li>
                <li className="flex items-start gap-2 text-gray-700">
                  <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-1" size={18} />
                  <span>Log out when using shared or public computers</span>
                </li>
                <li className="flex items-start gap-2 text-gray-700">
                  <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-1" size={18} />
                  <span>Keep your devices and browsers up to date</span>
                </li>
                <li className="flex items-start gap-2 text-gray-700">
                  <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-1" size={18} />
                  <span>Report any suspicious activity to our security team immediately</span>
                </li>
                <li className="flex items-start gap-2 text-gray-700">
                  <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-1" size={18} />
                  <span>Be cautious of phishing attempts and verify email authenticity</span>
                </li>
              </ul>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Report a Security Concern</h2>
            <div className="bg-white rounded-2xl p-8 border border-gray-200">
              <p className="text-gray-700 leading-relaxed mb-6">
                If you discover a security vulnerability or have concerns about the security of our platform, please contact our security team immediately:
              </p>
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <p className="text-gray-700 mb-2"><strong>Security Email:</strong> info@tcevaluator.com</p>
                <p className="text-gray-700 mb-4"><strong>Response Time:</strong> We aim to respond to security reports within 24 hours</p>
                <p className="text-gray-600 text-sm">
                  We appreciate responsible disclosure and will work with security researchers to address any vulnerabilities promptly.
                </p>
              </div>
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
                <li><Link to="/security" className="hover:text-white transition-colors">Security</Link></li>
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

export default Security;
