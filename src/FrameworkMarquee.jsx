import React from 'react';
import { Shield, FileText, Lock, Globe, Landmark, Scale } from 'lucide-react';

const frameworks = [
  { name: 'EU AI Act', icon: <Scale size={18} /> },
  { name: 'DORA', icon: <Shield size={18} /> },
  { name: 'SOC 2 Type II', icon: <Lock size={18} /> },
  { name: 'NIST CSF 2.0', icon: <FileText size={18} /> },
  { name: 'SEC Cyber Rules', icon: <Landmark size={18} /> },
  { name: 'GDPR', icon: <Globe size={18} /> },
  { name: 'HIPAA', icon: <Shield size={18} /> },
  { name: 'ISO 27001', icon: <Lock size={18} /> },
];

const FrameworkCard = ({ fw }) => (
  <div className="flex items-center gap-3 px-5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-blue-300 transition-all duration-300 cursor-default hover:shadow-md hover:-translate-y-1 shrink-0 group">
    <div className="text-slate-400 group-hover:text-blue-600 transition-colors">{fw.icon}</div>
    <span className="text-slate-600 font-bold text-sm tracking-wide group-hover:text-slate-900 transition-colors">
      {fw.name}
    </span>
  </div>
);

export default function FrameworkMarquee() {
  return (
    <div className="py-10 border-y border-slate-200 bg-white overflow-hidden relative flex mt-12 mb-20 shadow-[inset_0_2px_10px_rgba(0,0,0,0.02)] group">
      <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
        <div className="flex gap-8 pr-8">
          {frameworks.map((fw, i) => (
            <FrameworkCard key={`set1-${i}`} fw={fw} />
          ))}
        </div>

        <div aria-hidden="true" className="flex gap-8 pr-8">
          {frameworks.map((fw, i) => (
            <FrameworkCard key={`set2-${i}`} fw={fw} />
          ))}
        </div>
      </div>
    </div>
  );
}
