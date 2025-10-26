import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import About from './pages/About.tsx';
import Pricing from './pages/Pricing.tsx';
import ContactUs from './pages/ContactUs.tsx';
import Success from './pages/Success.tsx';
import PrivacyPolicy from './pages/PrivacyPolicy.tsx';
import Terms from './pages/Terms.tsx';
import Security from './pages/Security.tsx';
import ScrollToTop from './components/ScrollToTop.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/about" element={<About />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/book-demo" element={<ContactUs />} />
          <Route path="/success" element={<Success />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/security" element={<Security />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);
