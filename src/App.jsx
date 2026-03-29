import React from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Navbar from './Navbar';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Solution from './components/Solution';
import Workflow from './components/Workflow';
import BlastRadius from './components/BlastRadius';
import Architecture from './components/Architecture';
import Impact from './components/Impact';
import FrameworkMarquee from './FrameworkMarquee';
import Team from './Team';
import Footer from './Footer';

function AppContent() {
  const { isDark } = useTheme();

  return (
    <div
      className={`w-full min-h-screen flex flex-col font-sans overflow-x-hidden transition-colors duration-300 ${
        isDark ? 'bg-dark-900 text-slate-200' : 'bg-white text-slate-900'
      }`}
    >
      <Navbar />

      <main className="flex-col w-full">
        <Hero />
        <FrameworkMarquee />
        <Problem />
        <Solution />
        <Workflow />
        <BlastRadius />
        <Architecture />
        <Impact />
        <Team />
      </main>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
