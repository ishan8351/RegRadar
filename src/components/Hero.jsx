import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, FileText, Code, GitPullRequest } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import TechDemoModal from '../TechDemo';

const TerminalDemo = () => {
  const [phase, setPhase] = useState(0);
  const [showOutput, setShowOutput] = useState(false);
  const { isDark } = useTheme();

  useEffect(() => {
    const cycle = () => {
      setPhase(0);
      setShowOutput(false);

      // Phase 1: Scanning
      setTimeout(() => setPhase(1), 500);
      // Phase 2: Extracting
      setTimeout(() => setPhase(2), 2000);
      // Phase 3: Show output
      setTimeout(() => {
        setPhase(3);
        setShowOutput(true);
      }, 3500);
    };

    cycle();
    const interval = setInterval(cycle, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`w-full rounded-xl border overflow-hidden shadow-2xl ${
        isDark ? 'bg-dark-800 border-slate-800' : 'bg-slate-50 border-slate-200'
      }`}
    >
      {/* Terminal Header */}
      <div
        className={`flex items-center gap-2 px-4 py-3 border-b ${
          isDark ? 'bg-dark-700 border-slate-800' : 'bg-slate-100 border-slate-200'
        }`}
      >
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        </div>
        <span className={`ml-2 text-xs font-mono ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
          regr &mdash; zsh
        </span>
      </div>

      {/* Terminal Content */}
      <div className="p-6 font-mono text-sm min-h-[320px]">
        {/* Command */}
        <div className={isDark ? 'text-slate-400' : 'text-slate-600'}>
          <span className="text-brand-500">$</span>
          <span className="ml-2">regr scan --regulation eu-ai-act.pdf --target ./terraform</span>
        </div>

        {/* Phase 1: Scanning */}
        <AnimatePresence>
          {phase >= 1 && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 space-y-2"
            >
              <div
                className={`flex items-center gap-2 ${isDark ? 'text-slate-500' : 'text-slate-600'}`}
              >
                <FileText size={14} className="text-brand-400" />
                <span>Ingesting regulatory document...</span>
                {phase >= 2 && <CheckCircle2 size={14} className="text-green-500" />}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Phase 2: Extracting */}
        <AnimatePresence>
          {phase >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 space-y-2"
            >
              <div
                className={`flex items-center gap-2 ${isDark ? 'text-slate-500' : 'text-slate-600'}`}
              >
                <Code size={14} className="text-brand-400" />
                <span>Extracting technical mandates...</span>
                {phase >= 3 && <CheckCircle2 size={14} className="text-green-500" />}
              </div>
              <div className={`ml-6 text-xs ${isDark ? 'text-slate-600' : 'text-slate-500'}`}>
                → Found: <span className="text-brand-400">encryption_at_rest</span>,{' '}
                <span className="text-brand-400">mfa_required</span>,{' '}
                <span className="text-brand-400">audit_logging</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Phase 3: Output */}
        <AnimatePresence>
          {showOutput && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-4"
            >
              <div
                className={`flex items-center gap-2 mb-3 ${isDark ? 'text-slate-500' : 'text-slate-600'}`}
              >
                <GitPullRequest size={14} className="text-green-500" />
                <span>
                  Scanning infrastructure...{' '}
                  <span className="text-yellow-500">3 violations found</span>
                </span>
              </div>

              {/* Results Box */}
              <div
                className={`rounded-lg border p-4 mt-3 ${
                  isDark ? 'bg-dark-900 border-slate-800' : 'bg-white border-slate-200'
                }`}
              >
                <div className={`text-xs mb-3 ${isDark ? 'text-slate-600' : 'text-slate-500'}`}>
                  BLAST RADIUS ANALYSIS
                </div>

                <div className="space-y-2">
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-red-500">✗ aws_s3_bucket.user_data</span>
                    <span className={`text-xs ${isDark ? 'text-slate-600' : 'text-slate-500'}`}>
                      encryption_at_rest = false
                    </span>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-red-500">✗ aws_iam_user.admin</span>
                    <span className={`text-xs ${isDark ? 'text-slate-600' : 'text-slate-500'}`}>
                      mfa_enabled = false
                    </span>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-red-500">✗ aws_cloudtrail.main</span>
                    <span className={`text-xs ${isDark ? 'text-slate-600' : 'text-slate-500'}`}>
                      is_logging = false
                    </span>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className={`mt-4 pt-3 border-t ${isDark ? 'border-slate-800' : 'border-slate-200'}`}
                >
                  <div className="flex items-center gap-2 text-green-500 text-sm">
                    <GitPullRequest size={14} />
                    <span>PR #142 created: </span>
                    <span className="text-brand-400 underline">fix/eu-ai-act-compliance</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Cursor */}
        {phase < 3 && (
          <div
            className={`mt-2 flex items-center gap-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}
          >
            <span className="text-brand-500">$</span>
            <span
              className={`w-2 h-4 animate-cursor ${isDark ? 'bg-slate-100' : 'bg-slate-900'}`}
            ></span>
          </div>
        )}
      </div>
    </div>
  );
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

export default function Hero() {
  const { isDark } = useTheme();
  const [showTechDemo, setShowTechDemo] = useState(false);

  const scrollToArchitecture = () => {
    const architectureSection = document.getElementById('architecture');
    if (architectureSection) {
      architectureSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-20 pb-16">
        {/* Background Grid */}
        <div
          className={`absolute inset-0 bg-[radial-gradient(circle,_var(--dot-color)_1px,transparent_1px)] bg-[size:24px_24px] opacity-30`}
          style={{ '--dot-color': isDark ? '#27272a' : '#e2e8f0' }}
        ></div>
        <div
          className={`absolute inset-0 bg-gradient-to-b from-transparent via-transparent ${
            isDark ? 'to-dark-900' : 'to-white'
          }`}
        ></div>

        {/* Subtle glow effect */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-500/5 rounded-full blur-[120px]"></div>

        {/* Content */}
        <div className="relative z-10 container-wide">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Text Content */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="text-left"
            >
              {/* Badge */}
              <motion.div variants={fadeInUp} className="mb-6">
                <span
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm ${
                    isDark
                      ? 'bg-dark-700 border-slate-800 text-slate-400'
                      : 'bg-slate-100 border-slate-200 text-slate-600'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>
                  Regulatory Intelligence for Cloud-Native
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                variants={fadeInUp}
                className={`text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-[1.1] ${
                  isDark ? 'text-slate-100' : 'text-slate-900'
                }`}
              >
                From Legal PDF to <span className="text-brand-500">Pull Request</span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                variants={fadeInUp}
                className={`text-lg sm:text-xl mb-8 max-w-xl leading-relaxed ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}
              >
                RegRadar bridges the gap between regulatory frameworks and Infrastructure-as-Code,
                converting legal mandates into deterministic, config-only fixes.
              </motion.p>

              {/* CTAs */}
              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                <button
                  onClick={() => setShowTechDemo(true)}
                  className={`px-6 py-3 rounded-lg font-medium flex items-center gap-2 group transition-all duration-200 ${
                    isDark
                      ? 'bg-brand-500 text-white hover:bg-brand-600'
                      : 'bg-brand-500 text-white hover:bg-brand-600'
                  } shadow-lg shadow-brand-500/25`}
                >
                  See it in Action
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
                <button
                  onClick={scrollToArchitecture}
                  className={`px-6 py-3 rounded-lg font-medium border transition-all duration-200 ${
                    isDark
                      ? 'border-slate-700 text-slate-300 hover:border-slate-600 hover:bg-slate-800/50'
                      : 'border-slate-300 text-slate-700 hover:border-slate-400 hover:bg-slate-50'
                  }`}
                >
                  View Architecture
                </button>
              </motion.div>

              {/* Trust indicators */}
              <motion.div
                variants={fadeInUp}
                className={`mt-10 pt-8 border-t ${isDark ? 'border-slate-800' : 'border-slate-200'}`}
              >
                <p className={`text-sm mb-3 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                  Built for modern compliance
                </p>
                <div
                  className={`flex flex-wrap gap-6 text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}
                >
                  <span className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-green-500" />
                    EU AI Act Ready
                  </span>
                  <span className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-green-500" />
                    DORA Compliant
                  </span>
                  <span className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-green-500" />
                    Zero AI Liability
                  </span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right: Terminal Demo */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="hidden lg:block"
            >
              <TerminalDemo />
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className={`w-6 h-10 rounded-full border-2 flex justify-center pt-2 ${
              isDark ? 'border-slate-700' : 'border-slate-300'
            }`}
          >
            <div
              className={`w-1 h-2 rounded-full ${isDark ? 'bg-slate-500' : 'bg-slate-400'}`}
            ></div>
          </motion.div>
        </motion.div>
      </section>

      {/* Tech Demo Modal */}
      <TechDemoModal isOpen={showTechDemo} onClose={() => setShowTechDemo(false)} />
    </>
  );
}
