import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 bg-slate-50 py-8 mt-20 relative z-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-slate-500 text-sm font-medium">RegRadar</div>

        <div className="text-slate-400 text-sm font-semibold tracking-wide uppercase">
          Built by Team <span className="text-slate-800 font-bold">CoreDump</span>
        </div>
      </div>
    </footer>
  );
}
