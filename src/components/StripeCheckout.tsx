import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface StripeCheckoutProps {
  planName: string;
  priceId?: string;
  buttonText?: string;
  buttonClass?: string;
}

function StripeCheckout({ planName, priceId, buttonText = 'Get Started', buttonClass }: StripeCheckoutProps) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);

    try {
      const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

      if (!stripePublishableKey || !priceId) {
        alert(
          `To enable payments, please configure Stripe:\n\n` +
          `1. Add your Stripe keys to the .env file:\n` +
          `   VITE_STRIPE_PUBLISHABLE_KEY=pk_...\n` +
          `   VITE_STRIPE_SECRET_KEY=sk_...\n\n` +
          `2. Create products and prices in your Stripe Dashboard\n\n` +
          `3. Update the priceId in the pricing page\n\n` +
          `For now, redirecting to contact page...`
        );
        window.location.href = '/contact';
        return;
      }

      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      const response = await fetch(`${supabaseUrl}/functions/v1/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseAnonKey}`,
        },
        body: JSON.stringify({
          priceId,
          planName,
        }),
      });

      const { sessionId, url } = await response.json();

      if (url) {
        window.location.href = url;
      } else if (sessionId) {
        const stripe = (window as any).Stripe?.(stripePublishableKey);
        if (stripe) {
          await stripe.redirectToCheckout({ sessionId });
        }
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('There was an error processing your request. Please try again or contact support.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className={buttonClass || 'w-full bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed'}
    >
      {loading ? 'Processing...' : buttonText}
    </button>
  );
}

export default StripeCheckout;