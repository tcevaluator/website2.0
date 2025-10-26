import { Link } from 'react-router-dom';
import { ArrowLeft, Check, Zap, Building2, Users } from 'lucide-react';
import SEO from '../components/SEO';

export default function Pricing() {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Pricing - TCEvaluator"
        description="Flexible pricing plans for institutions of all sizes. Choose the plan that fits your needs."
        canonical="/pricing"
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
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Simple, Transparent Pricing</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the plan that fits your institution's needs. All plans include full support and regular updates.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-blue-600 transition-all">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Zap size={24} className="text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Starter</h3>
              <p className="text-gray-600 mb-6">Perfect for small institutions</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">$499</span>
                <span className="text-gray-600">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <Check size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Up to 500 evaluations/month</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">5 user accounts</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Email support</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Basic reporting</span>
                </li>
              </ul>
              <Link
                to="/contact"
                className="block w-full text-center bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
              >
                Get Started
              </Link>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 text-white relative transform scale-105 shadow-xl">
              <div className="absolute top-4 right-4 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold">
                POPULAR
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                <Building2 size={24} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Professional</h3>
              <p className="text-blue-100 mb-6">For growing institutions</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">$999</span>
                <span className="text-blue-100">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <Check size={20} className="text-white flex-shrink-0 mt-0.5" />
                  <span>Up to 2,000 evaluations/month</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check size={20} className="text-white flex-shrink-0 mt-0.5" />
                  <span>15 user accounts</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check size={20} className="text-white flex-shrink-0 mt-0.5" />
                  <span>Priority email & phone support</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check size={20} className="text-white flex-shrink-0 mt-0.5" />
                  <span>Advanced reporting & analytics</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check size={20} className="text-white flex-shrink-0 mt-0.5" />
                  <span>API access</span>
                </li>
              </ul>
              <Link
                to="/contact"
                className="block w-full text-center bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Get Started
              </Link>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-blue-600 transition-all">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Users size={24} className="text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Enterprise</h3>
              <p className="text-gray-600 mb-6">For large institutions</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">Custom</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <Check size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Unlimited evaluations</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Unlimited user accounts</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">24/7 dedicated support</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Custom integrations</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Dedicated account manager</span>
                </li>
              </ul>
              <Link
                to="/contact"
                className="block w-full text-center bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
              >
                Contact Sales
              </Link>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">All plans include</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div>
                <Check size={24} className="text-green-600 mx-auto mb-2" />
                <p className="text-gray-700 font-medium">FERPA Compliant</p>
              </div>
              <div>
                <Check size={24} className="text-green-600 mx-auto mb-2" />
                <p className="text-gray-700 font-medium">Regular Updates</p>
              </div>
              <div>
                <Check size={24} className="text-green-600 mx-auto mb-2" />
                <p className="text-gray-700 font-medium">Data Security</p>
              </div>
              <div>
                <Check size={24} className="text-green-600 mx-auto mb-2" />
                <p className="text-gray-700 font-medium">Training Resources</p>
              </div>
            </div>
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
