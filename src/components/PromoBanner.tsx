import { Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PromoBannerProps {
  onVisibilityChange?: (visible: boolean) => void;
}

export default function PromoBanner({ onVisibilityChange }: PromoBannerProps) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Sparkles size={18} className="flex-shrink-0" />
          <p className="text-sm font-medium">
            <span className="hidden sm:inline">MACRAO Conference Special: </span>
            Save up to $2,000 on setup fees!{' '}
            <Link to="/nacada" className="underline font-semibold hover:text-blue-100">
              Learn more
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
