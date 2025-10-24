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

    const resendApiKey = Deno.env.get("RESEND_API_KEY");

    if (!resendApiKey) {
      throw new Error("RESEND_API_KEY not configured");
    }

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #2563eb 0%, #0891b2 100%);
              color: white;
              padding: 30px;
              border-radius: 8px 8px 0 0;
              text-align: center;
            }
            .content {
              background: #ffffff;
              padding: 30px;
              border: 1px solid #e5e7eb;
              border-top: none;
            }
            .footer {
              background: #f9fafb;
              padding: 20px;
              border-radius: 0 0 8px 8px;
              text-align: center;
              font-size: 14px;
              color: #6b7280;
            }
            .button {
              display: inline-block;
              background: #2563eb;
              color: white;
              padding: 12px 24px;
              text-decoration: none;
              border-radius: 6px;
              margin: 20px 0;
            }
            .highlight {
              background: #dbeafe;
              padding: 15px;
              border-radius: 6px;
              margin: 20px 0;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1 style="margin: 0; font-size: 28px;">Thank You for Your Interest!</h1>
          </div>
          <div class="content">
            <p>Hi ${name},</p>
            <p>Thank you for requesting a demo of TC Evaluator for <strong>${institution}</strong>!</p>
            <p>We've received your submission and our team will be in touch within <strong>24 hours</strong> to schedule your personalized demo.</p>

            <div class="highlight">
              <h3 style="margin-top: 0;">What to Expect:</h3>
              <ul>
                <li>A live walkthrough of TC Evaluator's AI-powered evaluation system</li>
                <li>Discussion of your institution's specific needs and workflows</li>
                <li>Q&A session with our product specialists</li>
                <li>Custom pricing and implementation timeline</li>
              </ul>
            </div>

            <p>In the meantime, feel free to explore more about how TC Evaluator can transform your transfer credit process:</p>
            <center>
              <a href="https://tcevaluator.com" class="button">Visit Our Website</a>
            </center>

            <p>If you have any immediate questions, don't hesitate to reach out:</p>
            <p>
              📧 <a href="mailto:sales@tcevaluator.com">sales@tcevaluator.com</a><br>
              📞 <a href="tel:+15551234567">(555) 123-4567</a>
            </p>

            <p>Best regards,<br>
            <strong>The TC Evaluator Team</strong></p>
          </div>
          <div class="footer">
            <p>© 2025 TC Evaluator. All rights reserved.</p>
            <p>Reducing evaluation time from 45 minutes to 5 minutes.</p>
          </div>
        </body>
      </html>
    `;

    const emailText = `
Hi ${name},

Thank you for requesting a demo of TC Evaluator for ${institution}!

We've received your submission and our team will be in touch within 24 hours to schedule your personalized demo.

What to Expect:
- A live walkthrough of TC Evaluator's AI-powered evaluation system
- Discussion of your institution's specific needs and workflows
- Q&A session with our product specialists
- Custom pricing and implementation timeline

If you have any immediate questions, reach out:
Email: sales@tcevaluator.com
Phone: (555) 123-4567

Best regards,
The TC Evaluator Team
    `;

    console.log(`Sending confirmation email to: ${to}`);

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "TC Evaluator <onboarding@resend.dev>",
        to: [to],
        subject: "Thank You for Requesting a Demo - TC Evaluator",
        html: emailHtml,
        text: emailText,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Resend API error:", errorData);
      throw new Error(`Resend API error: ${response.status} - ${errorData}`);
    }

    const data = await response.json();
    console.log(`Email sent successfully to: ${to}`, data);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Email sent successfully",
        data,
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