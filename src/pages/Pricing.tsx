import { Link } from 'react-router-dom';
import { Check, ArrowRight, Zap, Building2, Sparkles, Users } from 'lucide-react';
import StripeCheckout from '../components/StripeCheckout';
import SEO from '../components/SEO';
import Navigation from '../components/Navigation';

function Pricing() {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Pricing Plans | TCEvaluator"
        description="Choose the perfect TCEvaluator plan for your institution. Flexible pricing for colleges and universities of all sizes. Start automating transfer credit evaluations today."
        canonical="https://tcevaluator.com/pricing"
      />
      <Navigation activeLink="pricing" />

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
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {/* Starter Plan */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all flex flex-col">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Starter</h3>
                <p className="text-sm text-gray-600">Perfect for small institutions getting started</p>
              </div>
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-gray-900">$500</span>
                  <span className="text-sm text-gray-600">/mo</span>
                </div>

                <div className="mt-2 pt-2 border-t border-gray-200">
                  <p className="text-xs text-gray-600">+ $3,000 implementation</p>
                  <p className="text-xs text-gray-500 mt-1">$20/evaluation</p>
                </div>
              </div>
              <ul className="space-y-3 mb-6 flex-grow">
                <li className="flex items-start gap-2">
                  <Check className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
                  <span className="text-sm text-gray-700">25 evaluations/month</span>
                </li>
                 <li className="flex items-start gap-2">
                  <Check className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
                  <span className="text-sm text-gray-700">3 programs supported</span>
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
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 border-2 border-blue-600 rounded-2xl p-6 relative hover:shadow-2xl transition-all flex flex-col">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap">
                MOST POPULAR
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-2">Tier 1</h3>
                <p className="text-sm text-blue-100">For growing institutions with high volume</p>
              </div>
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-white">$1,900</span>
                  <span className="text-sm text-blue-100">/mo</span>
                </div>
                <div className="mt-2 pt-2 border-t border-blue-400/30">
                  <p className="text-xs text-blue-100">+ $5,000 implementation</p>
                  <p className="text-xs text-blue-200 mt-1">$19/evaluation</p>
                </div>
              </div>
              <ul className="space-y-3 mb-6 flex-grow">
                <li className="flex items-start gap-2">
                  <Check className="text-yellow-400 flex-shrink-0 mt-0.5" size={16} />
                  <span className="text-sm text-white">100 evaluations/month</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="text-yellow-400 flex-shrink-0 mt-0.5" size={16} />
                  <span className="text-sm text-white">20 programs supported</span>
                </li>
              </ul>
              <StripeCheckout
                planName="Professional"
                priceId={import.meta.env.VITE_STRIPE_PROFESSIONAL_PRICE_ID}
                buttonText="Get Started"
                buttonClass="group flex items-center justify-center gap-2 w-full text-center bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-50 transition-all font-bold shadow-xl"
              />
            </div>
            

            {/* Tier 2 Plan */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all flex flex-col">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Tier 2</h3>
                <p className="text-sm text-gray-600">For institution with more volume or programs</p>
              </div>
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-gray-900">$2,900</span>
                  <span className="text-sm text-gray-600">/mo</span>
                </div>
                <div className="mt-2 pt-2 border-t border-gray-200">
                  <p className="text-xs text-gray-600">+ $8,000 implementation</p>
                  <p className="text-xs text-gray-500 mt-1">$17/evaluation</p>
                </div>
              </div>
              <ul className="space-y-3 mb-6 flex-grow">
                <li className="flex items-start gap-2">
                  <Check className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
                  <span className="text-sm text-gray-700">170 evaluations/month</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
                  <span className="text-sm text-gray-700">40 programs supported</span>
                </li>
              </ul>
               <StripeCheckout
                planName="Tier 2"
                priceId={import.meta.env.VITE_STRIPE_TIER2_PRICE_ID}
                buttonText="Get Started"
                buttonClass="block w-full text-center bg-gray-100 text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-200 transition-all font-semibold"
              />
            </div>

            {/* Tier 3 Plan */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all flex flex-col">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Custom</h3>
                <p className="text-sm text-gray-600">For institutions needing more evaluations or programs</p>
              </div>
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-gray-900">-</span>
                  <span className="text-sm text-gray-600">/mo</span>
                </div>
                <div className="mt-2 pt-2 border-t border-gray-200">
                  <p className="text-xs text-gray-600">-</p>
                  <p className="text-xs text-gray-500 mt-1">-</p>
                </div>
              </div>
              <ul className="space-y-3 mb-6 flex-grow">
                <li className="flex items-start gap-2">
                  <Check className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
                  <span className="text-sm text-gray-700">Unlimited evaluations</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="text-green-600 flex-shrink-0 mt-0.5" size={16} />
                  <span className="text-sm text-gray-700">Unlimited programs</span>
                </li>
              </ul>
              <a
                href="/contact"
                className="block w-full text-center bg-gray-100 text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-200 transition-all font-semibold"
              >
                Contact Sales
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">

            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Can I change plans later?</h3>
              <p className="text-gray-600">Absolutely. You can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Do you offer discounts for annual billing?</h3>
              <p className="text-gray-600">Yes! Contact our sales team for more details.</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Is implementation included?</h3>
              <p className="text-gray-600">Yes! Implementation is included with all plans. In most cases the system can be implemented in a matter of days.</p>
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
              href="/contact"
              className="group bg-white text-blue-600 px-10 py-4 rounded-lg hover:bg-gray-50 transition-all font-bold text-lg shadow-xl hover:shadow-2xl flex items-center gap-2"
            >
              Contact Us
              <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
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

export default Pricing;
