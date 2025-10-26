import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface NACADASubmission {
  institution: string;
  signature: string;
  name: string;
  title: string;
  email: string;
  payment_choice?: 'now' | 'later';
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

    const submission: NACADASubmission = await req.json();

    let hubspotSubmitted = false;
    let hubspotError = null;

    const hubspotAccessToken = Deno.env.get("HUBSPOT_ACCESS_TOKEN");
    if (hubspotAccessToken) {
      try {
        const hubspotResponse = await fetch(
          "https://api.hubapi.com/crm/v3/objects/contacts",
          {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${hubspotAccessToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              properties: {
                email: submission.email,
                firstname: submission.name.split(" ")[0],
                lastname: submission.name.split(" ").slice(1).join(" ") || submission.name,
                company: submission.institution,
                jobtitle: submission.title,
                hs_lead_status: "NEW",
                lifecyclestage: "lead",
                lead_source: "NACADA Conference LOI",
                nacada_loi_signature: submission.signature,
                nacada_payment_choice: submission.payment_choice || 'later',
              },
            }),
          }
        );

        if (hubspotResponse.ok) {
          hubspotSubmitted = true;
          console.log("HubSpot contact created successfully");
        } else {
          const errorText = await hubspotResponse.text();
          hubspotError = `HubSpot API error: ${errorText}`;
          console.error(hubspotError);
        }
      } catch (error) {
        hubspotError = `HubSpot submission failed: ${error.message}`;
        console.error(hubspotError);
      }
    }

    const { data, error } = await supabase
      .from("nacada_submissions")
      .insert({
        institution: submission.institution,
        signature: submission.signature,
        name: submission.name,
        title: submission.title,
        email: submission.email,
        payment_choice: submission.payment_choice || 'later',
        hubspot_submitted: hubspotSubmitted,
        hubspot_error: hubspotError,
      })
      .select()
      .single();

    if (error) {
      console.error("Database error:", error);
      throw error;
    }

    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (resendApiKey) {
      const adminEmail = Deno.env.get("ADMIN_EMAIL") || "info@tcevaluator.com";

      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "TCEvaluator <noreply@tcevaluator.com>",
          to: [adminEmail],
          subject: "New NACADA LOI Submission",
          html: `
            <h2>New NACADA Letter of Intent Submission</h2>
            <p><strong>Institution:</strong> ${submission.institution}</p>
            <p><strong>Name:</strong> ${submission.name}</p>
            <p><strong>Title:</strong> ${submission.title}</p>
            <p><strong>Email:</strong> ${submission.email}</p>
            <p><strong>Signature:</strong> ${submission.signature}</p>
            <p><strong>Payment Choice:</strong> ${submission.payment_choice === 'now' ? 'Pay Now (Immediate $2,000 discount)' : 'Pay Later'}</p>
            <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
            ${hubspotSubmitted ? '<p style="color: green;">✓ Successfully added to HubSpot</p>' : '<p style="color: orange;">⚠ Not added to HubSpot</p>'}
          `,
        }),
      }).then(async (emailResponse) => {
        if (emailResponse.ok) {
          console.log("Admin notification sent successfully");
        } else {
          console.error("Admin notification failed:", await emailResponse.text());
        }
      }).catch((err) => {
        console.error("Admin notification error:", err);
      });

      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "TCEvaluator <noreply@tcevaluator.com>",
          to: [submission.email],
          subject: "NACADA Conference Offer - Letter of Intent Received",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #1f2937;">Thank You for Your Interest!</h2>

              <p>Dear ${submission.name},</p>

              <p>Thank you for submitting your Letter of Intent for the NACADA Conference special offer. We have received your submission and will be in touch shortly.</p>

              <h3 style="color: #2563eb;">Your Submission Details:</h3>
              <ul style="list-style: none; padding: 0;">
                <li style="padding: 8px 0;"><strong>Institution:</strong> ${submission.institution}</li>
                <li style="padding: 8px 0;"><strong>Name:</strong> ${submission.name}</li>
                <li style="padding: 8px 0;"><strong>Title:</strong> ${submission.title}</li>
                <li style="padding: 8px 0;"><strong>Email:</strong> ${submission.email}</li>
              </ul>

              <div style="background: #eff6ff; border-left: 4px solid #2563eb; padding: 16px; margin: 24px 0;">
                <h4 style="margin: 0 0 8px 0; color: #1e40af;">Special Offer Reminder:</h4>
                <ul style="margin: 0; padding-left: 20px;">
                  <li>Execute on or before November 1, 2025: <strong>$2,000 discount</strong></li>
                  <li>Execute after November 1 but on or before November 30, 2025: <strong>$1,000 discount</strong></li>
                </ul>
              </div>

              <p>Our team will contact you within 24 hours to discuss the next steps and answer any questions you may have.</p>

              <p>If you have any immediate questions, please don't hesitate to reach out to us at <a href="mailto:info@tcevaluator.com">info@tcevaluator.com</a>.</p>

              <p style="margin-top: 32px;">Best regards,<br>The TCEvaluator Team</p>

              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 32px 0;">

              <p style="font-size: 12px; color: #6b7280;">
                This is an automated confirmation email. Please do not reply directly to this message.
              </p>
            </div>
          `,
        }),
      }).then(async (emailResponse) => {
        if (emailResponse.ok) {
          console.log("Confirmation email sent successfully to:", submission.email);
        } else {
          console.error("Confirmation email failed:", await emailResponse.text());
        }
      }).catch((err) => {
        console.error("Confirmation email error:", err);
      });
    }

    return new Response(
      JSON.stringify({
        success: true,
        data,
        hubspot_submitted: hubspotSubmitted
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