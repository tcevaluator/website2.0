import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';

function Success() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    if (sessionId) {
      fetch(`/api/checkout-session?session_id=${sessionId}`)
        .then((res) => res.json())
        .then((data) => {
          setSession(data);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center px-4">
      <SEO
        title="Subscription Successful | TCEvaluator"
        description="Thank you for subscribing to TCEvaluator. Your account is being set up and you'll receive further instructions via email."
        canonical="https://tcevaluator.com/success"
      />
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-12 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="text-green-600" size={40} />
        </div>

        {loading ? (
          <>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Processing...</h1>
            <p className="text-xl text-gray-600">
              Please wait while we confirm your subscription.
            </p>
          </>
        ) : (
          <>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to TC Evaluator!</h1>
            <p className="text-xl text-gray-600 mb-8">
              Your subscription has been successfully activated. We're excited to help you transform your transfer credit evaluation process.
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
              <h3 className="font-semibold text-gray-900 mb-3">What happens next?</h3>
              <ul className="text-left space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-1" size={18} />
                  <span>Check your email for account setup instructions</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-1" size={18} />
                  <span>Our team will reach out within 24 hours to schedule onboarding</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-1" size={18} />
                  <span>You'll receive login credentials and access to your dashboard</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-1" size={18} />
                  <span>Start evaluating transcripts with AI-powered precision</span>
                </li>
              </ul>
            </div>

            {session?.customer_email && (
              <div className="bg-gray-50 rounded-lg p-4 mb-8">
                <p className="text-sm text-gray-600">
                  Confirmation email sent to: <strong className="text-gray-900">{session.customer_email}</strong>
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/"
                className="group inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-all font-semibold"
              >
                Return to Home
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="mailto:support@tcevaluator.com"
                className="text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition-all font-semibold border-2 border-gray-200"
              >
                Contact Support
              </a>
            </div>

            {sessionId && (
              <p className="text-xs text-gray-400 mt-8">
                Order ID: {sessionId}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Success;