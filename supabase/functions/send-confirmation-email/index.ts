import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface EmailRequest {
  to: string;
  name: string;
  institution: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { to, name, institution }: EmailRequest = await req.json();

    console.log(`Processing email request for: ${to}`);

    const serviceId = Deno.env.get("EMAILJS_SERVICE_ID");
    const templateId = Deno.env.get("EMAILJS_TEMPLATE_ID");
    const publicKey = Deno.env.get("EMAILJS_PUBLIC_KEY");
    const privateKey = Deno.env.get("EMAILJS_PRIVATE_KEY");

    if (!serviceId || !templateId || !publicKey || !privateKey) {
      const missingVars = [];
      if (!serviceId) missingVars.push("EMAILJS_SERVICE_ID");
      if (!templateId) missingVars.push("EMAILJS_TEMPLATE_ID");
      if (!publicKey) missingVars.push("EMAILJS_PUBLIC_KEY");
      if (!privateKey) missingVars.push("EMAILJS_PRIVATE_KEY");

      console.error(`Missing EmailJS credentials: ${missingVars.join(", ")}`);
      throw new Error(`EmailJS credentials not configured: ${missingVars.join(", ")}`);
    }

    console.log(`Sending confirmation email to: ${to}`);

    const emailPayload = {
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      accessToken: privateKey,
      template_params: {
        to_email: to,
        to_name: name,
        institution: institution,
        reply_to: "sales@tcevaluator.com",
      },
    };

    console.log("Email payload prepared, sending to EmailJS API...");

    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailPayload),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("EmailJS API error response:", {
        status: response.status,
        statusText: response.statusText,
        body: errorData
      });
      throw new Error(`EmailJS API error: ${response.status} - ${errorData}`);
    }

    const responseText = await response.text();
    console.log(`Email sent successfully to: ${to}. Response:`, responseText);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Email sent successfully",
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
        status: 500,
      }
    );
  }
});
