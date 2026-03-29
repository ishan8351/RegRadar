import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from './context/ThemeContext';

// Custom text-based logo component
const Logo = ({ isDark }) => (
  <div className="flex items-center gap-2">
    {/* Geometric shape - stylized radar/scan symbol */}
    <div className="relative w-8 h-8 flex items-center justify-center">
      {/* Outer ring */}
      <div
        className={`absolute inset-0 rounded-lg border-2 rotate-45 transition-colors ${
          isDark ? 'border-brand-500' : 'border-brand-500'
        }`}
      />
      {/* Inner square */}
      <div
        className={`absolute w-3 h-3 rounded-sm transition-colors ${
          isDark ? 'bg-brand-500' : 'bg-brand-500'
        }`}
      />
      {/* Scan line accent */}
      <div
        className={`absolute w-full h-0.5 transition-colors ${
          isDark ? 'bg-brand-400/60' : 'bg-brand-500/60'
        }`}
      />
    </div>
    {/* Text */}
    <span className="text-lg md:text-xl font-bold tracking-tight">
      <span className={isDark ? 'text-slate-100' : 'text-slate-900'}>Reg</span>
      <span className="text-brand-500">Radar</span>
    </span>
  </div>
);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'How it Works', href: '#workflow' },
    { label: 'Architecture', href: '#architecture' },
    { label: 'Team', href: '#team' },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 flex justify-center transition-all duration-500 pointer-events-none ${
        scrolled ? 'pt-4' : 'pt-6'
      }`}
    >
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`pointer-events-auto flex items-center justify-between transition-all duration-500 ${
          scrolled
            ? `w-[95%] md:w-[90%] max-w-5xl backdrop-blur-xl border rounded-xl px-4 md:px-6 py-3 ${
                isDark
                  ? 'bg-dark-900/80 border-slate-800/50 shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
                  : 'bg-white/80 border-slate-200/50 shadow-[0_8px_32px_rgba(0,0,0,0.08)]'
              }`
            : 'w-full max-w-6xl bg-transparent border-transparent px-6 py-3'
        }`}
      >
        {/* Logo */}
        <div
          className="group shrink-0 cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <Logo isDark={isDark} />
        </div>

        {/* Nav links - hidden on mobile */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`text-sm transition-colors ${
                isDark
                  ? 'text-slate-400 hover:text-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right side: Theme toggle */}
        <div className="flex items-center">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className={`p-2.5 rounded-lg transition-all duration-300 theme-toggle ${
              isDark
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900'
            }`}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </motion.nav>
    </header>
  );
}
