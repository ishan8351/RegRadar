import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  Code,
  FileText,
  ArrowRight,
  Terminal,
  CheckCircle2,
  Presentation,
  Lock,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import FrameworkMarquee from './FrameworkMarquee';
import Team from './Team';

const HeroTerminal = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev < 3 ? prev + 1 : 0));
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-full min-h-[400px] bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col relative z-10">
      <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex items-center gap-2 z-20">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400"></div>
          <div className="w-3 h-3 rounded-full bg-amber-400"></div>
          <div className="w-3 h-3 rounded-full bg-green-400"></div>
        </div>
        <div className="mx-auto flex items-center gap-2 text-xs font-medium text-slate-500 font-mono">
          <Terminal size={14} /> RegRadar_Agent_v1.0
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        <div className="w-1/2 p-6 border-r border-slate-100 relative bg-slate-50 overflow-hidden">
          <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-4 relative z-20">
            Input: EU_AI_Act_Draft.pdf
          </h4>
          <div className="font-serif text-sm text-slate-400 leading-relaxed space-y-4 relative z-0">
            <p className={step >= 1 ? 'text-slate-800 transition-colors duration-500' : ''}>
              "Article 15: High-risk AI systems must ensure data is{' '}
              <span className={step >= 1 ? 'bg-blue-100 text-blue-800 px-1 rounded' : ''}>
                pseudonymized at rest
              </span>{' '}
              and access is strictly governed by{' '}
              <span className={step >= 1 ? 'bg-blue-100 text-blue-800 px-1 rounded' : ''}>
                multi-factor authentication (MFA)
              </span>
              ."
            </p>
            <p className="opacity-50 blur-[1px]">
              Furthermore, entities shall maintain logs of all automated infrastructure changes to
              satisfy audit requirements under section 4.2.1.
            </p>
            <p className="opacity-40 blur-[2px]">
              Failure to comply will result in administrative fines of up to 30,000,000 EUR or 6% of
              total worldwide annual turnover.
            </p>
          </div>

          <motion.div
            initial={{ top: '-10%', opacity: 0 }}
            animate={{
              top: step === 0 ? '-10%' : step === 1 ? '80%' : '120%',
              opacity: step === 1 ? 1 : 0,
            }}
            transition={{ duration: 1.8, ease: 'linear' }}
            className="absolute left-0 w-full h-16 bg-gradient-to-b from-transparent via-cyan-500/10 to-cyan-400/30 border-b-2 border-cyan-400 z-10 pointer-events-none"
            style={{
              boxShadow: '0 8px 20px rgba(34, 211, 238, 0.4)',
              backdropFilter: 'blur(1.5px)',
            }}
          />
        </div>

        <div className="w-1/2 p-6 bg-slate-900 text-slate-300 font-mono text-xs relative z-20">
          <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-2">
            Output: policy_schema.json
            {step >= 2 && <CheckCircle2 size={12} className="text-emerald-400" />}
          </h4>

          <AnimatePresence>
            {step >= 2 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-1"
              >
                <div>
                  <span className="text-pink-400">{'{'}</span>
                </div>
                <div className="pl-4">
                  <span className="text-blue-300">"mandate_id"</span>:{' '}
                  <span className="text-emerald-300">"EU-AI-ART15"</span>,
                </div>
                <div className="pl-4">
                  <span className="text-blue-300">"technical_requirements"</span>:{' '}
                  <span className="text-pink-400">{'{'}</span>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="pl-8"
                >
                  <span className="text-blue-300">"pii_encryption_at_rest"</span>:{' '}
                  <span className="text-amber-300">true</span>,
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="pl-8"
                >
                  <span className="text-blue-300">"requires_mfa"</span>:{' '}
                  <span className="text-amber-300">true</span>
                </motion.div>

                <div className="pl-4">
                  <span className="text-pink-400">{'}'}</span>,
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="pl-4"
                >
                  <span className="text-blue-300">"confidence_score"</span>:{' '}
                  <span className="text-emerald-300">0.98</span>
                </motion.div>
                <div>
                  <span className="text-pink-400">{'}'}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const fadeIn = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden relative selection:bg-blue-200 selection:text-blue-900">
      <div className="absolute inset-0 z-0 h-full w-full bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <main className="max-w-7xl mx-auto px-6 pt-12 lg:pt-20 pb-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[60vh]">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-left z-20"
          >
            <motion.h1
              variants={fadeIn}
              className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-slate-900 leading-[1.05]"
            >
              Stop Translating. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Start Complying.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeIn}
              className="text-lg md:text-xl text-slate-600 mb-8 max-w-xl text-balance leading-relaxed font-medium"
            >
              RegRadar bridges the gap between regulatory frameworks and Infrastructure-as-Code,
              converting legal mandates into actionable, deterministic pull requests.
            </motion.p>

            <motion.div variants={fadeIn} className="flex flex-wrap gap-4">
              <Link
                to="/architecture"
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-all hover:shadow-lg hover:shadow-blue-600/20"
              >
                See Architecture & Demo <ArrowRight size={18} />
              </Link>
              <a
                href="/pitch.pptx"
                download
                className="flex items-center gap-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 px-8 py-4 rounded-lg font-semibold transition-all shadow-sm"
              >
                <Presentation size={18} /> View Pitch Deck
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="relative z-10 hidden md:flex w-full h-[400px] lg:h-[450px]"
          >
            <HeroTerminal />
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
          className="mt-32 mb-32 max-w-5xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 tracking-tight">
              The Compliance Translation Gap
            </h2>
            <p className="text-slate-600 text-lg font-medium">
              Why the current pipeline is failing engineering teams.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              variants={fadeIn}
              className="bg-white border border-slate-200 rounded-2xl p-8 relative overflow-hidden shadow-sm"
            >
              <div className="absolute top-0 left-0 w-1.5 h-full bg-slate-200"></div>
              <h3 className="text-xl font-bold text-slate-800 mb-8 flex items-center gap-3">
                <div className="bg-slate-100 text-slate-500 p-2 rounded-lg">
                  <span className="text-sm font-bold px-1">✕</span>
                </div>
                The Old Pipeline
              </h3>
              <ul className="space-y-8 relative border-l-2 border-slate-100 ml-5 pl-8 text-slate-600 font-medium">
                <li className="relative">
                  <span className="absolute -left-[39px] top-1.5 h-3.5 w-3.5 rounded-full bg-slate-200 border-2 border-white"></span>
                  Manual review of extensive legal documentation
                </li>
                <li className="relative">
                  <span className="absolute -left-[39px] top-1.5 h-3.5 w-3.5 rounded-full bg-slate-300 border-2 border-white"></span>
                  Consultants map legal concepts to technical requirements
                </li>
                <li className="relative">
                  <span className="absolute -left-[39px] top-1.5 h-3.5 w-3.5 rounded-full bg-slate-400 border-2 border-white"></span>
                  Creation of unprioritized engineering backlogs
                </li>
                <li className="relative text-red-600">
                  <span className="absolute -left-[39px] top-1.5 h-3.5 w-3.5 rounded-full bg-red-500 border-2 border-white"></span>
                  Manual developer remediation of legacy infrastructure
                </li>
              </ul>
            </motion.div>

            <motion.div
              variants={fadeIn}
              className="bg-white border border-blue-200 rounded-2xl p-8 relative overflow-hidden shadow-lg shadow-blue-900/5"
            >
              <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-600"></div>
              <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                <div className="bg-blue-50 text-blue-600 p-2 rounded-lg">
                  <CheckCircle2 size={20} />
                </div>
                The RegRadar Pipeline
              </h3>
              <ul className="space-y-8 relative border-l-2 border-blue-50 ml-5 pl-8 text-slate-700 font-medium">
                <li className="relative">
                  <span className="absolute -left-[39px] top-1.5 h-3.5 w-3.5 rounded-full bg-blue-200 border-2 border-white"></span>
                  Automated ingestion of regulatory documentation
                </li>
                <li className="relative">
                  <span className="absolute -left-[39px] top-1.5 h-3.5 w-3.5 rounded-full bg-blue-400 border-2 border-white"></span>
                  Extraction of technical mandates via LLM
                </li>
                <li className="relative">
                  <span className="absolute -left-[39px] top-1.5 h-3.5 w-3.5 rounded-full bg-blue-500 border-2 border-white"></span>
                  Deterministic scanning of Infrastructure-as-Code
                </li>
                <li className="relative text-blue-700 font-bold">
                  <span className="absolute -left-[39px] top-1.5 h-3.5 w-3.5 rounded-full bg-indigo-600 border-2 border-white ring-4 ring-indigo-50"></span>
                  Automated generation of configuration pull requests
                </li>
              </ul>
            </motion.div>
          </div>
        </motion.div>

        <FrameworkMarquee />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 gap-6 mt-32"
        >
          {[
            {
              icon: <FileText className="text-blue-600" size={28} />,
              title: 'Legal Ingestion (Bedrock)',
              desc: 'Upload dense regulatory PDFs. Using large context window LLMs, the agent digests the document and extracts a strictly structured JSON schema of technical requirements.',
            },
            {
              icon: <Code className="text-indigo-600" size={28} />,
              title: 'IaC Cross-Referencing',
              desc: 'Specifically targets modern deployment states like Terraform and K8s manifests to map out the exact "blast radius" without the false positives of scanning monolithic application code.',
            },
            {
              icon: <Shield className="text-emerald-500" size={28} />,
              title: 'Clear Liability Boundaries',
              desc: 'Features a Human-in-the-Loop approval stage. Compliance teams review and approve AI-generated mandates before code is scanned, keeping legal liability squarely where it belongs.',
            },
            {
              icon: <Lock className="text-slate-700" size={28} />,
              title: 'Zero-Trust VPC Deployment',
              desc: 'Designed for strict Infosec requirements. RegRadar is deployed within your AWS VPC. Your codebase and infrastructure state never leave your environment.',
            },
          ].map((feature, idx) => (
            <motion.div key={idx} variants={fadeIn}>
              <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm transition-all duration-300 hover:shadow-md hover:border-blue-200 hover:-translate-y-2 group h-full cursor-default">
                <div className="mb-6 bg-slate-50 w-14 h-14 rounded-xl flex items-center justify-center group-hover:bg-blue-50 transition-colors duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold mb-3 text-slate-900">{feature.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed font-medium">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <Team />
      </main>
    </div>
  );
}
