import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './Home';
import Architecture from './Architecture';
import Navbar from './Navbar';
import Footer from './Footer';
import Loader from './Loader';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    });
  }, [pathname]);

  return null;
}

function App() {
  // Add loading state
  const [loading, setLoading] = useState(true);

  // Simulate initial app load time to show off the cool loader
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500); // Loader will show for 2.5 seconds
    return () => clearTimeout(timer);
  }, []);

  // Show the loader if loading is true
  if (loading) {
    return (
      // Changed bg-[#0f0f0f] to bg-[#e8e8e8] here!
      <div className="w-screen h-screen bg-[#e8e8e8] flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <Router>
      <ScrollToTop />

      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-blue-200 selection:text-blue-900">
        <Navbar />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/architecture" element={<Architecture />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;