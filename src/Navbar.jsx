import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Activity, Code, Home, Presentation } from 'lucide-react';

const navLinks = [
  { path: '/', label: 'Overview', icon: Home },
  { path: '/architecture', label: 'Architecture', icon: Code },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredPath, setHoveredPath] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 flex justify-center transition-all duration-500 pointer-events-none ${
        scrolled ? 'pt-4 md:pt-6' : 'pt-6 md:pt-10'
      }`}
    >
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`pointer-events-auto flex items-center justify-between transition-all duration-500 ${
          scrolled
            ? 'w-[95%] md:w-[85%] max-w-6xl bg-white/80 backdrop-blur-xl border border-slate-200 rounded-2xl px-4 md:px-6 py-3 shadow-[0_8px_30px_rgb(0,0,0,0.08)]'
            : 'w-full max-w-7xl bg-transparent border-transparent px-6 py-2'
        }`}
      >
        <Link
          to="/"
          className="text-xl md:text-2xl font-extrabold tracking-tighter flex items-center gap-2 group shrink-0"
        >
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 bg-blue-100 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
            <Activity className="text-blue-600 relative z-10 transition-transform duration-300 group-hover:scale-110" />
          </div>
          <span className="text-slate-900 group-hover:text-blue-700 transition-colors hidden sm:block">
            RegRadar
          </span>
        </Link>

        <div className="flex items-center">
          <div className="flex items-center gap-1 md:gap-2 bg-slate-50/80 p-1.5 rounded-xl border border-slate-200 backdrop-blur-md shadow-sm shrink-0">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onMouseEnter={() => setHoveredPath(link.path)}
                  onMouseLeave={() => setHoveredPath(null)}
                  className={`relative flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 text-sm font-semibold transition-colors duration-300 z-10 ${
                    isActive ? 'text-blue-700' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-nav-pill"
                      className="absolute inset-0 bg-blue-100/50 border border-blue-200 rounded-lg -z-10 shadow-sm"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}

                  {!isActive && hoveredPath === link.path && (
                    <motion.div
                      layoutId="hover-nav-pill"
                      className="absolute inset-0 bg-slate-200/50 rounded-lg -z-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  )}

                  <link.icon size={16} className={isActive ? 'text-blue-600' : ''} />
                  <span className="hidden sm:block">{link.label}</span>
                </Link>
              );
            })}
          </div>

          <AnimatePresence>
            {scrolled && (
              <motion.div
                initial={{ opacity: 0, width: 0, marginLeft: 0 }}
                animate={{ opacity: 1, width: 'auto', marginLeft: 16 }}
                exit={{ opacity: 0, width: 0, marginLeft: 0 }}
                className="overflow-hidden hidden md:block"
              >
                <button className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 rounded-xl font-semibold text-sm transition-colors shadow-md whitespace-nowrap">
                  <Presentation size={14} /> View Deck
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>
    </header>
  );
}
