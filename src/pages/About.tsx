import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Target, Zap, Brain, Shield, TrendingUp, Globe, Users, Award } from 'lucide-react';
import SEO from '../components/SEO';

function About() {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="About TCEvaluator | AI-Powered Transfer Credit Solutions"
        description="Learn how TCEvaluator revolutionizes transfer credit evaluation with AI technology, helping colleges and universities scale their operations efficiently."
        canonical="https://tcevaluator.com/about"
      />
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-lg shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex-shrink-0">
              <img src="/logo.svg" alt="TCEvaluator" className="h-8" />
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">Home</Link>
              <Link to="/about" className="text-blue-600 text-sm font-medium">About</Link>
              <Link to="/pricing" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">Pricing</Link>
              <Link to="/book-demo" className="bg-gray-900 text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium">
                Book a Demo
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 border border-blue-200 rounded-full mb-6">
            <Target size={16} className="text-blue-600" />
            <span className="text-sm font-semibold text-blue-900">About TC Evaluator</span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Automating Transfer Credit Evaluation with{' '}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              AI-Driven Precision
            </span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Each year, millions of transfer students face uncertainty about how their hard-earned credits will count toward a new degree. Institutions spend countless hours reviewing transcripts, matching courses, and applying articulation rules—often using spreadsheets or manual processes that vary by evaluator.
          </p>
          <p className="text-2xl font-bold text-gray-900 mt-6">
            TC Evaluator changes that.
          </p>
           <p className="text-xl text-gray-600 leading-relaxed">We've built an <strong>AI-powered platform</strong> that reads transcripts, interprets course data, applies institutional policies, and delivers accurate transfer credit results in minutes. Designed by higher-education professionals and technology leaders, TC Evaluator brings automation, consistency, and transparency to one of the most time-consuming parts of the admissions and registrar workflow.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Target size={32} />
            <h2 className="text-4xl font-bold">Our Mission</h2>
          </div>
          <h3 className="text-2xl font-bold mb-6">
            To streamline and standardize the transfer credit evaluation process for institutions and students.
          </h3>
          <div className="space-y-4 text-lg leading-relaxed text-blue-50">
            <p>
              We believe evaluating credits shouldn't take days or weeks. Students deserve instant clarity, and institutions deserve tools that scale with demand.
            </p>
            <p>
              By combining <strong className="text-white">optical character recognition (OCR)</strong>, <strong className="text-white">machine learning</strong>, and <strong className="text-white">rule-based automation</strong>, TC Evaluator accelerates the process while maintaining institutional control, compliance, and data accuracy.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Four simple steps to transform your evaluation process</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Upload Transcripts</h3>
              <p className="text-gray-600 leading-relaxed">
                Institutions or students can upload official or unofficial transcripts directly into the secure platform. TC Evaluator automatically detects document formats, identifies course tables, and extracts key data points like course numbers, titles, credits, and grades.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">AI-Powered Matching</h3>
              <p className="text-gray-600 leading-relaxed">
                The system compares extracted data against your institution's articulation rules and course catalogs, using a mix of rule-based logic and machine learning to determine likely equivalencies.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Review & Approval</h3>
              <p className="text-gray-600 leading-relaxed">
                Evaluators can review AI-generated recommendations, make adjustments, and approve results—all within a centralized interface that records every decision for auditing and reporting.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-blue-600">4</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Instant Reports & SIS Integration</h3>
              <p className="text-gray-600 leading-relaxed">
                Final evaluations can be exported or sent directly to your Student Information System (SIS)—including Anthology, Jenzabar, Banner, PeopleSoft, and others—creating a seamless digital record of each evaluation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Institutions Choose Us */}
      <section className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">Why Institutions Choose TC Evaluator</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group p-8 rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all">
              <Zap className="text-blue-600 mb-4 group-hover:scale-110 transition-transform" size={32} />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Speed</h3>
              <p className="text-gray-600 leading-relaxed">
                What once took hours per student now takes minutes. TC Evaluator automates repetitive tasks so staff can focus on oversight instead of data entry.
              </p>
            </div>

            <div className="group p-8 rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all">
              <CheckCircle2 className="text-blue-600 mb-4 group-hover:scale-110 transition-transform" size={32} />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Accuracy</h3>
              <p className="text-gray-600 leading-relaxed">
                AI doesn't forget rules or misread course codes. Our algorithms apply institutional logic consistently, improving accuracy and reducing the need for re-evaluation.
              </p>
            </div>

            <div className="group p-8 rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all">
              <TrendingUp className="text-blue-600 mb-4 group-hover:scale-110 transition-transform" size={32} />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Scalability</h3>
              <p className="text-gray-600 leading-relaxed">
                Whether you're processing 50 transcripts or 50,000, TC Evaluator handles it effortlessly—with built-in batch processing and concurrent evaluations.
              </p>
            </div>

            <div className="group p-8 rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all">
              <Shield className="text-blue-600 mb-4 group-hover:scale-110 transition-transform" size={32} />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Compliance</h3>
              <p className="text-gray-600 leading-relaxed">
                The platform is designed with FERPA and data-protection best practices at its core. Every transcript and evaluation is securely stored, with granular access controls and audit trails.
              </p>
            </div>

            <div className="group p-8 rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all">
              <Brain className="text-blue-600 mb-4 group-hover:scale-110 transition-transform" size={32} />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Integration</h3>
              <p className="text-gray-600 leading-relaxed">
                Plug-and-play compatibility with leading SIS and LMS systems ensures smooth data flow without disrupting your existing workflow.
              </p>
            </div>

            <div className="group p-8 rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all">
              <Users className="text-blue-600 mb-4 group-hover:scale-110 transition-transform" size={32} />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Student Experience</h3>
              <p className="text-gray-600 leading-relaxed">
                Students can get instant preliminary transfer results through your website or portal—empowering them with transparency and increasing enrollment yield.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Designed for Higher Ed */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <Award className="w-16 h-16 text-blue-600 mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Designed for Higher Education</h2>
          <div className="text-lg text-gray-700 leading-relaxed space-y-4">
            <p>
              TC Evaluator was created by professionals who've worked inside colleges, universities, and accrediting bodies.
            </p>
            <p>
              We understand that accuracy, compliance, and institutional control matter as much as speed. That's why every rule, every match, and every data point is transparent, traceable, and editable by your team.
            </p>
            <p className="text-xl font-bold text-gray-900">
              Our technology isn't just automation—it's institutional intelligence, built for the future of transfer credit management.
            </p>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 to-blue-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <Globe className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-6">Our Vision</h2>
          <p className="text-xl leading-relaxed text-blue-50">
            To make transfer credit evaluation <strong className="text-white">instantaneous, accurate, and student-centered</strong> across every higher-education institution in the world.
          </p>
          <p className="text-lg leading-relaxed mt-6 text-blue-100">
            We envision a future where no student delays their education because of uncertainty about credit transfer—and where institutions operate with confidence, efficiency, and fairness.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Ready to Modernize Your Transfer Credit Process?
          </h2>
          <p className="text-xl text-gray-600 mb-10">
            Schedule a demo or contact us to see how TC Evaluator can reduce evaluation time, improve accuracy, and enhance the student experience.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/book-demo"
              className="group bg-gray-900 text-white px-10 py-4 rounded-lg hover:bg-gray-800 transition-all font-semibold text-lg shadow-xl hover:shadow-2xl flex items-center gap-2 hover:scale-105 duration-300"
            >
              Request a Demo
              <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="text-white font-bold text-lg mb-4">TCEvaluator</h3>
              <p className="text-sm leading-relaxed">
                AI-powered transfer credit evaluation for modern institutions.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="/" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="/pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="/about" className="hover:text-white transition-colors">About</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="/about" className="hover:text-white transition-colors">About</a></li>
                <li><a href="/book-demo" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-800 text-center text-sm">
            <p>&copy; 2025 TCEvaluator. All rights reserved. Patent Pending.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default About;
