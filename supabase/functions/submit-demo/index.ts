import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface DemoSubmission {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  institution: string;
  role: string;
  students_per_year: string;
  message: string;
  hubspot_submitted: boolean;
  hubspot_error: string | null;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const submission: DemoSubmission = await req.json();

    const { data, error } = await supabase
      .from("demo_submissions")
      .insert({
        first_name: submission.first_name,
        last_name: submission.last_name,
        email: submission.email,
        phone: submission.phone,
        institution: submission.institution,
        role: submission.role,
        students_per_year: submission.students_per_year,
        message: submission.message,
        hubspot_submitted: submission.hubspot_submitted,
        hubspot_error: submission.hubspot_error,
      })
      .select()
      .single();

    if (error) {
      console.error("Database error:", error);
      throw error;
    }

    // Send confirmation email and WAIT for it to complete
    const emailApiUrl = `${Deno.env.get("SUPABASE_URL")}/functions/v1/send-confirmation-email`;
    try {
      const emailResponse = await fetch(emailApiUrl, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: submission.email,
          name: `${submission.first_name} ${submission.last_name}`,
          institution: submission.institution,
        }),
      });

      if (emailResponse.ok) {
        console.log("Email sent successfully to:", submission.email);
      } else {
        const errorText = await emailResponse.text();
        console.error("Email sending failed:", errorText);
      }
    } catch (err) {
      console.error("Email sending error:", err);
    }

    return new Response(
      JSON.stringify({ success: true, data }),
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
      JSON.stringify({ error: error.message }),
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
