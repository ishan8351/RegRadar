import React from 'react';
import {
  Shield,
  FileText,
  Lock,
  Globe,
  Landmark,
  Scale,
  Building2,
  ShieldCheck,
} from 'lucide-react';
import { useTheme } from './context/ThemeContext';

const frameworks = [
  { name: 'EU AI Act', icon: Scale },
  { name: 'DORA', icon: Shield },
  { name: 'SOC 2 Type II', icon: Lock },
  { name: 'NIST CSF 2.0', icon: FileText },
  { name: 'SEC Cyber Rules', icon: Landmark },
  { name: 'GDPR', icon: Globe },
  { name: 'HIPAA', icon: ShieldCheck },
  { name: 'ISO 27001', icon: Building2 },
];

const FrameworkCard = ({ fw, isDark }) => {
  const Icon = fw.icon;
  return (
    <div
      className={`flex items-center gap-3 px-5 py-3 rounded-lg border transition-all duration-300 cursor-default shrink-0 group ${
        isDark
          ? 'border-slate-800 bg-dark-800/50 hover:bg-dark-800 hover:border-slate-700'
          : 'border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 shadow-sm'
      }`}
    >
      <Icon
        size={16}
        className={`group-hover:text-brand-400 transition-colors ${isDark ? 'text-slate-500' : 'text-slate-400'}`}
      />
      <span
        className={`font-medium text-sm tracking-wide transition-colors whitespace-nowrap ${
          isDark
            ? 'text-slate-400 group-hover:text-slate-200'
            : 'text-slate-600 group-hover:text-slate-900'
        }`}
      >
        {fw.name}
      </span>
    </div>
  );
};

export default function FrameworkMarquee() {
  const { isDark } = useTheme();

  return (
    <div
      className={`py-8 border-y overflow-hidden relative flex group ${
        isDark ? 'border-slate-800/50 bg-dark-900' : 'border-slate-200 bg-slate-50'
      }`}
    >
      {/* Gradient fade edges */}
      <div
        className={`absolute left-0 top-0 bottom-0 w-24 md:w-48 z-10 pointer-events-none ${
          isDark
            ? 'bg-gradient-to-r from-dark-900 to-transparent'
            : 'bg-gradient-to-r from-slate-50 to-transparent'
        }`}
      />
      <div
        className={`absolute right-0 top-0 bottom-0 w-24 md:w-48 z-10 pointer-events-none ${
          isDark
            ? 'bg-gradient-to-l from-dark-900 to-transparent'
            : 'bg-gradient-to-l from-slate-50 to-transparent'
        }`}
      />

      {/* Marquee container */}
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
        {/* First set */}
        <div className="flex gap-4 pr-4">
          {frameworks.map((fw, i) => (
            <FrameworkCard key={`set1-${i}`} fw={fw} isDark={isDark} />
          ))}
        </div>

        {/* Duplicate for seamless loop */}
        <div aria-hidden="true" className="flex gap-4 pr-4">
          {frameworks.map((fw, i) => (
            <FrameworkCard key={`set2-${i}`} fw={fw} isDark={isDark} />
          ))}
        </div>

        {/* Third set for extra smooth looping */}
        <div aria-hidden="true" className="flex gap-4 pr-4">
          {frameworks.map((fw, i) => (
            <FrameworkCard key={`set3-${i}`} fw={fw} isDark={isDark} />
          ))}
        </div>
      </div>
    </div>
  );
}
