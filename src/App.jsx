import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { FavoritesProvider } from './context/FavoritesContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Lazy Loaded Pages
const Home = lazy(() => import('./pages/Home'));
const HotelDetails = lazy(() => import('./pages/HotelDetails'));
const Favorites = lazy(() => import('./pages/Favorites'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Scroll to Top component on route changes
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Global page loading indicator
function PageLoader() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3">
      {/* Spinner */}
      <div className="w-10 h-10 border-4 border-indigo-600/20 border-t-indigo-600 rounded-full animate-spin" />
      <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
        Loading property explorer...
      </span>
    </div>
  );
}

export default function App() {
  return (
    <FavoritesProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-[#f9fafb] dark:bg-[#0b0f19] text-gray-900 dark:text-gray-100 transition-colors duration-300">
          {/* Header Navigation */}
          <Navbar />

          {/* Main Routing Pages */}
          <div className="flex-1">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/hotel/:id" element={<HotelDetails />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </div>

          {/* Footer details */}
          <Footer />
        </div>

        {/* Toast notifications */}
        <Toaster position="bottom-right" reverseOrder={false} />
      </Router>
    </FavoritesProvider>
  );
}
