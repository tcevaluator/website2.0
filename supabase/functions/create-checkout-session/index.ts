import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface CheckoutRequest {
  priceId: string;
  planName: string;
  mode?: 'subscription' | 'payment';
  customerEmail?: string;
  metadata?: Record<string, string | number>;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");

    if (!stripeSecretKey) {
      return new Response(
        JSON.stringify({
          error: "Stripe is not configured. Please add STRIPE_SECRET_KEY to your environment variables.",
        }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const { priceId, planName, mode = 'subscription', customerEmail, metadata }: CheckoutRequest = await req.json();

    const params: Record<string, string> = {
      "success_url": `${req.headers.get("origin") || "http://localhost:5173"}/success?session_id={CHECKOUT_SESSION_ID}`,
      "cancel_url": `${req.headers.get("origin") || "http://localhost:5173"}/pricing`,
      "mode": mode,
      "line_items[0][price]": priceId,
      "line_items[0][quantity]": "1",
      "metadata[plan_name]": planName,
      "allow_promotion_codes": "true",
    };

    if (customerEmail) {
      params["customer_email"] = customerEmail;
    }

    if (metadata) {
      Object.entries(metadata).forEach(([key, value]) => {
        params[`metadata[${key}]`] = String(value);
      });
    }

    const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${stripeSecretKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(params),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Stripe API error: ${error}`);
    }

    const session = await response.json();

    return new Response(
      JSON.stringify({
        sessionId: session.id,
        url: session.url,
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error creating checkout session:", error);

    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Unknown error occurred",
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});