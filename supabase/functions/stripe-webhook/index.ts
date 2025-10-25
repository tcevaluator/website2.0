import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey, stripe-signature",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
    const stripeWebhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const emailjsServiceId = Deno.env.get("EMAILJS_SERVICE_ID");
    const emailjsPublicKey = Deno.env.get("EMAILJS_PUBLIC_KEY");
    const emailjsAdminTemplateId = Deno.env.get("EMAILJS_ADMIN_TEMPLATE_ID");

    if (!stripeSecretKey || !stripeWebhookSecret) {
      throw new Error("Stripe configuration missing");
    }

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("Supabase configuration missing");
    }

    const signature = req.headers.get("stripe-signature");
    if (!signature) {
      throw new Error("No stripe signature found");
    }

    const body = await req.text();

    // Verify webhook signature
    const encoder = new TextEncoder();
    const signedPayload = `${req.headers.get("stripe-signature-timestamp")}.${body}`;
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(stripeWebhookSecret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );
    const signatureBuffer = await crypto.subtle.sign(
      "HMAC",
      key,
      encoder.encode(signedPayload)
    );
    const computedSignature = Array.from(new Uint8Array(signatureBuffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    const event = JSON.parse(body);

    // Initialize Supabase client
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Handle different event types
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      // Store purchase in database
      const { error: dbError } = await supabase.from("purchases").insert({
        stripe_session_id: session.id,
        stripe_customer_id: session.customer,
        customer_email: session.customer_details?.email || session.customer_email,
        plan_name: session.metadata?.plan_name || "Unknown",
        price_id: session.line_items?.data?.[0]?.price?.id || "",
        amount: session.amount_total || 0,
        currency: session.currency || "usd",
        status: "succeeded",
        payment_status: session.payment_status,
      });

      if (dbError) {
        console.error("Database error:", dbError);
      }

      // Send admin notification email
      if (emailjsServiceId && emailjsPublicKey && emailjsAdminTemplateId) {
        try {
          await fetch("https://api.emailjs.com/api/v1.0/email/send", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              service_id: emailjsServiceId,
              template_id: emailjsAdminTemplateId,
              user_id: emailjsPublicKey,
              template_params: {
                to_email: "info@tcevaluator.com",
                subject: `New Purchase: ${session.metadata?.plan_name || "Unknown"} Plan`,
                message: `New subscription purchase:\n\nPlan: ${session.metadata?.plan_name || "Unknown"}\nCustomer Email: ${session.customer_details?.email || session.customer_email}\nAmount: $${(session.amount_total / 100).toFixed(2)} ${session.currency?.toUpperCase()}\nSession ID: ${session.id}\nPayment Status: ${session.payment_status}`,
                from_name: "TCEvaluator System",
                reply_to: session.customer_details?.email || session.customer_email,
              },
            }),
          });
        } catch (emailError) {
          console.error("Email notification error:", emailError);
        }
      }
    } else if (event.type === "checkout.session.expired" || event.type === "payment_intent.payment_failed") {
      const session = event.data.object;

      // Store failed purchase in database
      const { error: dbError } = await supabase.from("purchases").insert({
        stripe_session_id: session.id,
        stripe_customer_id: session.customer,
        customer_email: session.customer_details?.email || session.customer_email || "unknown@email.com",
        plan_name: session.metadata?.plan_name || "Unknown",
        price_id: session.line_items?.data?.[0]?.price?.id || "",
        amount: session.amount_total || 0,
        currency: session.currency || "usd",
        status: "failed",
        payment_status: session.payment_status || event.type,
      });

      if (dbError) {
        console.error("Database error:", dbError);
      }

      // Send admin notification email about failed payment
      if (emailjsServiceId && emailjsPublicKey && emailjsAdminTemplateId) {
        try {
          await fetch("https://api.emailjs.com/api/v1.0/email/send", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              service_id: emailjsServiceId,
              template_id: emailjsAdminTemplateId,
              user_id: emailjsPublicKey,
              template_params: {
                to_email: "info@tcevaluator.com",
                subject: `Failed Purchase: ${session.metadata?.plan_name || "Unknown"} Plan`,
                message: `Failed subscription purchase:\n\nPlan: ${session.metadata?.plan_name || "Unknown"}\nCustomer Email: ${session.customer_details?.email || session.customer_email || "Unknown"}\nAmount: $${(session.amount_total / 100).toFixed(2)} ${session.currency?.toUpperCase()}\nSession ID: ${session.id}\nReason: ${event.type}`,
                from_name: "TCEvaluator System",
                reply_to: "noreply@tcevaluator.com",
              },
            }),
          });
        } catch (emailError) {
          console.error("Email notification error:", emailError);
        }
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Webhook error:", error);

    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Unknown error occurred",
      }),
      {
        status: 400,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
