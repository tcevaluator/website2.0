import { Link } from 'react-router-dom';
import { Users, Target, Award, GraduationCap } from 'lucide-react';
import SEO from '../components/SEO';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="About TCEvaluator - Modern Transfer Credit Solutions"
        description="Learn about TCEvaluator's mission to revolutionize transfer credit evaluation for higher education institutions."
        canonical="/about"
      />

      <Navigation />

      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">About TCEvaluator</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Revolutionizing transfer credit evaluation with intelligent automation and institutional control
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-20">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-4">
                TC Evaluator was created by professionals who've worked inside colleges, universities, and accrediting bodies.
                We understand that accuracy, compliance, and institutional control matter as much as speed.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our technology isn't just automation—it's institutional intelligence, built for the future of transfer credit management.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-4">
                We reduce evaluation time by 70-80% while maintaining complete transparency and institutional control.
                Every decision includes full audit trails and reasoning.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Your team maintains full control over rules and policies, with the ability to review and override any automated decision.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <div className="bg-gray-50 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap size={32} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Built by Educators</h3>
              <p className="text-gray-600">Created by professionals who understand the challenges of higher education</p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target size={32} className="text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Accuracy First</h3>
              <p className="text-gray-600">Every rule, match, and data point is transparent, traceable, and editable</p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award size={32} className="text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">FERPA Compliant</h3>
              <p className="text-gray-600">Secure, encrypted, and fully compliant with all regulations</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-12 text-center text-white">
            <Users size={48} className="mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-4">Join Leading Institutions</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Hundreds of colleges and universities trust TCEvaluator to streamline their transfer credit evaluation process
            </p>
            <Link
              to="/contact"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Get Started Today
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
