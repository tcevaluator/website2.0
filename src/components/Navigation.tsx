import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';

interface NavigationProps {
  bannerVisible?: boolean;
}

export default function Navigation({ bannerVisible = false }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled || mobileMenuOpen || !isHomePage ? 'bg-white/80 backdrop-blur-lg shadow-sm' : 'bg-transparent'
    }`} style={{ top: bannerVisible ? '48px' : '0px' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex-shrink-0">
            <img src="/logo.svg" alt="TCEvaluator" className="h-8" />
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {isHomePage ? (
              <>
                <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">Features</a>
                <a href="#comparison" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">Comparison</a>
              </>
            ) : null}
            <Link to="/about" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">About</Link>
            <Link to="/pricing" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">Pricing</Link>
            <Link to="/contact" className="bg-gray-900 text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium">
              Contact Us
            </Link>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden animate-fade-in"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <div className={`fixed top-0 right-0 bottom-0 left-0 z-50 md:hidden transition-transform duration-500 ease-out ${
        mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`} style={{ backgroundColor: '#111827' }}>
        <div className="h-full w-full flex flex-col">
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

          <div className="flex-1 overflow-y-auto px-6 py-12">
            <div className="space-y-2">
              {isHomePage && (
                <>
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
                </>
              )}

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

            <div className="mt-12 space-y-4">
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="group flex items-center justify-between w-full bg-white text-gray-900 px-8 py-5 rounded-xl hover:bg-gray-100 transition-all font-semibold text-lg shadow-lg"
              >
                <span>Contact Us</span>
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

          <div className="p-6 border-t border-white/10">
            <div className="grid grid-cols-2 gap-4 text-center">
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
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
