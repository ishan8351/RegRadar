import React from 'react';
import { motion } from 'framer-motion';
import { FileSearch, Crosshair, GitPullRequest, ArrowRight, Zap } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const solutions = [
  {
    icon: FileSearch,
    title: 'Automated Ingestion',
    description:
      'Upload regulatory PDFs. Our LLM extracts actionable technical mandates into a structured JSON schema with confidence scores.',
    highlight: 'PDF → JSON in seconds',
  },
  {
    icon: Crosshair,
    title: 'Blast Radius Mapping',
    description:
      'Scans your Terraform and Kubernetes manifests to find the exact resources that fail the new mandate. No false positives.',
    highlight: 'Pinpoint accuracy',
  },
  {
    icon: GitPullRequest,
    title: 'Auto-Remediation',
    description:
      'Generates config-only Pull Requests in GitHub that fix infrastructure issues. Human-approved, machine-generated.',
    highlight: 'One-click compliance',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function Solution() {
  const { isDark } = useTheme();

  return (
    <section
      className={`py-24 md:py-32 relative overflow-hidden ${
        isDark ? 'bg-dark-800' : 'bg-slate-50'
      }`}
    >
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-500/20 to-transparent"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-500/5 rounded-full blur-[150px]"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-brand-500 text-sm font-medium tracking-wide uppercase mb-4 block">
            The Solution
          </span>
          <h2
            className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-6 ${
              isDark ? 'text-slate-100' : 'text-slate-900'
            }`}
          >
            Bridge the Gap with <span className="text-brand-500">RegRadar</span>
          </h2>
          <p
            className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}
          >
            The first automated bridge between "Legalese" and "Infrastructure-as-Code." No more
            broken telephone.
          </p>
        </motion.div>

        {/* Solution Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {solutions.map((solution, idx) => (
            <motion.div key={idx} variants={cardVariants} className="group relative">
              <div
                className={`
                h-full rounded-2xl border p-8
                transition-all duration-500 
                hover:-translate-y-2 hover:shadow-xl
                ${
                  isDark
                    ? 'bg-dark-900 border-slate-800 hover:border-brand-500/30 hover:shadow-brand-500/5'
                    : 'bg-white border-slate-200 hover:border-brand-400/50 hover:shadow-brand-500/10'
                }
              `}
              >
                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-xl border flex items-center justify-center mb-6 transition-all duration-300 ${
                      isDark
                        ? 'bg-dark-700 border-slate-700 group-hover:border-brand-500/30 group-hover:bg-brand-500/10'
                        : 'bg-slate-100 border-slate-200 group-hover:border-brand-400/50 group-hover:bg-brand-50'
                    }`}
                  >
                    <solution.icon
                      size={26}
                      className={`transition-colors duration-300 ${
                        isDark
                          ? 'text-slate-400 group-hover:text-brand-400'
                          : 'text-slate-500 group-hover:text-brand-500'
                      }`}
                    />
                  </div>

                  {/* Title */}
                  <h3
                    className={`text-xl font-semibold mb-3 transition-colors duration-300 ${
                      isDark
                        ? 'text-slate-100 group-hover:text-brand-400'
                        : 'text-slate-900 group-hover:text-brand-600'
                    }`}
                  >
                    {solution.title}
                  </h3>

                  {/* Description */}
                  <p
                    className={`text-sm leading-relaxed mb-6 ${
                      isDark ? 'text-slate-400' : 'text-slate-600'
                    }`}
                  >
                    {solution.description}
                  </p>

                  {/* Highlight */}
                  <div className="flex items-center gap-2 text-sm">
                    <Zap size={14} className="text-brand-500" />
                    <span className="text-brand-500 font-medium">{solution.highlight}</span>
                  </div>
                </div>

                {/* Arrow indicator */}
                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                  <ArrowRight size={20} className="text-brand-500" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Comparison Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-16"
        >
          <div
            className={`rounded-2xl border p-8 md:p-10 ${
              isDark ? 'bg-dark-900 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Before */}
              <div className="text-center md:text-left">
                <span
                  className={`text-xs uppercase tracking-wider mb-2 block ${
                    isDark ? 'text-slate-500' : 'text-slate-400'
                  }`}
                >
                  Without RegRadar
                </span>
                <div className="flex items-baseline gap-2 justify-center md:justify-start">
                  <span className="text-4xl md:text-5xl font-bold text-red-500">10-20</span>
                  <span className={isDark ? 'text-slate-500' : 'text-slate-400'}>weeks</span>
                </div>
                <p className={`text-sm mt-2 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                  Manual compliance pipeline
                </p>
              </div>

              {/* Divider */}
              <div className="hidden md:block absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2">
                <div className={`w-px h-20 ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}></div>
                <div
                  className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border flex items-center justify-center ${
                    isDark ? 'bg-dark-800 border-slate-700' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <ArrowRight size={16} className="text-brand-500" />
                </div>
              </div>

              {/* After */}
              <div className="text-center md:text-right relative">
                <span
                  className={`text-xs uppercase tracking-wider mb-2 block ${
                    isDark ? 'text-slate-500' : 'text-slate-400'
                  }`}
                >
                  With RegRadar
                </span>
                <div className="flex items-baseline gap-2 justify-center md:justify-end">
                  <span className="text-4xl md:text-5xl font-bold text-green-500">Minutes</span>
                </div>
                <p className={`text-sm mt-2 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                  Automated end-to-end
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
