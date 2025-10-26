import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ArrowRight, CheckCircle2, Zap, TrendingUp, Brain, Clock, Users, BarChart3, Sparkles, ChevronRight, Shield, FileText, Award, Play, XCircle, Building2, GraduationCap } from 'lucide-react';
import SEO from './components/SEO';
import Particles from './components/Particles';
import PromoBanner from './components/PromoBanner';

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (videoOpen || mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [videoOpen, mobileMenuOpen]);

  return (
    <div className="min-h-screen bg-white">
      <SEO />
      <PromoBanner onVisibilityChange={setBannerVisible} />
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled || mobileMenuOpen ? 'bg-white/80 backdrop-blur-lg shadow-sm' : 'bg-transparent'
      }`} style={{ top: bannerVisible ? '48px' : '0px' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex-shrink-0">
              <img src="/logo.svg" alt="TCEvaluator" className="h-8" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">Features</a>
              <a href="#comparison" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">Comparison</a>
              <Link to="/about" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">About</Link>
              <Link to="/pricing" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">Pricing</Link>
              <Link to="/book-demo" className="bg-gray-900 text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium">
                Book a Demo
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation - Backdrop */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden animate-fade-in"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* Mobile Navigation - Menu Panel */}
        <div className={`fixed top-0 right-0 bottom-0 left-0 z-50 md:hidden transition-transform duration-500 ease-out ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`} style={{ backgroundColor: '#111827' }}>
          <div className="h-full w-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                <img src="/logo.svg" alt="TCEvaluator" className="h-8 brightness-0 invert" />
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X size={24} className="text-white" />
              </button>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 overflow-y-auto px-6 py-12">
              <div className="space-y-2">
                <a
                  href="#features"
                  onClick={() => setMobileMenuOpen(false)}
                  className="group block py-4 px-6 rounded-xl hover:bg-white/10 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-semibold text-white">Features</span>
                    <ChevronRight size={24} className="text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </div>
                </a>

                <a
                  href="#comparison"
                  onClick={() => setMobileMenuOpen(false)}
                  className="group block py-4 px-6 rounded-xl hover:bg-white/10 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-semibold text-white">Comparison</span>
                    <ChevronRight size={24} className="text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </div>
                </a>

                <Link
                  to="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="group block py-4 px-6 rounded-xl hover:bg-white/10 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-semibold text-white">About</span>
                    <ChevronRight size={24} className="text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>

                <Link
                  to="/pricing"
                  onClick={() => setMobileMenuOpen(false)}
                  className="group block py-4 px-6 rounded-xl hover:bg-white/10 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-semibold text-white">Pricing</span>
                    <ChevronRight size={24} className="text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              </div>

              {/* CTA Section */}
              <div className="mt-12 space-y-4">
                <Link
                  to="/book-demo"
                  onClick={() => setMobileMenuOpen(false)}
                  className="group flex items-center justify-between w-full bg-white text-gray-900 px-8 py-5 rounded-xl hover:bg-gray-100 transition-all font-semibold text-lg shadow-lg"
                >
                  <span>Book a Demo</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>

                <div className="flex items-center justify-center gap-8 pt-6 text-white/60 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} />
                    <span>Free trial</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} />
                    <span>Cancel anytime</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/10">
              <div className="grid grid-cols-3 gap-4 text-center">
                <Link
                  to="/privacy"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-white/60 hover:text-white transition-colors text-sm"
                >
                  Privacy
                </Link>
                <Link
                  to="/terms"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-white/60 hover:text-white transition-colors text-sm"
                >
                  Terms
                </Link>
                <Link
                  to="/security"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-white/60 hover:text-white transition-colors text-sm"
                >
                  Security
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden" style={{ paddingTop: bannerVisible ? '11rem' : '8rem' }}>
        {/* Particles Background */}
        <Particles className="absolute inset-0 z-0" />

        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/30 via-white/80 to-white z-10 pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-100/20 via-transparent to-transparent z-10 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full shadow-sm">
                <Sparkles size={16} className="text-blue-600" />
                <span className="text-sm font-medium text-gray-700">Patent Pending Technology</span>
              </div>
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-[1.1] tracking-tight">
                Transfer credit evaluation,{' '}
                <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  powered by AI
                </span>
              </h1>
              <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed">
                Reduce evaluation time from 45 minutes to 5 minutes. Join leading institutions transforming their transfer credit process.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/about" className="group bg-gray-900 text-white px-8 py-4 rounded-lg hover:bg-gray-800 transition-all flex items-center justify-center gap-2 font-medium shadow-lg hover:shadow-xl hover:scale-105">
                  Learn More
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <button
                  onClick={() => setVideoOpen(true)}
                  className="group text-gray-700 px-8 py-4 rounded-lg hover:bg-gray-50 transition-all font-medium flex items-center justify-center gap-2 border-2 border-gray-200 hover:border-gray-300"
                >
                  <Play size={20} className="group-hover:scale-110 transition-transform" />
                  Watch Demo
                </button>
              </div>
             
            </div>

            {/* Right Image */}
            <div className="relative animate-fade-in-up animation-delay-200">
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
              <div className="absolute -bottom-8 -left-4 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse animation-delay-300"></div>

              <div className="relative rounded-2xl border border-gray-200 shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-500 hover:scale-[1.02]">
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6">
                  <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
                    <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 border-b border-gray-200">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <div className="ml-4 text-xs text-gray-500 font-medium">TCEvaluator Dashboard</div>
                    </div>
                    <img
                      src="/tcevaluator_dashboard.webp"
                      alt="TCEvaluator Dashboard"
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {videoOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in" onClick={() => setVideoOpen(false)}>
          <div className="relative w-full max-w-5xl mx-4 animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setVideoOpen(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <XCircle size={36} />
            </button>
            <div className="relative pb-[56.25%] bg-black rounded-xl overflow-hidden shadow-2xl">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/r4hlNLF5ogI?autoplay=1"
                title="TCEvaluator Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}

      {/* Social Proof */}
      <section className="py-16 border-y border-gray-200 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-medium text-gray-500 mb-8 animate-fade-in">TRUSTED BY LEADING INSTITUTIONS</p>
          <div className="flex flex-wrap items-center justify-center gap-16 transition-all duration-500">
            <img
              src="/cleary-university-seeklogo-1.png"
              alt="Cleary University"
              className="h-16 animate-fade-in animation-delay-200"
            />
            <img
              src="/pc_logo.webp"
              alt="Pacific College of Health and Science"
              className="h-12 animate-fade-in animation-delay-100"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">Built for scale.<br/>Designed for speed.</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to modernize your transfer credit evaluation process
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="group p-8 rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all bg-white hover:-translate-y-1 duration-300">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors group-hover:scale-110 duration-300">
                <Zap className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Up to 10x Faster Processing</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Reduce evaluation time from 45 minutes to 5 minutes with intelligent automation.
              </p>
              <div className="text-sm text-blue-600 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                  <Link to="/about" className="group bg-gray-900 text-white px-8 py-4 rounded-lg hover:bg-gray-800 transition-all flex items-center justify-center gap-2 font-medium shadow-lg hover:shadow-xl hover:scale-105">
                  Learn More
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
            <div className="group p-8 rounded-2xl border border-gray-200 hover:border-green-300 hover:shadow-xl transition-all bg-white hover:-translate-y-1 duration-300">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-100 transition-colors group-hover:scale-110 duration-300">
                <Brain className="text-green-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">AI-Powered Accuracy</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Advanced machine learning ensures consistent, accurate evaluations every time.
              </p>
              <div className="text-sm text-green-600 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                Learn more <ChevronRight size={16} />
              </div>
            </div>
            <div className="group p-8 rounded-2xl border border-gray-200 hover:border-purple-300 hover:shadow-xl transition-all bg-white hover:-translate-y-1 duration-300">
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple-100 transition-colors group-hover:scale-110 duration-300">
                <TrendingUp className="text-purple-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Unlimited Scalability</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Scale seamlessly to support any volume of evaluations
              </p>
              <div className="text-sm text-purple-600 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                Learn more <ChevronRight size={16} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table Section */}
      <section id="comparison" className="py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-blue-50/30 via-transparent to-transparent"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 border border-blue-200 rounded-full mb-6">
              <Zap size={16} className="text-blue-600" />
              <span className="text-sm font-semibold text-blue-900">Side-by-Side Comparison</span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Why institutions choose
              <span className="block mt-2 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">TC Evaluator</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how automation transforms every aspect of transfer credit evaluation
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200 hover:shadow-3xl transition-shadow duration-500">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 text-white">
                    <th className="px-8 py-6 text-left text-base font-bold w-1/4">Category</th>
                    <th className="px-8 py-6 text-left text-base font-bold w-5/12">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                          <Zap size={20} className="text-white" />
                        </div>
                        <div>
                          <div className="font-bold text-lg">TC Evaluator</div>
                          <div className="text-xs text-blue-100 font-normal">Automated System</div>
                        </div>
                      </div>
                    </th>
                    <th className="px-8 py-6 text-left text-base font-bold w-1/3">
                      <div>
                        <div className="font-bold text-lg">Manual Evaluation</div>
                        <div className="text-xs text-blue-100 font-normal">Traditional Process</div>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="group hover:bg-gradient-to-r hover:from-green-50/50 hover:to-blue-50/30 transition-all duration-300 border-b border-gray-100">
                    <td className="px-8 py-6">
                      <div className="font-bold text-gray-900 text-base">Processing Speed</div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                          <CheckCircle2 size={16} className="text-green-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 mb-1">Lightning Fast</div>
                          <span className="text-gray-700 leading-relaxed">Evaluations completed in <span className="font-bold text-blue-600">minutes</span> using AI and OCR automation</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-gray-500 italic">Can take days or weeks depending on staffing</td>
                  </tr>
                  <tr className="group hover:bg-gradient-to-r hover:from-green-50/50 hover:to-blue-50/30 transition-all duration-300 border-b border-gray-100">
                    <td className="px-8 py-6">
                      <div className="font-bold text-gray-900 text-base">Accuracy & Consistency</div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                          <CheckCircle2 size={16} className="text-green-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 mb-1">99%+ Accurate</div>
                          <span className="text-gray-700 leading-relaxed">Rule-driven, uniform decisions with complete audit trail</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-gray-500 italic">Subject to human error and differing interpretations</td>
                  </tr>
                  <tr className="group hover:bg-gradient-to-r hover:from-green-50/50 hover:to-blue-50/30 transition-all duration-300 border-b border-gray-100">
                    <td className="px-8 py-6">
                      <div className="font-bold text-gray-900 text-base">Scalability</div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                          <CheckCircle2 size={16} className="text-green-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 mb-1">Unlimited Capacity</div>
                          <span className="text-gray-700 leading-relaxed">Manages extensive evaluation <span className="font-bold text-blue-600">workloads with ease</span></span> 
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-gray-500 italic">Limited by human capacity and staffing</td>
                  </tr>
                  <tr className="group hover:bg-gradient-to-r hover:from-green-50/50 hover:to-blue-50/30 transition-all duration-300 border-b border-gray-100">
                    <td className="px-8 py-6">
                      <div className="font-bold text-gray-900 text-base">Transcript Data Entry</div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                          <CheckCircle2 size={16} className="text-green-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 mb-1">Fully Automated</div>
                          <span className="text-gray-700 leading-relaxed">Automatic extraction and intelligent categorization</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-gray-500 italic">Manual data entry from PDF or printed documents</td>
                  </tr>
                  <tr className="group hover:bg-gradient-to-r hover:from-green-50/50 hover:to-blue-50/30 transition-all duration-300 border-b border-gray-100">
                    <td className="px-8 py-6">
                      <div className="font-bold text-gray-900 text-base">Rule Management</div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                          <CheckCircle2 size={16} className="text-green-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 mb-1">Centralized Control</div>
                          <span className="text-gray-700 leading-relaxed">Single, editable rule database with version control</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-gray-500 italic">Dispersed spreadsheets and outdated records</td>
                  </tr>
                  <tr className="group hover:bg-gradient-to-r hover:from-green-50/50 hover:to-blue-50/30 transition-all duration-300 border-b border-gray-100">
                    <td className="px-8 py-6">
                      <div className="font-bold text-gray-900 text-base">Security</div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                          <CheckCircle2 size={16} className="text-green-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 mb-1">FERPA Compliant</div>
                          <span className="text-gray-700 leading-relaxed">Encrypted data handling with full security compliance</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-gray-500 italic">Higher risk of manual oversight errors</td>
                  </tr>
                
                  <tr className="group hover:bg-gradient-to-r hover:from-green-50/50 hover:to-blue-50/30 transition-all duration-300 border-b border-gray-100">
                    <td className="px-8 py-6">
                      <div className="font-bold text-gray-900 text-base">Student Experience</div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                          <CheckCircle2 size={16} className="text-green-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 mb-1">Fast & Accurate Results</div>
                          <span className="text-gray-700 leading-relaxed">Fast, dependable results that students can trust</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-gray-500 italic">Long wait times create uncertainty and anxiety</td>
                  </tr>
                  <tr className="group hover:bg-gradient-to-r hover:from-green-50/50 hover:to-blue-50/30 transition-all duration-300">
                    <td className="px-8 py-6">
                      <div className="font-bold text-gray-900 text-base">Cost Efficiency</div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                          <CheckCircle2 size={16} className="text-green-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 mb-1">Massive Savings</div>
                          <span className="text-gray-700 leading-relaxed">Reduces labor hours by <span className="font-bold text-blue-600">70–80%</span> with immediate ROI</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-gray-500 italic">Ongoing staff and administrative overhead costs</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Designed for Higher Education Section */}
      <section className="py-32 bg-gradient-to-br from-blue-600 to-blue-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Building2 size={32} />
                <h2 className="text-5xl font-bold">Designed for Higher Education</h2>
              </div>
              <div className="space-y-6 text-lg leading-relaxed text-blue-50">
                <p>
                  TC Evaluator was created by professionals who've worked inside <strong className="text-white">colleges, universities, and accrediting bodies</strong>.
                </p>
                <p>
                  We understand that <strong className="text-white">accuracy, compliance, and institutional control</strong> matter as much as speed. That's why every rule, every match, and every data point is transparent, traceable, and editable by your team.
                </p>
                <p className="text-xl font-semibold text-white">
                  Our technology isn't just automation—it's institutional intelligence, built for the future of transfer credit management.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6 mt-10">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                  <GraduationCap size={32} className="mb-3" />
                  <div className="text-2xl font-bold mb-1">Built by Educators</div>
                  <div className="text-blue-100 text-sm">For educators who understand the challenges</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                  <Shield size={32} className="mb-3" />
                  <div className="text-2xl font-bold mb-1">FERPA Compliant</div>
                  <div className="text-blue-100 text-sm">Secure, encrypted, and fully compliant</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Transparent & Traceable</h3>
                    <p className="text-blue-100">Every decision includes full audit trails and reasoning</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Institutional Control</h3>
                    <p className="text-blue-100">Your team maintains full control over rules and policies</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Continuous Support</h3>
                    <p className="text-blue-100">Dedicated implementation and ongoing training included</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats/Impact Section */}
      <section className="py-32 bg-gradient-to-br from-gray-900 via-gray-900 to-blue-900 text-white overflow-hidden">
        {/* Particles Background */}
        <Particles className="absolute inset-0 z-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl font-bold mb-6">The transfer credit crisis</h2>
              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                Every year, millions of students lose credits in transfer, costing them time, money, and opportunity. The manual evaluation process is broken.
              </p>
              <div className="space-y-6">
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/30 transition-colors">
                    <Clock className="text-blue-400" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Week-long delays</h3>
                    <p className="text-gray-400">Students wait 5-7 days for evaluations, delaying enrollment decisions</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-red-500/30 transition-colors">
                    <Users className="text-red-400" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">43% credit loss</h3>
                    <p className="text-gray-400">Nearly half of all credits are lost during the transfer process</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-yellow-500/30 transition-colors">
                    <BarChart3 className="text-yellow-400" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">$6B wasted annually</h3>
                    <p className="text-gray-400">Lost credits cost students billions in unnecessary tuition</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors">
                <div className="text-5xl font-bold mb-2">40M+</div>
                <div className="text-gray-400">Students affected</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors">
                <div className="text-5xl font-bold mb-2">14M</div>
                <div className="text-gray-400">Annual evaluations</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors">
                <div className="text-5xl font-bold mb-2">45min</div>
                <div className="text-gray-400">Per evaluation</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors">
                <div className="text-5xl font-bold mb-2">$6B</div>
                <div className="text-gray-400">Lost annually</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-32 bg-gray-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Simple. Powerful. Automated.</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Three simple steps to transform your evaluation process
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="relative group">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl flex items-center justify-center font-bold text-xl shadow-lg transition-transform duration-300 group-hover:scale-110 z-10">1</div>
              <div className="bg-white p-10 pt-12 rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 h-full">
                <FileText className="text-blue-600 mb-4 transition-transform duration-300 group-hover:scale-110" size={32} />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Upload Transcripts</h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Simply upload transcripts in any format. Our system reads and understands documents instantly using advanced OCR and NLP.
                </p>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl flex items-center justify-center font-bold text-xl shadow-lg transition-transform duration-300 group-hover:scale-110 z-10">2</div>
              <div className="bg-white p-10 pt-12 rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 h-full">
                <Brain className="text-blue-600 mb-4 transition-transform duration-300 group-hover:scale-110" size={32} />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">AI Analysis</h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Intelligent algorithms match and analyze data against your institution's policies with complete transparency and accuracy.
                </p>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl flex items-center justify-center font-bold text-xl shadow-lg transition-transform duration-300 group-hover:scale-110 z-10">3</div>
              <div className="bg-white p-10 pt-12 rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 h-full">
                <Award className="text-blue-600 mb-4 transition-transform duration-300 group-hover:scale-110" size={32} />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Get Results</h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Receive comprehensive evaluations with automated recommendations and full documentation in minutes, not days.
                </p>
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
                <li><Link to="/book-demo" className="hover:text-white transition-colors">Book Demo</Link></li>
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

export default App;
