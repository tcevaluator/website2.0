import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import About from './pages/About.tsx';
import Pricing from './pages/Pricing.tsx';
import BookDemo from './pages/BookDemo.tsx';
import Success from './pages/Success.tsx';
import ScrollToTop from './components/ScrollToTop.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<About />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/book-demo" element={<BookDemo />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
