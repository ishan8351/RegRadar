import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Scan, GitPullRequest, CheckCircle2, ArrowRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Workflow() {
  const { isDark } = useTheme();

  const steps = [
    {
      phase: 'Phase 1',
      title: 'Legal Ingestion & HITL',
      description:
        'LLM digests dense regulatory PDFs into a structured JSON schema of rules with Confidence Scores. Compliance teams approve them to establish Zero AI Liability.',
      icon: FileText,
      details: ['PDF → Structured JSON', 'Confidence scoring', 'Human approval gate'],
      output: 'Approved Rule Set',
    },
    {
      phase: 'Phase 2',
      title: 'Cloud & IaC Scanner',
      description:
        'Targets deterministic modern states (Terraform, K8s manifests) to avoid legacy monolithic false positives.',
      icon: Scan,
      details: ['Terraform state analysis', 'K8s manifest scanning', 'Policy matching'],
      output: 'Violation Report',
    },
    {
      phase: 'Phase 3',
      title: 'Blast Radius & Auto-PRs',
      description:
        'Maps failing resources to specific legal articles and generates Config-Only Pull Requests in GitHub automatically.',
      icon: GitPullRequest,
      details: ['Impact analysis', 'Auto-remediation', 'PR generation'],
      output: 'Merged Compliance PR',
    },
  ];

  return (
    <section
      id="workflow"
      className={`py-32 relative overflow-hidden ${isDark ? 'bg-dark-900' : 'bg-white'}`}
    >
      {/* Subtle grid background */}
      <div
        className={`absolute inset-0 bg-[linear-gradient(var(--grid-color)_1px,transparent_1px),linear-gradient(90deg,var(--grid-color)_1px,transparent_1px)] bg-[size:64px_64px]`}
        style={{ '--grid-color': isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.03)' }}
      />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-brand-500 text-sm font-mono tracking-wider uppercase mb-4 block">
            How It Works
          </span>
          <h2
            className={`text-4xl md:text-5xl font-bold mb-4 ${
              isDark ? 'text-slate-100' : 'text-slate-900'
            }`}
          >
            Three Phases to Compliance
          </h2>
          <p
            className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}
          >
            From legal PDF to merged pull request in minutes, not months.
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical connecting line */}
          <div
            className={`absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent to-transparent md:-translate-x-1/2 ${
              isDark ? 'via-slate-700' : 'via-slate-300'
            }`}
          />

          <div className="space-y-16 md:space-y-24">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`relative flex flex-col md:flex-row gap-8 md:gap-16 items-start ${
                  idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline node */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-20">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', delay: idx * 0.15 + 0.2 }}
                    className="relative"
                  >
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-brand-500 rounded-full blur-md opacity-30" />

                    {/* Node circle */}
                    <div
                      className={`relative w-16 h-16 rounded-full border-2 flex items-center justify-center group hover:border-brand-500 transition-colors duration-300 ${
                        isDark ? 'bg-dark-800 border-slate-700' : 'bg-white border-slate-300'
                      }`}
                    >
                      <step.icon
                        className={`w-6 h-6 group-hover:text-brand-500 transition-colors ${
                          isDark ? 'text-slate-400' : 'text-slate-500'
                        }`}
                      />

                      {/* Phase number badge */}
                      <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-brand-600 text-white text-xs font-bold flex items-center justify-center">
                        {idx + 1}
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Content card */}
                <div
                  className={`ml-24 md:ml-0 md:w-[calc(50%-4rem)] ${idx % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}
                >
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                    className={`p-6 md:p-8 backdrop-blur-sm rounded-2xl border transition-all duration-300 group ${
                      isDark
                        ? 'bg-dark-800/50 border-slate-800 hover:border-slate-700'
                        : 'bg-slate-50/80 border-slate-200 hover:border-slate-300 hover:shadow-lg'
                    }`}
                  >
                    {/* Phase label */}
                    <span className="text-brand-500 text-xs font-mono tracking-wider uppercase mb-3 block">
                      {step.phase}
                    </span>

                    {/* Title */}
                    <h3
                      className={`text-xl md:text-2xl font-bold mb-3 transition-colors ${
                        isDark
                          ? 'text-slate-100 group-hover:text-white'
                          : 'text-slate-900 group-hover:text-slate-800'
                      }`}
                    >
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p
                      className={`mb-6 leading-relaxed ${
                        isDark ? 'text-slate-400' : 'text-slate-600'
                      }`}
                    >
                      {step.description}
                    </p>

                    {/* Details list */}
                    <div className="space-y-2 mb-6">
                      {step.details.map((detail, dIdx) => (
                        <div key={dIdx} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-brand-500 shrink-0" />
                          <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                            {detail}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Output indicator */}
                    <div
                      className={`flex items-center gap-2 pt-4 border-t ${
                        isDark ? 'border-slate-800' : 'border-slate-200'
                      }`}
                    >
                      <ArrowRight
                        className={`w-4 h-4 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}
                      />
                      <span className={`text-sm ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                        Output:
                      </span>
                      <span className="text-sm font-mono text-brand-500">{step.output}</span>
                    </div>
                  </motion.div>
                </div>

                {/* Empty space for alternating layout */}
                <div className="hidden md:block md:w-[calc(50%-4rem)]" />
              </motion.div>
            ))}
          </div>

          {/* Final success indicator */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mt-16 flex justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl" />
              <div
                className={`relative flex items-center gap-3 px-6 py-3 border border-green-500/30 rounded-full ${
                  isDark ? 'bg-dark-800' : 'bg-white'
                }`}
              >
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span className="text-green-500 font-medium">Compliance Achieved</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
