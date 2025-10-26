import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, CheckCircle2, Mail, Phone, Building2, User, MessageSquare } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import emailjs from '@emailjs/browser';
import SEO from '../components/SEO';
import Navigation from '../components/Navigation';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

function ContactUs() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    institution: '',
    role: '',
    studentsPerYear: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const cleanPhone = formData.phone.replace(/\D/g, '');

      let hubspotSubmitted = false;
      let hubspotError = null;

      const hubspotPortalId = import.meta.env.VITE_HUBSPOT_PORTAL_ID;
      const hubspotFormId = import.meta.env.VITE_HUBSPOT_FORM_ID;

      if (hubspotPortalId && hubspotFormId &&
          hubspotPortalId !== 'your_portal_id_here' &&
          hubspotFormId !== 'your_form_id_here') {
        try {
          const response = await fetch(
            `https://api.hsforms.com/submissions/v3/integration/submit/${hubspotPortalId}/${hubspotFormId}`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                fields: [
                  { name: 'firstname', value: formData.firstName },
                  { name: 'lastname', value: formData.lastName },
                  { name: 'email', value: formData.email },
                  { name: 'phone', value: cleanPhone },
                  { name: 'company', value: formData.institution },
                  { name: 'jobtitle', value: formData.role },
                  { name: 'students_per_year', value: formData.students_per_year },
                  { name: 'message', value: formData.message },
                ],
                context: {
                  pageUri: window.location.href,
                  pageName: 'Contact Us',
                },
              }),
            }
          );

          if (response.ok) {
            hubspotSubmitted = true;
          } else {
            hubspotError = `HubSpot API error: ${response.status}`;
          }
        } catch (err) {
          hubspotError = err instanceof Error ? err.message : 'HubSpot submission failed';
          console.error('HubSpot submission error:', err);
        }
      }

      const { error: dbError } = await supabase
        .from('demo_submissions')
        .insert({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: cleanPhone,
          institution: formData.institution,
          role: formData.role,
          students_per_year: formData.students_per_year,
          message: formData.message,
          hubspot_submitted: hubspotSubmitted,
          hubspot_error: hubspotError,
        });

      if (dbError) {
        throw new Error('Failed to save submission');
      }

      const emailjsServiceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const emailjsTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const emailjsAdminTemplateId = import.meta.env.VITE_EMAILJS_ADMIN_TEMPLATE_ID;
      const emailjsPublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
      const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;

      if (emailjsServiceId && emailjsTemplateId && emailjsPublicKey) {
        try {
          await emailjs.send(
            emailjsServiceId,
            emailjsTemplateId,
            {
              to_email: formData.email,
              to_name: `${formData.firstName} ${formData.lastName}`,
              institution: formData.institution,
              reply_to: 'sales@tcevaluator.com',
            },
            emailjsPublicKey
          );
          console.log('Confirmation email sent successfully');
        } catch (emailError) {
          console.error('Failed to send confirmation email:', emailError);
        }

        if (emailjsAdminTemplateId && adminEmail) {
          try {
            await emailjs.send(
              emailjsServiceId,
              emailjsAdminTemplateId,
              {
                to_email: adminEmail,
                first_name: formData.firstName,
                last_name: formData.lastName,
                user_email: formData.email,
                phone: formData.phone,
                institution: formData.institution,
                role: formData.role,
                students_per_year: formData.students_per_year,
                message: formData.message,
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

      setSubmitted(true);
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('There was an error submitting the form. Please try again or contact us directly.');
    } finally {
      setLoading(false);
    }
  };

  const formatPhoneNumber = (value: string) => {
    const phoneNumber = value.replace(/\D/g, '');

    if (phoneNumber.length === 0) return '';
    if (phoneNumber.length <= 3) return `(${phoneNumber}`;
    if (phoneNumber.length <= 6) return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'phone') {
      const formatted = formatPhoneNumber(value);
      setFormData({
        ...formData,
        [name]: formatted
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4">
        <SEO
          title="Contact Request Submitted | TCEvaluator"
          description="Thank you for contacting TCEvaluator. Our team will get back to you soon."
          canonical="https://tcevaluator.com/contact"
        />
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-12 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="text-green-600" size={40} />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Thank You!</h1>
          <p className="text-xl text-gray-600 mb-8">
            We've received your message. Our team will get back to you within 24 hours.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
            <h3 className="font-semibold text-gray-900 mb-2">What happens next?</h3>
            <ul className="text-left space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-1" size={18} />
                <span>Our team reviews your information</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-1" size={18} />
                <span>We'll contact you to schedule a convenient time</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-1" size={18} />
                <span>Experience a live demo tailored to your needs</span>
              </li>
            </ul>
          </div>
          <Link
            to="/"
            className="inline-block bg-gray-900 text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-all font-semibold"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Contact Us | TCEvaluator"
        description="Get in touch with TCEvaluator to learn how AI can transform your transfer credit evaluation process. Contact us today."
        canonical="https://tcevaluator.com/contact"
      />
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 border border-blue-200 rounded-full mb-6">
            <Calendar size={16} className="text-blue-600" />
            <span className="text-sm font-semibold text-blue-900">Get in Touch</span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Get in{' '}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Touch With Us
            </span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Have questions? Want to see TCEvaluator in action? Contact our team to learn how we can transform your transfer credit process.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Form */}
            <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 lg:p-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Request a Demo</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">
                      First Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
                        placeholder="John"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Work Email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
                      placeholder="john.doe@university.edu"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      maxLength={14}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="institution" className="block text-sm font-semibold text-gray-700 mb-2">
                    Institution Name *
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      id="institution"
                      name="institution"
                      required
                      value={formData.institution}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
                      placeholder="University Name"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="role" className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Role *
                  </label>
                  <select
                    id="role"
                    name="role"
                    required
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
                  >
                    <option value="">Select your role</option>
                    <option value="registrar">Registrar</option>
                    <option value="admissions">Admissions Director</option>
                    <option value="it">IT Administrator</option>
                    <option value="dean">Dean/Department Head</option>
                    <option value="evaluator">Credit Evaluator</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="students_per_year" className="block text-sm font-semibold text-gray-700 mb-2">
                    Transfer Students Per Year *
                  </label>
                  <select
                    id="students_per_year"
                    name="students_per_year"
                    required
                    value={formData.students_per_year}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
                  >
                    <option value="">Select range</option>
                    <option value="0-100">0-100</option>
                    <option value="101-500">101-500</option>
                    <option value="501-1000">501-1,000</option>
                    <option value="1001-2500">1,001-2,500</option>
                    <option value="2500+">2,500+</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Tell us about your needs
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 text-gray-400" size={18} />
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition resize-none"
                      placeholder="Tell us about your current evaluation process and what challenges you're facing..."
                    />
                  </div>
                </div>

                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-600 text-sm">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gray-900 text-white px-8 py-4 rounded-lg hover:bg-gray-800 transition-all font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {loading ? 'Submitting...' : 'Request Demo'}
                </button>

                <p className="text-sm text-gray-500 text-center">
                  By submitting this form, you agree to our Privacy Policy and Terms of Service.
                </p>
              </form>
            </div>

            {/* Benefits */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">What to expect from your demo</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl">
                    <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-1" size={24} />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Live Transcript Processing</h4>
                      <p className="text-gray-600">Watch TC Evaluator analyze and evaluate sample transcripts in real-time</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl">
                    <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-1" size={24} />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Customized Walkthrough</h4>
                      <p className="text-gray-600">See how TC Evaluator fits your institution's specific workflow</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl">
                    <CheckCircle2 className="text-blue-600 flex-shrink-0 mt-1" size={24} />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Q&A Session</h4>
                      <p className="text-gray-600">Get answers to all your questions from our product experts</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Join leading institutions</h3>
                <p className="text-blue-100 mb-6">
                  See why universities and colleges trust TC Evaluator to handle their transfer credit evaluations.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-3xl font-bold mb-1">90%</div>
                    <div className="text-sm text-blue-100">Time reduction</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold mb-1">99% +</div>
                    <div className="text-sm text-blue-100">Accuracy rate</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold mb-1">24/7</div>
                    <div className="text-sm text-blue-100">Processing</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold mb-1">100+</div>
                    <div className="text-sm text-blue-100">Institutions</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <img src="/logo.svg" alt="TCEvaluator" className="h-8 mb-4 brightness-0 invert" />
              <p className="text-gray-400 leading-relaxed">
                AI-powered transfer credit evaluation platform designed for modern higher education institutions.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link to="/security" className="hover:text-white transition-colors">Security</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 TCEvaluator. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default ContactUs;
