import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { TrendingDown, Clock, Zap, Shield, ArrowRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

function Counter({ from, to, duration, suffix = '', prefix = '', decimals = 0 }) {
  const [count, setCount] = useState(from);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        // Easing function for smooth animation
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentValue = easeOut * (to - from) + from;
        setCount(decimals > 0 ? currentValue.toFixed(decimals) : Math.floor(currentValue));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [isInView, from, to, duration, decimals]);

  return (
    <span ref={ref}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

export default function Impact() {
  const { isDark } = useTheme();

  const metrics = [
    {
      icon: Shield,
      value: { from: 100, to: 0, suffix: '%' },
      label: 'AI Liability',
      description: 'Human-in-the-Loop ensures zero autonomous decisions',
      highlight: false,
    },
    {
      icon: Clock,
      value: null, // Special display
      label: 'Time-to-Compliance',
      description: 'From PDF ingestion to merged PR',
      highlight: true,
    },
    {
      icon: Zap,
      value: { from: 0, to: 100, suffix: '%' },
      label: 'Automated Fixes',
      description: 'Config-only PRs ready for immediate review',
      highlight: false,
    },
  ];

  return (
    <section className={`py-32 relative overflow-hidden ${isDark ? 'bg-dark-800' : 'bg-slate-50'}`}>
      {/* Background gradient */}
      <div
        className={`absolute inset-0 ${isDark ? 'bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900' : 'bg-gradient-to-b from-white via-slate-50 to-white'}`}
      />

      {/* Subtle radial glow */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] ${isDark ? 'bg-brand-500/5' : 'bg-brand-500/10'} blur-[120px] rounded-full`}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-brand-500 text-sm font-mono tracking-wider uppercase mb-4 block">
            The Impact
          </span>
          <h2
            className={`text-4xl md:text-5xl font-bold mb-4 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}
          >
            Measurable Results
          </h2>
          <p
            className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}
          >
            RegRadar transforms compliance from a months-long burden into an automated workflow.
          </p>
        </motion.div>

        {/* Metrics grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {metrics.map((metric, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`relative p-8 rounded-2xl border transition-all duration-300 group ${
                metric.highlight
                  ? isDark
                    ? 'bg-gradient-to-b from-brand-600/10 to-dark-800 border-brand-500/30 hover:border-brand-500/50'
                    : 'bg-gradient-to-b from-brand-500/10 to-white border-brand-500/30 hover:border-brand-500/50 shadow-lg'
                  : isDark
                    ? 'bg-dark-800/50 border-slate-800 hover:border-slate-700'
                    : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
              }`}
            >
              {metric.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-brand-600 text-white text-xs font-bold rounded-full uppercase tracking-wider">
                  Core Metric
                </div>
              )}

              {/* Icon */}
              <div
                className={`inline-flex p-3 rounded-xl mb-6 ${
                  metric.highlight ? 'bg-brand-500/20' : isDark ? 'bg-slate-800' : 'bg-slate-100'
                }`}
              >
                <metric.icon
                  className={`w-6 h-6 ${metric.highlight ? 'text-brand-400' : isDark ? 'text-slate-400' : 'text-slate-500'}`}
                />
              </div>

              {/* Value */}
              <div className="mb-4">
                {metric.value ? (
                  <div
                    className={`text-5xl font-bold tracking-tight ${
                      metric.highlight
                        ? isDark
                          ? 'text-white'
                          : 'text-slate-900'
                        : isDark
                          ? 'text-slate-100'
                          : 'text-slate-900'
                    }`}
                  >
                    <Counter
                      from={metric.value.from}
                      to={metric.value.to}
                      duration={2000}
                      suffix={metric.value.suffix}
                    />
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-2xl line-through font-medium ${isDark ? 'text-slate-500' : 'text-slate-400'}`}
                    >
                      Months
                    </span>
                    <ArrowRight
                      className={`w-5 h-5 ${isDark ? 'text-slate-600' : 'text-slate-400'}`}
                    />
                    <span className="text-3xl font-bold text-brand-400">Minutes</span>
                  </div>
                )}
              </div>

              {/* Label */}
              <h3
                className={`text-lg font-semibold mb-2 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}
              >
                {metric.label}
              </h3>

              {/* Description */}
              <p className={`text-sm ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                {metric.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
