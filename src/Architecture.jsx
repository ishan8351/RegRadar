import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Database,
  GitPullRequest,
  BrainCircuit,
  CheckCircle,
  FileText,
  Shield,
  Server,
  Cloud,
} from 'lucide-react';
import TechDemo from './TechDemo';

const ConnectorBeam = ({ delay = 0 }) => (
  <div className="hidden md:flex flex-1 h-[2px] relative items-center mx-2 z-0 min-w-[30px]">
    <div className="w-full h-[1px] border-t-2 border-slate-200 border-dashed" />
    <motion.div
      initial={{ left: '0%', opacity: 0 }}
      animate={{ left: '100%', opacity: [0, 1, 1, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay }}
      className="absolute h-[2px] w-16 bg-gradient-to-r from-transparent via-blue-400 to-transparent -translate-y-1/2 top-1/2 z-10"
    />
  </div>
);

const ArchNode = ({ icon, title, subtitle, isCore = false }) => {
  return (
    <div className="relative z-20 flex flex-col items-center group transition-all duration-300 w-24 md:w-32 shrink-0">
      <div className="relative">
        {isCore && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] pointer-events-none flex items-center justify-center z-0">
            <motion.svg
              animate={{ rotate: 360 }}
              transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
              className="absolute w-full h-full text-slate-200"
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                r="49"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                strokeDasharray="2 4"
              />
            </motion.svg>

            <motion.svg
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              className="absolute w-[85%] h-[85%] text-blue-200"
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                r="48"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="8 4 2 4"
              />
            </motion.svg>

            <motion.svg
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
              className="absolute w-[70%] h-[70%] text-indigo-100"
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                r="48"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeDasharray="1 6"
                strokeLinecap="round"
              />
            </motion.svg>
          </div>
        )}

        <div
          className={`w-16 h-16 md:w-20 md:h-20 bg-white border rounded-2xl flex items-center justify-center mb-4 relative z-10 transition-all duration-300 shadow-sm
            ${
              isCore
                ? 'border-blue-300 text-blue-600 bg-gradient-to-br from-white to-blue-50/50 group-hover:border-blue-400 group-hover:shadow-md'
                : 'border-slate-200 text-slate-600 group-hover:border-slate-300 group-hover:shadow-md group-hover:text-slate-900 group-hover:-translate-y-1'
            }
          `}
        >
          <div className="relative z-10">{icon}</div>
        </div>
      </div>
      <h4
        className={`text-sm font-bold text-center ${isCore ? 'text-blue-700' : 'text-slate-800'}`}
      >
        {title}
      </h4>
      <p className="text-[10px] md:text-[11px] font-medium text-slate-500 text-center mt-1 uppercase tracking-wider">
        {subtitle}
      </p>
    </div>
  );
};

export default function Architecture() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start center', 'end center'],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden relative pt-32 pb-20 px-6 selection:bg-blue-200 selection:text-blue-900">
      {/* Unified Enterprise Background */}
      <div className="absolute inset-0 z-0 h-full w-full bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 mb-12 transition-colors font-semibold text-sm bg-white border border-slate-200 px-4 py-2 rounded-lg shadow-sm hover:shadow-md"
        >
          <ArrowLeft size={16} /> Back to Overview
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full border border-slate-200 bg-white text-xs font-bold text-slate-600 uppercase tracking-widest shadow-sm">
            System Topology
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-slate-900 tracking-tight">
            Core Architecture
          </h1>
          <p className="text-lg text-slate-600 mb-16 max-w-2xl leading-relaxed font-medium">
            How RegRadar converts ambiguous legal text into deterministic cloud infrastructure
            updates using a Zero-Trust architecture.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-24 bg-white border border-slate-200 rounded-2xl p-8 md:p-12 shadow-sm relative overflow-hidden"
        >
          <div className="relative flex flex-wrap md:flex-nowrap justify-center md:justify-between items-start md:items-start gap-y-12 md:gap-y-0 w-full">
            <ArchNode icon={<FileText size={28} />} title="Legal Source" subtitle="PDF/Text" />
            <ConnectorBeam delay={0} />
            <ArchNode
              icon={<BrainCircuit size={28} />}
              title="Amazon Bedrock"
              subtitle="JSON Schema"
            />
            <ConnectorBeam delay={0.5} />
            <ArchNode
              icon={<Shield size={32} />}
              title="RegRadar Core"
              subtitle="Policy Engine"
              isCore={true}
            />
            <ConnectorBeam delay={1.0} />
            <ArchNode icon={<Server size={28} />} title="IaC State" subtitle="Terraform/K8s" />
            <ConnectorBeam delay={1.5} />
            <ArchNode icon={<GitPullRequest size={28} />} title="GitHub" subtitle="Config PR" />
          </div>
        </motion.div>

        <div className="mb-32">
          <TechDemo />
        </div>

        <div className="relative pb-20 max-w-4xl mx-auto" ref={timelineRef}>
          <div className="absolute left-[27px] md:left-[35px] top-6 bottom-0 w-[2px] bg-slate-200" />

          <motion.div
            className="absolute left-[27px] md:left-[35px] top-6 bottom-0 w-[2px] bg-blue-600 origin-top z-0 shadow-[0_0_8px_rgba(37,99,235,0.8)]"
            style={{ scaleY }}
          />

          <div className="space-y-20 relative z-10">
            {[
              {
                step: '01',
                title: 'Legal Brain & Validation',
                icon: <BrainCircuit size={20} />,
                detail:
                  'Amazon Bedrock parses the legal text into a strictly typed JSON schema. Compliance teams review confidence scores via a Human-in-the-Loop interface to eliminate AI hallucination liability before any code is scanned.',
              },
              {
                step: '02',
                title: 'Infrastructure Scanner',
                icon: <Database size={20} />,
                detail:
                  'A read-only scanner connects to your repositories, isolating deterministic state files (Terraform .tf, Kubernetes YAML) to completely avoid the noise and false positives of legacy application code.',
              },
              {
                step: '03',
                title: 'Impact Analysis & Mapping',
                icon: <CheckCircle size={20} />,
                detail:
                  'The engine cross-references the approved JSON ruleset against the IaC state, visually mapping failing resources and linking them directly back to the specific legal article that triggered the violation.',
              },
              {
                step: '04',
                title: 'Config-Only PR Generation',
                icon: <GitPullRequest size={20} />,
                detail:
                  'RegRadar autonomously drafts a robust GitHub Pull Request (e.g., adding a `kms_key_id` to an unencrypted S3 bucket). It never touches complex application logic, ensuring safe, easy reviews for DevSecOps.',
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5 }}
                className="flex gap-8 md:gap-12 items-start group"
              >
                <div className="w-14 h-14 md:w-18 md:h-18 rounded-xl bg-white border-2 border-slate-200 shadow-sm flex items-center justify-center text-slate-400 group-hover:text-blue-600 group-hover:border-blue-400 group-hover:bg-blue-50 transition-all duration-300 shrink-0 relative z-10">
                  <div className="absolute -left-[24px] md:-left-[28px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-4 border-white bg-slate-300 group-hover:bg-blue-600 group-hover:scale-125 transition-all duration-300 shadow-sm" />
                  {item.icon}
                </div>

                <div className="pt-1 md:pt-2">
                  <div className="text-xs font-bold text-blue-600 mb-2 tracking-widest uppercase">
                    Phase {item.step}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 text-slate-900 group-hover:text-blue-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-base leading-relaxed max-w-2xl font-medium">
                    {item.detail}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 bg-slate-900 rounded-2xl p-8 md:p-12 text-white shadow-xl max-w-5xl mx-auto"
        >
          <div className="flex items-center gap-3 mb-8">
            <Cloud className="text-blue-400" size={32} />
            <h3 className="text-2xl font-bold">AWS Service Integration</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-bold text-blue-300 mb-2 border-b border-slate-700 pb-2">
                Amazon Bedrock
              </h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                Powers the "Legal Brain." We leverage high-context LLMs via Bedrock to parse dense
                legal PDFs securely, ensuring sensitive compliance data is not sent to public OpenAI
                endpoints.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-blue-300 mb-2 border-b border-slate-700 pb-2">
                Amazon VPC
              </h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                Enables our Zero-Trust architecture. The entire RegRadar agent operates inside the
                client's VPC, ensuring proprietary IaC code never traverses the public internet.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-blue-300 mb-2 border-b border-slate-700 pb-2">
                AWS KMS & IAM
              </h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                Targeted by our Remediation Engine. RegRadar specifically writes configuration PRs
                that enforce KMS encryption-at-rest and strict IAM role boundary conditions.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
