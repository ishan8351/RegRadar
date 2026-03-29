import React from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  Users,
  ClipboardList,
  Code,
  AlertTriangle,
  Clock,
  DollarSign,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const problemSteps = [
  {
    step: 1,
    role: 'Lawyers',
    description:
      'Read 300-page dense PDFs containing new rulings like the EU AI Act, DORA, and SEC mandates.',
    icon: FileText,
    time: '2-4 weeks',
  },
  {
    step: 2,
    role: 'Consultants',
    description:
      'Map legal concepts into business requirements. Manual interpretation leads to inconsistencies.',
    icon: Users,
    time: '3-6 weeks',
  },
  {
    step: 3,
    role: 'Project Managers',
    description:
      'Translate requirements into Jira tickets. Priorities get shuffled, context gets lost.',
    icon: ClipboardList,
    time: '1-2 weeks',
  },
  {
    step: 4,
    role: 'Developers',
    description:
      "Manually hunt for legacy code. By the time it's fixed, new regulations are passed.",
    icon: Code,
    time: '4-8 weeks',
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

export default function Problem() {
  const { isDark } = useTheme();

  return (
    <section
      className={`py-24 md:py-32 relative overflow-hidden ${isDark ? 'bg-dark-900' : 'bg-white'}`}
    >
      {/* Background accent */}
      <div
        className={`absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-500/20 to-transparent`}
      ></div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-brand-500 text-sm font-medium tracking-wide uppercase mb-4 block">
            The Problem
          </span>
          <h2
            className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-6 ${
              isDark ? 'text-slate-100' : 'text-slate-900'
            }`}
          >
            The Translation Gap
          </h2>
          <p
            className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}
          >
            Regulations are accelerating faster than engineering cycles. The compliance pipeline is
            100% manual, slow, and expensive.
          </p>
        </motion.div>

        {/* Stats Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          <div
            className={`rounded-xl p-6 text-center border ${
              isDark ? 'bg-dark-800 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-center gap-2 text-yellow-500 mb-2">
              <Clock size={20} />
              <span className="text-3xl font-bold">3-6</span>
            </div>
            <p className={`text-sm ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
              Months to compliance
            </p>
          </div>
          <div
            className={`rounded-xl p-6 text-center border ${
              isDark ? 'bg-dark-800 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-center gap-2 text-red-500 mb-2">
              <DollarSign size={20} />
              <span className="text-3xl font-bold">$500K+</span>
            </div>
            <p className={`text-sm ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
              Average consulting costs
            </p>
          </div>
          <div
            className={`rounded-xl p-6 text-center border ${
              isDark ? 'bg-dark-800 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-center gap-2 text-brand-500 mb-2">
              <AlertTriangle size={20} />
              <span className="text-3xl font-bold">78%</span>
            </div>
            <p className={`text-sm ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
              Miss compliance deadlines
            </p>
          </div>
        </motion.div>

        {/* The Broken Pipeline */}
        <div className="relative">
          {/* Section label */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span
              className={`text-xs tracking-widest uppercase ${
                isDark ? 'text-slate-600' : 'text-slate-400'
              }`}
            >
              The Broken Game of Telephone
            </span>
          </motion.div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {problemSteps.map((step, idx) => (
              <motion.div
                key={step.step}
                custom={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                variants={fadeInUp}
                className="relative"
              >
                {/* Connector line (not on last item) */}
                {idx < problemSteps.length - 1 && (
                  <motion.div
                    custom={idx}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: { delay: idx * 0.15 + 0.4 },
                      },
                    }}
                    className={`hidden lg:block absolute top-1/2 -right-3 w-6 h-px z-10 ${
                      isDark ? 'bg-slate-700' : 'bg-slate-300'
                    }`}
                  >
                    <div
                      className={`absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t border-r rotate-45 ${
                        isDark ? 'border-slate-700' : 'border-slate-300'
                      }`}
                    ></div>
                  </motion.div>
                )}

                {/* Card */}
                <div
                  className={`
                  h-full rounded-xl border p-6 
                  transition-all duration-300 hover:-translate-y-1
                  ${
                    isDark
                      ? `bg-dark-800 ${idx === problemSteps.length - 1 ? 'border-red-500/30 hover:border-red-500/50' : 'border-slate-800 hover:border-slate-700'}`
                      : `bg-white ${idx === problemSteps.length - 1 ? 'border-red-300 hover:border-red-400' : 'border-slate-200 hover:border-slate-300'}`
                  }
                  ${isDark ? 'shadow-none hover:shadow-lg hover:shadow-black/20' : 'shadow-sm hover:shadow-md'}
                `}
                >
                  {/* Step number */}
                  <div
                    className={`
                    w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold mb-4
                    ${
                      idx === problemSteps.length - 1
                        ? 'bg-red-500/10 text-red-500'
                        : isDark
                          ? 'bg-dark-700 text-slate-500'
                          : 'bg-slate-100 text-slate-500'
                    }
                  `}
                  >
                    {step.step}
                  </div>

                  {/* Icon */}
                  <step.icon
                    size={24}
                    className={`mb-4 ${idx === problemSteps.length - 1 ? 'text-red-500' : isDark ? 'text-slate-500' : 'text-slate-400'}`}
                  />

                  {/* Role */}
                  <h3
                    className={`text-xl font-semibold mb-2 ${
                      isDark ? 'text-slate-100' : 'text-slate-900'
                    }`}
                  >
                    {step.role}
                  </h3>

                  {/* Description */}
                  <p
                    className={`text-sm leading-relaxed mb-4 ${
                      isDark ? 'text-slate-400' : 'text-slate-600'
                    }`}
                  >
                    {step.description}
                  </p>

                  {/* Time indicator */}
                  <div className="flex items-center gap-2 text-xs">
                    <Clock
                      size={12}
                      className={
                        idx === problemSteps.length - 1
                          ? 'text-red-500'
                          : isDark
                            ? 'text-slate-500'
                            : 'text-slate-400'
                      }
                    />
                    <span
                      className={
                        idx === problemSteps.length - 1
                          ? 'text-red-500'
                          : isDark
                            ? 'text-slate-500'
                            : 'text-slate-400'
                      }
                    >
                      {step.time}
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div
                    className={`mt-4 h-1 rounded-full overflow-hidden ${
                      isDark ? 'bg-dark-700' : 'bg-slate-200'
                    }`}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(step.step / problemSteps.length) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.15 + 0.5, duration: 0.6 }}
                      className={`h-full rounded-full ${
                        idx === problemSteps.length - 1
                          ? 'bg-red-500'
                          : isDark
                            ? 'bg-slate-600'
                            : 'bg-slate-300'
                      }`}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Total time */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="mt-12 text-center"
          >
            <div
              className={`inline-flex items-center gap-3 rounded-full px-6 py-3 ${
                isDark
                  ? 'bg-red-500/10 border border-red-500/20'
                  : 'bg-red-50 border border-red-200'
              }`}
            >
              <AlertTriangle size={18} className="text-red-500" />
              <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                Total time to compliance:{' '}
                <span className="text-red-500 font-semibold">10-20 weeks</span>
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
