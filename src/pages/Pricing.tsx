import { Link } from 'react-router-dom';
import { Check, ArrowRight, Zap, Building2, Sparkles, Users } from 'lucide-react';
import StripeCheckout from '../components/StripeCheckout';

function Pricing() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-lg shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex-shrink-0">
              <img src="/logo.svg" alt="TCEvaluator" className="h-8" />
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">Home</Link>
              <Link to="/about" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">About</Link>
              <Link to="/pricing" className="text-blue-600 text-sm font-medium">Pricing</Link>
              <Link to="/book-demo" className="bg-gray-900 text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium">
                Book a Demo
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 border border-blue-200 rounded-full mb-6">
            <Sparkles size={16} className="text-blue-600" />
            <span className="text-sm font-semibold text-blue-900">Simple, Transparent Pricing</span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Choose the plan that{' '}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              fits your institution
            </span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Flexible pricing designed to scale with your needs. No hidden fees, no surprises.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Starter Plan */}
            <div className="bg-white border-2 border-gray-200 rounded-3xl p-8 hover:shadow-xl transition-all">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Starter</h3>
                <p className="text-gray-600">Perfect for small institutions getting started</p>
              </div>
              <div className="mb-8">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-gray-900">$500</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">25 evaluations/month</p>
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <p className="text-sm text-gray-600">+ $4,000 implementation fee (one-time)</p>
                  <p className="text-xs text-gray-500 mt-1">$20 effective cost per evaluation</p>
                </div>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">2 user accounts included</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">7 programs supported</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">AI-powered transcript evaluation</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">Basic SIS integration</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">Email support</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">Standard reporting dashboard</span>
                </li>
              </ul>
              <StripeCheckout
                planName="Starter"
                priceId={import.meta.env.VITE_STRIPE_STARTER_PRICE_ID}
                buttonText="Get Started"
                buttonClass="block w-full text-center bg-gray-100 text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-200 transition-all font-semibold"
              />
            </div>

            {/* Professional Plan - Featured */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 border-2 border-blue-600 rounded-3xl p-8 relative hover:shadow-2xl transition-all transform hover:scale-105">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-bold">
                MOST POPULAR
              </div>
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">Professional</h3>
                <p className="text-blue-100">For growing institutions with high volume</p>
              </div>
              <div className="mb-8">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-white">$1,000</span>
                  <span className="text-blue-100">/month</span>
                </div>
                <p className="text-sm text-blue-200 mt-2">60 evaluations/month</p>
                <div className="mt-3 pt-3 border-t border-blue-400/30">
                  <p className="text-sm text-blue-100">+ $6,500 implementation fee (one-time)</p>
                  <p className="text-xs text-blue-200 mt-1">$17.50 effective cost per evaluation</p>
                </div>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="text-yellow-400 flex-shrink-0 mt-1" size={20} />
                  <span className="text-white font-medium">Everything in Starter, plus:</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-yellow-400 flex-shrink-0 mt-1" size={20} />
                  <span className="text-white">3 user accounts included</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-yellow-400 flex-shrink-0 mt-1" size={20} />
                  <span className="text-white">15 programs supported</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-yellow-400 flex-shrink-0 mt-1" size={20} />
                  <span className="text-white">Advanced SIS integration (Banner, Jenzabar, etc.)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-yellow-400 flex-shrink-0 mt-1" size={20} />
                  <span className="text-white">Priority support with 4-hour response time</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-yellow-400 flex-shrink-0 mt-1" size={20} />
                  <span className="text-white">Advanced analytics & reporting</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-yellow-400 flex-shrink-0 mt-1" size={20} />
                  <span className="text-white">Custom articulation rules</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-yellow-400 flex-shrink-0 mt-1" size={20} />
                  <span className="text-white">Student-facing portal</span>
                </li>
              </ul>
              <StripeCheckout
                planName="Professional"
                priceId={import.meta.env.VITE_STRIPE_PROFESSIONAL_PRICE_ID}
                buttonText="Get Started"
                buttonClass="group flex items-center justify-center gap-2 w-full text-center bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-50 transition-all font-bold shadow-xl"
              />
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white border-2 border-gray-200 rounded-3xl p-8 hover:shadow-xl transition-all">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Enterprise</h3>
                <p className="text-gray-600">For large institutions with custom needs</p>
              </div>
              <div className="mb-8">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-gray-900">$2,000</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">135 evaluations/month</p>
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <p className="text-sm text-gray-600">+ $10,000 implementation fee (one-time)</p>
                  <p className="text-xs text-gray-500 mt-1">$15 effective cost per evaluation</p>
                </div>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700 font-medium">Everything in Professional, plus:</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">5 user accounts included</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">30 programs supported</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">Dedicated account manager</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">24/7 phone & chat support</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">Custom API integrations</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">White-label options</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">On-site training & implementation</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <span className="text-gray-700">SLA guarantees</span>
                </li>
              </ul>
              <a
                href="/book-demo"
                className="block w-full text-center bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-all font-semibold"
              >
                Contact Sales
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Add-ons Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Add-On Services</h2>
            <p className="text-xl text-gray-600">Enhance your plan with additional features</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all">
              <Users className="text-blue-600 mb-3" size={24} />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Extra Users</h3>
              <p className="text-gray-600 mb-3">$100 per user/month</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all">
              <Building2 className="text-blue-600 mb-3" size={24} />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Extra Programs</h3>
              <p className="text-gray-600 mb-3">$200 per block of 5 programs</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all">
              <Zap className="text-blue-600 mb-3" size={24} />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Overage Evaluations</h3>
              <p className="text-gray-600 mb-3">$18 per evaluation beyond plan limit</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all">
              <Sparkles className="text-blue-600 mb-3" size={24} />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Annual Prepay</h3>
              <p className="text-gray-600 mb-3">10-15% discount on annual commitment</p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl p-6 text-white">
              <h3 className="text-2xl font-bold mb-2">Custom Enterprise Plans</h3>
              <p className="text-blue-100 mb-4">For institutions needing 500+ evaluations or 50+ programs per month</p>
              <a
                href="/book-demo"
                className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-50 transition-all font-semibold"
              >
                Contact Sales
                <ArrowRight size={20} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Calculate Your ROI</h2>
            <p className="text-xl text-blue-100">See how much TC Evaluator can save your institution</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6">Current Manual Process</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-white/20">
                  <span className="text-blue-100">Average time per evaluation</span>
                  <span className="font-bold text-xl">45 min</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-white/20">
                  <span className="text-blue-100">Evaluations per year (1,000)</span>
                  <span className="font-bold text-xl">750 hrs</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-white/20">
                  <span className="text-blue-100">Average hourly cost ($40)</span>
                  <span className="font-bold text-xl">$30,000</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-lg font-semibold">Annual Cost</span>
                  <span className="font-bold text-3xl text-red-300">$30,000</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-green-700 border-2 border-green-400 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6">With TC Evaluator</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-white/20">
                  <span className="text-green-100">Average time per evaluation</span>
                  <span className="font-bold text-xl">5 min</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-white/20">
                  <span className="text-green-100">Evaluations per year (1,000)</span>
                  <span className="font-bold text-xl">83 hrs</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-white/20">
                  <span className="text-green-100">Labor cost + Platform ($6,500/mo)</span>
                  <span className="font-bold text-xl">$81,300</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-lg font-semibold">Annual Savings</span>
                  <span className="font-bold text-3xl text-yellow-300">Save 89%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-lg text-blue-100">
              Plus: <strong className="text-white">Improved accuracy, faster student enrollment, better student experience, and scalable capacity</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Plan Comparison Table */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Full Feature Comparison</h2>
            <p className="text-xl text-gray-600">Compare all features across our plans</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 border-b-2 border-gray-200">Feature</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-900 border-b-2 border-gray-200">Starter</th>
                  <th className="text-center py-4 px-6 font-semibold text-blue-600 border-b-2 border-blue-200 bg-blue-50">Professional</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-900 border-b-2 border-gray-200">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 font-medium text-gray-900">Monthly Evaluations</td>
                  <td className="py-4 px-6 text-center text-gray-600">Up to 500</td>
                  <td className="py-4 px-6 text-center bg-blue-50/50 font-semibold text-blue-600">Up to 2,500</td>
                  <td className="py-4 px-6 text-center text-gray-600">Unlimited</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 font-medium text-gray-900">AI-Powered Evaluation</td>
                  <td className="py-4 px-6 text-center"><Check className="text-green-600 mx-auto" size={20} /></td>
                  <td className="py-4 px-6 text-center bg-blue-50/50"><Check className="text-green-600 mx-auto" size={20} /></td>
                  <td className="py-4 px-6 text-center"><Check className="text-green-600 mx-auto" size={20} /></td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 font-medium text-gray-900">SIS Integration</td>
                  <td className="py-4 px-6 text-center text-gray-600">Basic</td>
                  <td className="py-4 px-6 text-center bg-blue-50/50 font-semibold text-blue-600">Advanced</td>
                  <td className="py-4 px-6 text-center text-gray-600">Custom</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 font-medium text-gray-900">User Accounts</td>
                  <td className="py-4 px-6 text-center text-gray-600">5</td>
                  <td className="py-4 px-6 text-center bg-blue-50/50 font-semibold text-blue-600">Unlimited</td>
                  <td className="py-4 px-6 text-center text-gray-600">Unlimited</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 font-medium text-gray-900">Support</td>
                  <td className="py-4 px-6 text-center text-gray-600">Email</td>
                  <td className="py-4 px-6 text-center bg-blue-50/50 font-semibold text-blue-600">Priority (4hr)</td>
                  <td className="py-4 px-6 text-center text-gray-600">24/7 Dedicated</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 font-medium text-gray-900">Student Portal</td>
                  <td className="py-4 px-6 text-center text-gray-400">—</td>
                  <td className="py-4 px-6 text-center bg-blue-50/50"><Check className="text-green-600 mx-auto" size={20} /></td>
                  <td className="py-4 px-6 text-center"><Check className="text-green-600 mx-auto" size={20} /></td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 font-medium text-gray-900">Custom Rules Engine</td>
                  <td className="py-4 px-6 text-center text-gray-400">—</td>
                  <td className="py-4 px-6 text-center bg-blue-50/50"><Check className="text-green-600 mx-auto" size={20} /></td>
                  <td className="py-4 px-6 text-center"><Check className="text-green-600 mx-auto" size={20} /></td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 font-medium text-gray-900">Advanced Analytics</td>
                  <td className="py-4 px-6 text-center text-gray-400">—</td>
                  <td className="py-4 px-6 text-center bg-blue-50/50"><Check className="text-green-600 mx-auto" size={20} /></td>
                  <td className="py-4 px-6 text-center"><Check className="text-green-600 mx-auto" size={20} /></td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 font-medium text-gray-900">White Label</td>
                  <td className="py-4 px-6 text-center text-gray-400">—</td>
                  <td className="py-4 px-6 text-center bg-blue-50/50 text-gray-400">—</td>
                  <td className="py-4 px-6 text-center"><Check className="text-green-600 mx-auto" size={20} /></td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 font-medium text-gray-900">Account Manager</td>
                  <td className="py-4 px-6 text-center text-gray-400">—</td>
                  <td className="py-4 px-6 text-center bg-blue-50/50 text-gray-400">—</td>
                  <td className="py-4 px-6 text-center"><Check className="text-green-600 mx-auto" size={20} /></td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 font-medium text-gray-900">SLA Guarantee</td>
                  <td className="py-4 px-6 text-center text-gray-400">—</td>
                  <td className="py-4 px-6 text-center bg-blue-50/50 text-gray-400">—</td>
                  <td className="py-4 px-6 text-center"><Check className="text-green-600 mx-auto" size={20} /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Is there a free trial?</h3>
              <p className="text-gray-600">Yes! We offer a 14-day free trial with full access to all Professional plan features. No credit card required.</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Can I change plans later?</h3>
              <p className="text-gray-600">Absolutely. You can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle.</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-2">What happens if I exceed my evaluation limit?</h3>
              <p className="text-gray-600">You'll be charged $3 per additional evaluation, or you can upgrade to a higher tier for better value.</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Do you offer discounts for annual billing?</h3>
              <p className="text-gray-600">Yes! Save 15% when you pay annually. Contact our sales team for more details.</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Is implementation included?</h3>
              <p className="text-gray-600">Professional and Enterprise plans include full implementation support. Starter plans include basic setup assistance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6">
            Ready to get started?
          </h2>
          <p className="text-xl mb-10 text-blue-100">
            Join leading institutions that have transformed their transfer credit process.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/book-demo"
              className="group bg-white text-blue-600 px-10 py-4 rounded-lg hover:bg-gray-50 transition-all font-bold text-lg shadow-xl hover:shadow-2xl flex items-center gap-2"
            >
              Book a Demo
              <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="/book-demo"
              className="text-white px-10 py-4 rounded-lg hover:bg-white/10 transition-all font-semibold text-lg border-2 border-white"
            >
              Contact Sales
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="text-white font-bold text-lg mb-4">TCEvaluator</h3>
              <p className="text-sm leading-relaxed">
                AI-powered transfer credit evaluation for modern institutions.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="/" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="/pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="/about" className="hover:text-white transition-colors">About</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="/about" className="hover:text-white transition-colors">About</a></li>
                <li><a href="/book-demo" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-800 text-center text-sm">
            <p>&copy; 2025 TCEvaluator. All rights reserved. Patent Pending.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Pricing;
