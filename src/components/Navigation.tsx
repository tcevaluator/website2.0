import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

interface NavigationProps {
  activeLink?: 'home' | 'about' | 'pricing' | 'security';
  scrolled?: boolean;
}

function Navigation({ activeLink, scrolled: externalScrolled }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
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
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const linkClass = (link: string) =>
    activeLink === link
      ? 'text-blue-600 text-sm font-medium'
      : 'text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium';

  const closeMobileMenu = () => setIsOpen(false);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled || isOpen ? 'bg-white/80 backdrop-blur-lg shadow-sm' : 'bg-white/80 backdrop-blur-lg shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex-shrink-0">
            <img src="/logo.svg" alt="TCEvaluator" className="h-8" />
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={linkClass('home')}>Home</Link>
            <Link to="/about" className={linkClass('about')}>About</Link>
            <Link to="/pricing" className={linkClass('pricing')}>Pricing</Link>
            <Link to="/security" className={linkClass('security')}>Security</Link>
            <Link to="/book-demo" className="bg-gray-900 text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium">
              Book a Demo
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={closeMobileMenu}
          />

          <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-900 z-50 md:hidden overflow-y-auto">
            <div className="flex flex-col min-h-full">
              <div className="flex items-center justify-between p-6 border-b border-gray-700">
                <Link to="/" onClick={closeMobileMenu}>
                  <img src="/logo.svg" alt="TCEvaluator" className="h-8 brightness-0 invert" />
                </Link>
                <button
                  onClick={closeMobileMenu}
                  className="p-2 text-white hover:bg-gray-800 rounded-lg"
                  aria-label="Close menu"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 px-6 py-8">
                <div className="space-y-1">
                  <Link
                    to="/"
                    onClick={closeMobileMenu}
                    className="block px-4 py-4 text-white text-xl font-medium hover:bg-gray-800 rounded-lg"
                  >
                    Home
                  </Link>
                  <Link
                    to="/about"
                    onClick={closeMobileMenu}
                    className="block px-4 py-4 text-white text-xl font-medium hover:bg-gray-800 rounded-lg"
                  >
                    About
                  </Link>
                  <Link
                    to="/pricing"
                    onClick={closeMobileMenu}
                    className="block px-4 py-4 text-white text-xl font-medium hover:bg-gray-800 rounded-lg"
                  >
                    Pricing
                  </Link>
                  <Link
                    to="/security"
                    onClick={closeMobileMenu}
                    className="block px-4 py-4 text-white text-xl font-medium hover:bg-gray-800 rounded-lg"
                  >
                    Security
                  </Link>
                </div>

                <div className="mt-8">
                  <Link
                    to="/book-demo"
                    onClick={closeMobileMenu}
                    className="block w-full bg-blue-600 text-white text-center px-6 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700"
                  >
                    Book a Demo
                  </Link>
                </div>
              </div>

              <div className="p-6 border-t border-gray-700">
                <div className="flex justify-center gap-8 text-sm">
                  <Link
                    to="/privacy"
                    onClick={closeMobileMenu}
                    className="text-gray-400 hover:text-white"
                  >
                    Privacy
                  </Link>
                  <Link
                    to="/terms"
                    onClick={closeMobileMenu}
                    className="text-gray-400 hover:text-white"
                  >
                    Terms
                  </Link>
                  <Link
                    to="/security"
                    onClick={closeMobileMenu}
                    className="text-gray-400 hover:text-white"
                  >
                    Security
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}

export default Navigation;
