import { useState, useEffect } from 'react';
import { X, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PromoBannerProps {
  onVisibilityChange?: (visible: boolean) => void;
}

export default function PromoBanner({ onVisibilityChange }: PromoBannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const bannerDismissed = localStorage.getItem('promoBannerDismissed');
    if (bannerDismissed) {
      setIsVisible(false);
      onVisibilityChange?.(false);
    }
  }, [onVisibilityChange]);

  const handleDismiss = () => {
    setIsVisible(false);
    onVisibilityChange?.(false);
    localStorage.setItem('promoBannerDismissed', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2 flex-1 justify-center">
          <Sparkles size={18} className="flex-shrink-0" />
          <p className="text-sm font-medium">
            <span className="hidden sm:inline">Special Offer: </span>
            Get 20% off annual plans - Limited time only!{' '}
            <Link to="/pricing" className="underline font-semibold hover:text-blue-100">
              Learn more
            </Link>
          </p>
        </div>
        <button
          onClick={handleDismiss}
          className="flex-shrink-0 p-1 hover:bg-white/10 rounded transition-colors ml-4"
          aria-label="Dismiss banner"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
