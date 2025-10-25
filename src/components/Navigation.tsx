import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronRight } from 'lucide-react';

interface NavigationProps {
  activeLink?: 'home' | 'about' | 'pricing' | 'security';
  scrolled?: boolean;
}

function Navigation({ activeLink, scrolled: externalScrolled }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [internalScrolled, setInternalScrolled] = useState(false);

  const scrolled = externalScrolled !== undefined ? externalScrolled : internalScrolled;

  useEffect(() => {
    if (externalScrolled === undefined) {
      const handleScroll = () => {
        setInternalScrolled(window.scrollY > 20);
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [externalScrolled]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  const linkClass = (link: string) =>
    activeLink === link
      ? 'text-blue-600 text-sm font-medium'
      : 'text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium';

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled || mobileMenuOpen ? 'bg-white/80 backdrop-blur-lg shadow-sm' : 'bg-white/80 backdrop-blur-lg shadow-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex-shrink-0">
              <img src="/logo.svg" alt="TCEvaluator" className="h-8" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className={linkClass('home')}>Home</Link>
              <Link to="/about" className={linkClass('about')}>About</Link>
              <Link to="/pricing" className={linkClass('pricing')}>Pricing</Link>
              <Link to="/security" className={linkClass('security')}>Security</Link>
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
        <div
          className={`fixed top-0 right-0 bottom-0 left-0 z-50 md:hidden transition-transform duration-500 ease-out ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{ backgroundColor: '#111827' }}
        >
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
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="group block py-4 px-6 rounded-xl hover:bg-white/10 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-semibold text-white">Home</span>
                    <ChevronRight size={24} className="text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>

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

                <Link
                  to="/security"
                  onClick={() => setMobileMenuOpen(false)}
                  className="group block py-4 px-6 rounded-xl hover:bg-white/10 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-semibold text-white">Security</span>
                    <ChevronRight size={24} className="text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>

                <Link
                  to="/privacy"
                  onClick={() => setMobileMenuOpen(false)}
                  className="group block py-4 px-6 rounded-xl hover:bg-white/10 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-semibold text-white">Privacy Policy</span>
                    <ChevronRight size={24} className="text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>

                <Link
                  to="/terms"
                  onClick={() => setMobileMenuOpen(false)}
                  className="group block py-4 px-6 rounded-xl hover:bg-white/10 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-semibold text-white">Terms of Service</span>
                    <ChevronRight size={24} className="text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              </div>
            </div>

            {/* CTA Button */}
            <div className="p-6 border-t border-white/10">
              <Link
                to="/book-demo"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                Book a Demo
                <ChevronRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navigation;
