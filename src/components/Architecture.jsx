import React from 'react';
import { motion } from 'framer-motion';
import { Cloud, Database, Cpu, Radio, Shield, GitBranch, ArrowRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Architecture() {
  const { isDark } = useTheme();

  // Component has id="architecture" on section for scroll navigation

  const techStack = [
    {
      name: 'Amazon Bedrock',
      desc: 'LLM Ingestion',
      icon: Cpu,
      category: 'AI/ML',
    },
    {
      name: 'Amazon S3',
      desc: 'Secure Storage',
      icon: Database,
      category: 'Storage',
    },
    {
      name: 'AWS Lambda',
      desc: 'Serverless Compute',
      icon: Cloud,
      category: 'Compute',
    },
    {
      name: 'EventBridge',
      desc: 'Event Orchestration',
      icon: Radio,
      category: 'Events',
    },
    {
      name: 'Amazon VPC',
      desc: 'Zero-Trust Network',
      icon: Shield,
      category: 'Security',
    },
    {
      name: 'GitHub API',
      desc: 'PR Automation',
      icon: GitBranch,
      category: 'Integration',
    },
  ];

  const flowSteps = [
    { label: 'PDF Upload' },
    { label: 'LLM Processing', highlight: true },
    { label: 'IaC Scan', highlight: true },
    { label: 'PR Generation' },
  ];

  return (
    <section
      id="architecture"
      className={`py-32 relative overflow-hidden ${isDark ? 'bg-dark-900' : 'bg-white'}`}
    >
      {/* Grid background */}
      <div
        className={`absolute inset-0 bg-[linear-gradient(var(--grid-color)_1px,transparent_1px),linear-gradient(90deg,var(--grid-color)_1px,transparent_1px)] bg-[size:48px_48px]`}
        style={{ '--grid-color': isDark ? 'rgba(255,255,255,0.015)' : 'rgba(0,0,0,0.02)' }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-brand-500 text-sm font-mono tracking-wider uppercase mb-4 block">
            Architecture
          </span>
          <h2
            className={`text-4xl md:text-5xl font-bold mb-4 ${
              isDark ? 'text-slate-100' : 'text-slate-900'
            }`}
          >
            Built on AWS
          </h2>
          <p
            className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}
          >
            Enterprise-grade security with serverless scalability. Native AWS services for
            compliance-ready infrastructure.
          </p>
        </motion.div>

        {/* Data flow visualization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center justify-center gap-2 md:gap-4 flex-wrap">
            {flowSteps.map((step, idx) => (
              <React.Fragment key={idx}>
                <div
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                    step.highlight
                      ? 'bg-brand-600 text-white'
                      : isDark
                        ? 'bg-slate-800 text-slate-300'
                        : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {step.label}
                </div>
                {idx < flowSteps.length - 1 && (
                  <ArrowRight
                    className={`w-4 h-4 hidden md:block ${
                      isDark ? 'text-slate-600' : 'text-slate-400'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </motion.div>

        {/* Tech stack grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {techStack.map((node, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              whileHover={{ y: -4 }}
              className={`group p-6 rounded-xl border transition-all duration-300 cursor-default ${
                isDark
                  ? 'bg-dark-800/50 border-slate-800 hover:border-slate-700'
                  : 'bg-slate-50 border-slate-200 hover:border-slate-300 hover:shadow-md'
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div
                  className={`p-3 rounded-lg transition-colors ${
                    isDark
                      ? 'bg-slate-800 group-hover:bg-slate-700'
                      : 'bg-slate-200 group-hover:bg-slate-300'
                  }`}
                >
                  <node.icon
                    className={`w-5 h-5 group-hover:text-brand-500 transition-colors ${
                      isDark ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3
                      className={`font-semibold transition-colors ${
                        isDark
                          ? 'text-slate-200 group-hover:text-white'
                          : 'text-slate-900 group-hover:text-slate-800'
                      }`}
                    >
                      {node.name}
                    </h3>
                    <span
                      className={`text-xs uppercase tracking-wider ${
                        isDark ? 'text-slate-600' : 'text-slate-400'
                      }`}
                    >
                      {node.category}
                    </span>
                  </div>
                  <p className={`text-sm ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                    {node.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Security badge */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 flex justify-center"
        >
          <div
            className={`inline-flex items-center gap-3 px-6 py-3 rounded-full border ${
              isDark ? 'bg-dark-800/50 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <Shield className="w-4 h-4 text-green-500" />
            <span className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              SOC 2 Type II Compliant Infrastructure
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
