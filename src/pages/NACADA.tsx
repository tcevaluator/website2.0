import { useState } from 'react';
import { FileText, CheckCircle2, Info } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { createClient } from '@supabase/supabase-js';
import SEO from '../components/SEO';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function NACADA() {
  const [formData, setFormData] = useState({
    institution: '',
    signature: '',
    name: '',
    title: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      let hubspotSubmitted = false;
      let hubspotError = null;

      const hubspotAccessToken = import.meta.env.VITE_HUBSPOT_ACCESS_TOKEN;
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
                  email: formData.email,
                  firstname: formData.name.split(" ")[0],
                  lastname: formData.name.split(" ").slice(1).join(" ") || formData.name,
                  company: formData.institution,
                  jobtitle: formData.title,
                  hs_lead_status: "NEW",
                  lifecyclestage: "lead",
                  lead_source: "NACADA Conference LOI",
                  nacada_loi_signature: formData.signature,
                },
              }),
            }
          );

          if (hubspotResponse.ok) {
            hubspotSubmitted = true;
          } else {
            const errorText = await hubspotResponse.text();
            hubspotError = `HubSpot API error: ${errorText}`;
            console.error(hubspotError);
          }
        } catch (error) {
          hubspotError = error instanceof Error ? error.message : 'HubSpot submission failed';
          console.error('HubSpot submission error:', error);
        }
      }

      const { error: dbError } = await supabase
        .from('nacada_submissions')
        .insert({
          institution: formData.institution,
          signature: formData.signature,
          name: formData.name,
          title: formData.title,
          email: formData.email,
          hubspot_submitted: hubspotSubmitted,
          hubspot_error: hubspotError,
        });

      if (dbError) {
        throw new Error('Failed to save submission');
      }

      const emailjsServiceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const emailjsNacadaTemplateId = import.meta.env.VITE_EMAILJS_NACADA_TEMPLATE_ID;
      const emailjsNacadaAdminTemplateId = import.meta.env.VITE_EMAILJS_NACADA_ADMIN_TEMPLATE_ID;
      const emailjsPublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
      const adminEmail = import.meta.env.VITE_ADMIN_EMAIL || 'info@tcevaluator.com';

      if (emailjsServiceId && emailjsNacadaTemplateId && emailjsPublicKey) {
        try {
          await emailjs.send(
            emailjsServiceId,
            emailjsNacadaTemplateId,
            {
              to_email: formData.email,
              to_name: formData.name,
              institution: formData.institution,
              title: formData.title,
              signature: formData.signature,
              from_email: 'info@tcevaluator.com',
              reply_to: 'info@tcevaluator.com',
            },
            emailjsPublicKey
          );
          console.log('Confirmation email sent successfully');
        } catch (emailError) {
          console.error('Failed to send confirmation email:', emailError);
        }

        if (emailjsNacadaAdminTemplateId && adminEmail) {
          try {
            await emailjs.send(
              emailjsServiceId,
              emailjsNacadaAdminTemplateId,
              {
                to_email: adminEmail,
                name: formData.name,
                user_email: formData.email,
                institution: formData.institution,
                title: formData.title,
                signature: formData.signature,
                from_email: 'info@tcevaluator.com',
                reply_to: formData.email,
              },
              emailjsPublicKey
            );
            console.log('Admin notification sent successfully');
          } catch (emailError) {
            console.error('Failed to send admin notification:', emailError);
          }
        }
      }

      setSubmitStatus('success');
      setFormData({
        institution: '',
        signature: '',
        name: '',
        title: '',
        email: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="NACADA Conference Special Offer - TCEvaluator"
        description="Exclusive NACADA conference offer for TCEvaluator - Save up to $2,000 on setup fees"
        canonical="/nacada"
      />

      <Navigation />

      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText size={32} className="text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">NACADA Conference Special Offer</h1>
            <p className="text-xl text-gray-600">
              Non-Binding Letter of Intent
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">
            <div className="flex items-start gap-3">
              <Info size={24} className="text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">Special Conference Pricing</h3>
                <ul className="space-y-2 text-blue-800">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={20} className="flex-shrink-0 mt-0.5" />
                    <span>Execute <strong>on or before November 1, 2025</strong>: Receive a <strong>$2,000 discount</strong> on the setup fee</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={20} className="flex-shrink-0 mt-0.5" />
                    <span>Execute <strong>after November 1 but on or before November 30, 2025</strong>: Receive a <strong>$1,000 discount</strong> on the setup fee</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Letter of Intent</h2>

            <div className="prose prose-gray max-w-none mb-8">
              <p className="text-gray-700 leading-relaxed mb-4">
                This Non-Binding Letter of Intent ("LOI") outlines the general terms and intent of the parties with respect to a potential subscription to the TCEvaluator software.
              </p>

              <h3 className="text-lg font-bold text-gray-900 mb-3">1. Non-Binding Letter of Intent</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                This Non-Binding Letter of Intent ("LOI") outlines the general terms and intent of the parties with respect to a potential subscription to the TCEvaluator software.
              </p>

              <h3 className="text-lg font-bold text-gray-900 mb-3">2. Proposed Terms</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>
                  If this LOI is executed <strong>on or before November 1, 2025</strong>, Purchaser will receive a <strong>$2,000 discount</strong> on the setup fee.
                </li>
                <li>
                  If this LOI is executed <strong>after November 1 but on or before November 30, 2025</strong>, Purchaser will receive a <strong>$1,000 discount</strong> on the setup fee.
                </li>
              </ul>

              <h3 className="text-lg font-bold text-gray-900 mb-3">3. Non-Binding Nature</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                This LOI is <strong>non-binding</strong> and is intended solely as an expression of mutual interest. Neither party shall be legally obligated to proceed with any transaction.
              </p>

              <h3 className="text-lg font-bold text-gray-900 mb-3">4. Expiration</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                This LOI shall automatically expire on <strong>November 30, 2025</strong>, unless 1) executed by both parties and 2) the set-up fee paid.
              </p>
            </div>

            {submitStatus === 'success' ? (
              <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={32} className="text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
                <p className="text-gray-600 mb-4">
                  Your Letter of Intent has been submitted successfully. You will receive a confirmation email shortly.
                </p>
                <p className="text-sm text-gray-500">
                  Our team will contact you within 24 hours to discuss next steps.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Acknowledged and Agreed (Non-Binding):</h3>

                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
                    Something went wrong. Please try again or contact us directly.
                  </div>
                )}

                <div>
                  <label htmlFor="institution" className="block text-sm font-medium text-gray-700 mb-2">
                    Institution *
                  </label>
                  <input
                    type="text"
                    id="institution"
                    name="institution"
                    required
                    value={formData.institution}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Enter your institution name"
                  />
                </div>

                <div>
                  <label htmlFor="signature" className="block text-sm font-medium text-gray-700 mb-2">
                    Signature *
                  </label>
                  <input
                    type="text"
                    id="signature"
                    name="signature"
                    required
                    value={formData.signature}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Type your full name as signature"
                  />
                </div>

                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Enter your job title"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="your.email@institution.edu"
                  />
                </div>

                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <p className="text-sm text-gray-600">
                    By submitting this form, you acknowledge that this Letter of Intent is non-binding and serves as an expression of interest only. No legal obligation is created until a formal agreement is executed by both parties.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gray-900 text-white px-6 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Letter of Intent'}
                </button>
              </form>
            )}
          </div>

          <div className="text-center text-sm text-gray-500">
            <p>
              Questions? Contact us at{' '}
              <a href="mailto:info@tcevaluator.com" className="text-blue-600 hover:underline">
                info@tcevaluator.com
              </a>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
