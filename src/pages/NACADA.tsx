import { useState } from 'react';
import { FileText, CheckCircle2, Info } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import emailjs from '@emailjs/browser';
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
  const [paymentChoice, setPaymentChoice] = useState<'now' | 'later' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const isFormValid = () => {
    return formData.institution.trim() !== '' &&
           formData.name.trim() !== '' &&
           formData.title.trim() !== '' &&
           formData.email.trim() !== '' &&
           formData.signature.trim() !== '';
  };

  const handlePayNow = async (planName: string, setupPriceId: string, implementationFee: number) => {
    if (!isFormValid()) {
      alert('Please fill out all required fields before selecting a plan.');
      return;
    }

    setIsSubmitting(true);
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
                  nacada_payment_choice: 'now',
                  nacada_plan_selected: planName,
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
          payment_choice: 'now',
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
              payment_choice: 'Pay Now',
              plan_selected: planName,
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
                payment_choice: 'Pay Now',
                plan_selected: planName,
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

      const checkoutResponse = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify({
          planName: `${planName} - NACADA Special (Setup Fee)`,
          priceId: setupPriceId,
          mode: 'payment',
          customerEmail: formData.email,
          metadata: {
            institution: formData.institution,
            name: formData.name,
            title: formData.title,
            signature: formData.signature,
            offer_type: 'nacada_pay_now',
            plan_selected: planName,
            implementation_fee: implementationFee,
            discount_applied: 2000
          }
        })
      });

      if (!checkoutResponse.ok) {
        const errorData = await checkoutResponse.json();
        console.error('Checkout error response:', errorData);
        throw new Error(errorData.error || 'Failed to create checkout session');
      }

      const { url } = await checkoutResponse.json();
      window.location.href = url;
    } catch (error) {
      console.error('Error creating checkout:', error);
      alert(`Checkout Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setSubmitStatus('error');
      setIsSubmitting(false);
    }
  };

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
                  nacada_payment_choice: paymentChoice || 'later',
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
          payment_choice: paymentChoice,
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
              payment_choice: 'Pay Later',
              plan_selected: 'N/A',
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
                payment_choice: 'Pay Later',
                plan_selected: 'N/A',
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
        title="MACRAO Conference Special Offer - TCEvaluator"
        description="Exclusive MACRAO conference offer for TCEvaluator - Save up to $2,000 on setup fees"
        canonical="/nacada"
      />

      <Navigation />

      <main className="pt-36 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText size={32} className="text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">MACRAO Conference Special Offer</h1>
            <p className="text-xl text-gray-600">
              Non-Binding Letter of Interest
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
                    <span>Submit <strong>on or before November 30, 2025</strong>: Receive a <strong>$2,000 discount</strong> on the setup fee</span>
                  </li>
                  
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Letter of Interest</h2>

            <div className="prose prose-gray max-w-none mb-8">
              <p className="text-gray-700 leading-relaxed mb-4">
                This Non-Binding Letter of Interest ("LOI") outlines the general terms and interest of the parties with respect to a potential subscription to the TCEvaluator software.
              </p>

              <h3 className="text-lg font-bold text-gray-900 mb-3">1. Non-Binding Letter of Interest</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                This Non-Binding Letter of Interest ("LOI") outlines the general terms and interest of the parties with respect to a potential subscription to the TCEvaluator software.
              </p>

              <h3 className="text-lg font-bold text-gray-900 mb-3">2. Proposed Terms</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>
                  If this LOI is executed <strong>on or before November 30, 2025</strong>, Purchaser will receive a <strong>$2,000 discount</strong> on the setup fee.
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
                  Your Letter of Interest has been submitted successfully. You will receive a confirmation email shortly.
                </p>
                <p className="text-sm text-gray-500">
                  Our team will contact you within 24 hours to discuss next steps.
                </p>
              </div>
            ) : !paymentChoice ? (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Choose Your Payment Option:</h3>

                <div className="grid md:grid-cols-2 gap-6">
                  <button
                    onClick={() => setPaymentChoice('now')}
                    className="relative group bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-500 rounded-xl p-8 text-left hover:shadow-xl transition-all duration-300"
                  >
                    <div className="absolute top-4 right-4 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                      BEST VALUE
                    </div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-2">Pay Now</h4>
                    <div className="text-4xl font-bold text-green-600 mb-4">
                      $2,000 OFF
                    </div>
                    <p className="text-gray-700 mb-4">
                      Lock in your maximum discount by paying the setup fee today.
                    </p>
                    <ul className="space-y-2 text-sm text-gray-600 mb-6">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 size={16} className="flex-shrink-0 mt-0.5 text-green-600" />
                        <span>Immediate $2,000 discount</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 size={16} className="flex-shrink-0 mt-0.5 text-green-600" />
                        <span>Priority implementation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 size={16} className="flex-shrink-0 mt-0.5 text-green-600" />
                        <span>Secure payment via Stripe</span>
                      </li>
                    </ul>
                    <div className="text-center font-semibold text-green-700 group-hover:text-green-800">
                      Select Pay Now →
                    </div>
                  </button>

                  <button
                    onClick={() => setPaymentChoice('later')}
                    className="relative group bg-white border-2 border-gray-300 rounded-xl p-8 text-left hover:border-gray-400 hover:shadow-lg transition-all duration-300"
                  >
                    <h4 className="text-2xl font-bold text-gray-900 mb-2">Pay Later</h4>
                    <div className="text-4xl font-bold text-gray-600 mb-4">
                      Flexible
                    </div>
                    <p className="text-gray-700 mb-4">
                      Submit your Letter of Interest and pay the setup fee later.
                    </p>
                    <ul className="space-y-2 text-sm text-gray-600 mb-6">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 size={16} className="flex-shrink-0 mt-0.5 text-gray-400" />
                        <span>$2,000 discount if paid by Nov 30</span>
                      </li>
                     
                      <li className="flex items-start gap-2">
                        <CheckCircle2 size={16} className="flex-shrink-0 mt-0.5 text-gray-400" />
                        <span>Standard processing timeline</span>
                      </li>
                    </ul>
                    <div className="text-center font-semibold text-gray-700 group-hover:text-gray-900">
                      Select Pay Later →
                    </div>
                  </button>
                </div>
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
                   Job Title *
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


                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <p className="text-sm text-gray-600">
                    By submitting this form, you acknowledge that this Letter of Interest is non-binding and serves as an expression of interest only. No legal obligation is created until a formal agreement is executed by both parties.
                  </p>
                </div>

                {paymentChoice === 'now' ? (
                  <div className="space-y-6">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <p className="text-sm text-green-800 font-medium">
                        You've selected to pay now and receive an immediate $2,000 discount on setup fees!
                      </p>
                    </div>

                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-4">Select Your Plan:</h4>
                      {!isFormValid() && (
                        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <p className="text-sm text-yellow-800">
                            Please fill out all required fields above before selecting a plan.
                          </p>
                        </div>
                      )}
                      <div className="grid md:grid-cols-3 gap-4">
                        {/* Starter Plan */}
                        <button
                          type="button"
                          onClick={() => handlePayNow('Starter', import.meta.env.VITE_STRIPE_NACADASTARTER_PRICE_ID, 1000)}
                          disabled={isSubmitting || !isFormValid()}
                          className="group bg-white border-2 border-gray-300 rounded-xl p-6 text-left hover:border-blue-500 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <h5 className="text-xl font-bold text-gray-900 mb-2">Starter</h5>
                          <div className="mb-4">
                            <div className="text-sm text-gray-500 line-through">$3,000 setup</div>
                            <div className="text-3xl font-bold text-green-600">$1,000</div>
                            <div className="text-xs text-gray-600 mt-1">$2,000 discount applied</div>
                          </div>
                          <div className="text-sm text-gray-600 space-y-1 mb-4">
                            <div>• 25 evaluations/month</div>
                            <div>• 3 programs</div>
                            <div>• $500/month</div>
                          </div>
                          <div className="text-center text-sm font-semibold text-blue-600 group-hover:text-blue-700">
                            Select Plan →
                          </div>
                        </button>

                        {/* Tier 1 Plan */}
                        <button
                          type="button"
                          onClick={() => handlePayNow('Tier 1', import.meta.env.VITE_STRIPE_NACADA1_PRICE_ID, 3000)}
                          disabled={isSubmitting || !isFormValid()}
                          className="group bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-500 rounded-xl p-6 text-left hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed relative"
                        >
                          <div className="absolute -top-2 -right-2 bg-yellow-400 text-gray-900 text-xs font-bold px-2 py-1 rounded-full">
                            POPULAR
                          </div>
                          <h5 className="text-xl font-bold text-gray-900 mb-2">Tier 1</h5>
                          <div className="mb-4">
                            <div className="text-sm text-gray-500 line-through">$5,000 setup</div>
                            <div className="text-3xl font-bold text-green-600">$3,000</div>
                            <div className="text-xs text-gray-600 mt-1">$2,000 discount applied</div>
                          </div>
                          <div className="text-sm text-gray-700 space-y-1 mb-4">
                            <div>• 100 evaluations/month</div>
                            <div>• 20 programs</div>
                            <div>• $1,900/month</div>
                          </div>
                          <div className="text-center text-sm font-semibold text-blue-600 group-hover:text-blue-700">
                            Select Plan →
                          </div>
                        </button>

                        {/* Tier 2 Plan */}
                        <button
                          type="button"
                          onClick={() => handlePayNow('Tier 2', import.meta.env.VITE_STRIPE_NACADA2_PRICE_ID, 6000)}
                          disabled={isSubmitting || !isFormValid()}
                          className="group bg-white border-2 border-gray-300 rounded-xl p-6 text-left hover:border-blue-500 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <h5 className="text-xl font-bold text-gray-900 mb-2">Tier 2</h5>
                          <div className="mb-4">
                            <div className="text-sm text-gray-500 line-through">$8,000 setup</div>
                            <div className="text-3xl font-bold text-green-600">$6,000</div>
                            <div className="text-xs text-gray-600 mt-1">$2,000 discount applied</div>
                          </div>
                          <div className="text-sm text-gray-600 space-y-1 mb-4">
                            <div>• 170 evaluations/month</div>
                            <div>• 40 programs</div>
                            <div>• $2,900/month</div>
                          </div>
                          <div className="text-center text-sm font-semibold text-blue-600 group-hover:text-blue-700">
                            Select Plan →
                          </div>
                        </button>
                      </div>
                    </div>

                    <div className="text-center">
                      <button
                        type="button"
                        onClick={() => setPaymentChoice(null)}
                        className="px-6 py-2 text-gray-600 hover:text-gray-900 font-medium transition-colors"
                      >
                        ← Back to payment options
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-sm text-blue-800 font-medium">
                        You've selected to pay later. Submit your LOI now and we'll send you payment instructions.
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setPaymentChoice(null)}
                        className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? 'Submitting...' : 'Submit Letter of Interest'}
                      </button>
                    </div>
                  </div>
                )}
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
