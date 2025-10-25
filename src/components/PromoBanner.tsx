import { useState, useEffect } from 'react';
import { X, Sparkles } from 'lucide-react';

function PromoBanner() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const bannerClosed = localStorage.getItem('nacadaBannerClosed');
    if (bannerClosed === 'true') {
      setIsVisible(false);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('nacadaBannerClosed', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 text-white py-3 px-4 z-[60]">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex-1 flex items-center justify-center gap-3">
          <Sparkles size={20} className="flex-shrink-0 animate-pulse" />
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-center sm:text-left">
            <span className="font-semibold text-sm sm:text-base">NACADA Conference - Limited Time Offer!</span>
            <a
              href="/nacada-conference-offer.docx"
              download
              className="text-xs sm:text-sm underline hover:text-blue-100 transition-colors font-medium"
            >
              Download Details
            </a>
          </div>
        </div>
        <button
          onClick={handleClose}
          className="flex-shrink-0 p-1 hover:bg-white/10 rounded-lg transition-colors"
          aria-label="Close banner"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
}

export default PromoBanner;
