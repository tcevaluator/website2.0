import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';

export default function Success() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <SEO
        title="Success - TCEvaluator"
        description="Thank you for your submission"
        canonical="/success"
      />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={48} className="text-green-600" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Thank You!</h1>
          <p className="text-xl text-gray-600 mb-8">
            We've received your message and will get back to you within 24 hours.
          </p>
          <p className="text-gray-600 mb-8">
            In the meantime, feel free to explore our website to learn more about how TCEvaluator can transform your transfer credit evaluation process.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
          >
            Back to Home
            <ArrowRight size={18} />
          </Link>
          <Link
            to="/pricing"
            className="inline-flex items-center justify-center gap-2 border-2 border-gray-900 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            View Pricing
          </Link>
        </div>
      </div>
    </div>
  );
}
