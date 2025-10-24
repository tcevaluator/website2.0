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

async function sendEmailViaSMTP(to: string, subject: string, htmlBody: string, textBody: string) {
  const smtpHost = "smtp.office365.com";
  const smtpPort = 587;
  const smtpUser = Deno.env.get("SMTP_USER") || "";
  const smtpPass = Deno.env.get("SMTP_PASS") || "";

  const conn = await Deno.connect({
    hostname: smtpHost,
    port: smtpPort,
  });

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  async function readResponse(): Promise<string> {
    const buffer = new Uint8Array(4096);
    const n = await conn.read(buffer);
    if (n === null) return "";
    return decoder.decode(buffer.subarray(0, n));
  }

  async function sendCommand(command: string): Promise<string> {
    await conn.write(encoder.encode(command + "\r\n"));
    return await readResponse();
  }

  try {
    await readResponse();
    await sendCommand("EHLO tcevaluator.com");
    await sendCommand("STARTTLS");

    const tlsConn = await Deno.startTls(conn, { hostname: smtpHost });

    const tlsEncoder = new TextEncoder();
    const tlsDecoder = new TextDecoder();

    async function tlsReadResponse(): Promise<string> {
      const buffer = new Uint8Array(4096);
      const n = await tlsConn.read(buffer);
      if (n === null) return "";
      return tlsDecoder.decode(buffer.subarray(0, n));
    }

    async function tlsSendCommand(command: string): Promise<string> {
      await tlsConn.write(tlsEncoder.encode(command + "\r\n"));
      return await tlsReadResponse();
    }

    await tlsSendCommand("EHLO tcevaluator.com");
    await tlsSendCommand("AUTH LOGIN");
    await tlsSendCommand(btoa(smtpUser));
    await tlsSendCommand(btoa(smtpPass));
    await tlsSendCommand(`MAIL FROM:<${smtpUser}>`);
    await tlsSendCommand(`RCPT TO:<${to}>`);
    await tlsSendCommand("DATA");

    const emailContent = [
      `From: TC Evaluator <${smtpUser}>`,
      `To: ${to}`,
      `Subject: ${subject}`,
      "MIME-Version: 1.0",
      'Content-Type: multipart/alternative; boundary="boundary123"',
      "",
      "--boundary123",
      "Content-Type: text/plain; charset=utf-8",
      "",
      textBody,
      "",
      "--boundary123",
      "Content-Type: text/html; charset=utf-8",
      "",
      htmlBody,
      "",
      "--boundary123--",
      "",
      ".",
    ].join("\r\n");

    await tlsSendCommand(emailContent);
    await tlsSendCommand("QUIT");

    tlsConn.close();
  } catch (error) {
    conn.close();
    throw error;
  }
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

    const subject = "Thank You for Requesting a Demo - TC Evaluator";

    try {
      await sendEmailViaSMTP(to, subject, emailHtml, emailText);
      console.log(`Email sent successfully to: ${to}`);

      return new Response(
        JSON.stringify({
          success: true,
          message: 'Email sent successfully'
        }),
        {
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
          status: 200,
        }
      );
    } catch (emailError) {
      console.error("Failed to send email:", emailError);

      return new Response(
        JSON.stringify({
          success: false,
          message: 'Failed to send email',
          error: emailError.message
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