import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileJson, GitPullRequest, ShieldCheck, Play, Loader2, CheckCircle2 } from 'lucide-react';

const scenarios = [
  {
    framework: 'DORA',
    article: 'Article 9.2 - ICT Risk Management',
    requirement: 'Encryption at Rest',
    targetResource: 'aws_s3_bucket',
    confidence: '0.98',
    fileName: 'main.tf',
    additions: 7,
    oldCode: ['resource "aws_s3_bucket" "user_data" {', '  bucket = "regradar-user-data-prod"'],
    newCode: [
      '+ server_side_encryption_configuration {',
      '+   rule {',
      '+     apply_server_side_encryption_by_default {',
      '+       sse_algorithm = "aws:kms"',
      '+     }',
      '+   }',
      '+ }',
    ],
  },
  {
    framework: 'EU AI Act',
    article: 'Title III - High-Risk Data',
    requirement: 'Strict Storage Encryption',
    targetResource: 'aws_db_instance',
    confidence: '0.95',
    fileName: 'database.tf',
    additions: 2,
    oldCode: [
      'resource "aws_db_instance" "ai_training_db" {',
      '  engine         = "postgres"',
      '  instance_class = "db.r5.large"',
    ],
    newCode: ['+ storage_encrypted = true', '+ kms_key_id        = aws_kms_key.db_key.arn'],
  },
  {
    framework: 'SEC Cyber Rules',
    article: 'Item 1.05 - Incident Disclosure',
    requirement: 'Immutable Audit Logging',
    targetResource: 'aws_cloudtrail',
    confidence: '0.99',
    fileName: 'security.tf',
    additions: 3,
    oldCode: [
      'resource "aws_cloudtrail" "org_trail" {',
      '  name           = "enterprise-audit-trail"',
      '  s3_bucket_name = aws_s3_bucket.audit.id',
    ],
    newCode: [
      '+ enable_log_file_validation    = true',
      '+ is_multi_region_trail         = true',
      '+ kms_key_id                    = aws_kms_key.trail_key.arn',
    ],
  },
];

export default function TechDemo() {
  const [status, setStatus] = useState('idle');
  const [activeScenario, setActiveScenario] = useState(scenarios[0]);

  const runScan = () => {
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * scenarios.length);
    } while (scenarios[nextIndex].framework === activeScenario.framework);

    setActiveScenario(scenarios[nextIndex]);
    setStatus('extracting');

    setTimeout(() => setStatus('mapping'), 2000);
    setTimeout(() => setStatus('complete'), 4800);
  };

  const diffContainerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };
  const diffLineVariants = {
    hidden: { opacity: 0, x: -10 },
    show: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 100 } },
  };

  const jsonContainerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
  };
  const jsonTypewriterVariants = {
    hidden: { opacity: 0, clipPath: 'inset(0 100% 0 0)' },
    show: {
      opacity: 1,
      clipPath: 'inset(0 0% 0 0)',
      transition: { duration: 0.4, ease: 'linear' },
    },
  };

  const DiffLine = ({ type, oldLineNum, newLineNum, content }) => {
    const isAddition = type === 'add';
    return (
      <motion.div
        variants={diffLineVariants}
        className={`flex text-[13px] leading-[22px] font-mono w-full ${
          isAddition
            ? 'bg-[#e6ffec] text-[#055030]'
            : 'bg-white text-slate-700 hover:bg-slate-50 transition-colors'
        }`}
      >
        <div
          className={`w-10 md:w-12 shrink-0 border-r border-slate-200 text-right pr-2 md:pr-3 select-none py-[1px] ${
            isAddition ? 'bg-[#e6ffec] text-slate-400/50' : 'bg-slate-50 text-slate-400'
          }`}
        >
          {oldLineNum || '\u00A0'}
        </div>
        <div
          className={`w-10 md:w-12 shrink-0 border-r border-slate-200 text-right pr-2 md:pr-3 select-none py-[1px] ${
            isAddition ? 'bg-[#ccffd8] text-slate-600 cursor-pointer' : 'bg-slate-50 text-slate-400'
          }`}
        >
          {newLineNum || '\u00A0'}
        </div>
        <div className="pl-4 py-[1px] whitespace-pre-wrap break-words flex-grow tracking-tight">
          {!isAddition && content.includes('resource') ? (
            <>
              <span className="text-[#cf222e] font-medium">resource</span>{' '}
              {content.replace('resource ', '')}
            </>
          ) : (
            content
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      className="mt-24 mb-16 relative bg-white border border-slate-200 rounded-2xl p-6 lg:p-8 overflow-hidden shadow-xl w-full"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-50 blur-[100px] rounded-full pointer-events-none" />

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4 relative z-10">
        <div>
          <h3 className="text-2xl font-bold flex items-center gap-3 text-slate-900">
            <ShieldCheck className="text-blue-600" /> Live Engine Simulation
          </h3>
          <p className="text-slate-500 text-sm mt-1 font-medium">
            Target: <span className="text-blue-600 font-bold">{activeScenario.framework}</span> vs.
            AWS Infrastructure
          </p>
        </div>

        <button
          onClick={runScan}
          disabled={status !== 'idle' && status !== 'complete'}
          className={`relative group flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all overflow-hidden shadow-sm shrink-0 ${
            status === 'extracting' || status === 'mapping'
              ? 'bg-slate-50 text-slate-400 border border-slate-200 cursor-not-allowed'
              : status === 'complete'
                ? 'bg-white text-slate-800 hover:bg-slate-50 border border-slate-200 hover:shadow-md'
                : 'bg-blue-600 text-white hover:bg-blue-700 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(37,99,235,0.2)]'
          }`}
        >
          {status === 'idle' && (
            <>
              <Play size={18} fill="currentColor" /> Run Analysis
            </>
          )}
          {(status === 'extracting' || status === 'mapping') && (
            <>
              <Loader2 size={18} className="animate-spin" /> Analyzing...
            </>
          )}
          {status === 'complete' && (
            <>
              <Play size={18} /> Test Another Framework
            </>
          )}
        </button>
      </div>

      <div className="grid lg:grid-cols-[1fr_80px_1.2fr] gap-4 lg:gap-0 items-stretch min-h-[550px] relative z-10">
        <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden h-full flex flex-col relative shadow-inner">
          <div className="bg-slate-100 px-4 py-3 border-b border-slate-200 flex items-center justify-between text-sm text-slate-600 font-mono z-10">
            <div className="flex items-center gap-2 font-semibold shrink-0">
              <FileJson
                size={16}
                className={
                  status === 'complete' || status === 'mapping'
                    ? 'text-indigo-600'
                    : 'text-slate-400'
                }
              />
              extracted_rules.json
            </div>
            {status === 'extracting' && (
              <span className="text-xs text-blue-600 font-bold animate-pulse text-right">
                Reading PDF...
              </span>
            )}
            {status === 'mapping' && (
              <span className="text-xs text-indigo-600 font-bold animate-pulse text-right">
                Streaming Tokens...
              </span>
            )}
            {status === 'complete' && <CheckCircle2 size={16} className="text-blue-600 shrink-0" />}
          </div>

          <div className="p-5 overflow-hidden text-[13px] md:text-sm font-mono flex-grow relative whitespace-pre-wrap break-words">
            <AnimatePresence>
              {status === 'extracting' && (
                <motion.div
                  initial={{ top: '-100%' }}
                  animate={{ top: '200%' }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                  className="absolute left-0 right-0 h-32 bg-gradient-to-b from-transparent via-blue-200/50 to-transparent border-b border-blue-400 z-20 pointer-events-none"
                />
              )}
            </AnimatePresence>

            {status === 'idle' && (
              <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-medium">
                Awaiting document ingestion...
              </div>
            )}

            <AnimatePresence mode="wait">
              {(status === 'mapping' || status === 'complete') && (
                <motion.div
                  key={activeScenario.framework}
                  variants={jsonContainerVariants}
                  initial="hidden"
                  animate="show"
                  className="text-slate-700 relative"
                >
                  <motion.div variants={jsonTypewriterVariants} className="text-slate-400">
                    {'{'}
                  </motion.div>
                  <motion.div variants={jsonTypewriterVariants}>
                    {'  '}
                    <span className="text-blue-600 font-medium">"regulatory_framework"</span>:{' '}
                    <span className="text-emerald-600">"{activeScenario.framework}"</span>,
                  </motion.div>
                  <motion.div variants={jsonTypewriterVariants}>
                    {'  '}
                    <span className="text-blue-600 font-medium">"article"</span>:{' '}
                    <span className="text-emerald-600">"{activeScenario.article}"</span>,
                  </motion.div>
                  <motion.div variants={jsonTypewriterVariants}>
                    {'  '}
                    <span className="text-blue-600 font-medium">"mandates"</span>:{' '}
                    <span className="text-slate-400">{'['}</span>
                  </motion.div>
                  <motion.div variants={jsonTypewriterVariants} className="text-slate-400">
                    {'    {'}
                  </motion.div>
                  <motion.div variants={jsonTypewriterVariants}>
                    {'      '}
                    <span className="text-blue-600 font-medium">"requirement"</span>:{' '}
                    <span className="text-emerald-600">"{activeScenario.requirement}"</span>,
                  </motion.div>
                  <motion.div variants={jsonTypewriterVariants}>
                    {'      '}
                    <span className="text-blue-600 font-medium">"target_resources"</span>: [
                    <span className="text-emerald-600">"{activeScenario.targetResource}"</span>],
                  </motion.div>
                  <motion.div variants={jsonTypewriterVariants}>
                    {'      '}
                    <span className="text-blue-600 font-medium">"confidence_score"</span>:{' '}
                    <span className="text-amber-600">{activeScenario.confidence}</span>
                  </motion.div>
                  <motion.div variants={jsonTypewriterVariants} className="text-slate-400">
                    {'    }'}
                  </motion.div>
                  <motion.div variants={jsonTypewriterVariants} className="text-slate-400">
                    {']'}
                  </motion.div>
                  <motion.div
                    variants={jsonTypewriterVariants}
                    className="flex items-center gap-1 text-slate-400"
                  >
                    {'}'}

                    {status === 'mapping' && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                        className="w-2 h-4 bg-indigo-500 inline-block align-middle"
                      />
                    )}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="hidden lg:flex flex-col items-center justify-center relative">
          <svg width="80" height="24" viewBox="0 0 80 24" fill="none" className="absolute">
            <path d="M0 12L80 12" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="4 4" />
            <motion.path
              d="M0 12L80 12"
              stroke="#2563eb"
              strokeWidth="2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: status === 'mapping' || status === 'complete' ? 1 : 0,
                opacity: status === 'mapping' || status === 'complete' ? 1 : 0,
              }}
              transition={{ duration: 1, ease: 'easeInOut' }}
            />
          </svg>
          <AnimatePresence>
            {status === 'mapping' && (
              <motion.div
                initial={{ left: 0, opacity: 1 }}
                animate={{ left: '100%', opacity: 0 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="absolute w-2.5 h-2.5 rounded-full bg-blue-600 shadow-[0_0_12px_#2563eb]"
                style={{ top: 'calc(50% - 5px)' }}
              />
            )}
          </AnimatePresence>
        </div>

        <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden h-full flex flex-col relative shadow-inner">
          <div className="bg-slate-100 px-4 py-3 border-b border-slate-200 flex items-center justify-between text-sm font-mono z-10">
            <div className="flex items-center gap-2 font-semibold text-slate-700 shrink-0">
              <GitPullRequest
                size={16}
                className={status === 'complete' ? 'text-blue-600' : 'text-slate-400'}
              />
              {activeScenario.fileName}
            </div>
            {status === 'mapping' && (
              <span className="text-xs text-blue-600 font-bold animate-pulse text-right">
                Generating diff...
              </span>
            )}
            {status === 'complete' && (
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200 shrink-0">
                +{activeScenario.additions} additions
              </span>
            )}
          </div>

          <div className="p-0 overflow-hidden text-sm flex-grow relative bg-white">
            <AnimatePresence>
              {status === 'mapping' && (
                <motion.div
                  initial={{ top: '-100%' }}
                  animate={{ top: '200%' }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                  className="absolute left-0 right-0 h-32 bg-gradient-to-b from-transparent via-emerald-200/50 to-transparent border-b border-emerald-400 z-20 pointer-events-none"
                />
              )}
            </AnimatePresence>

            {status === 'idle' || status === 'extracting' ? (
              <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-medium">
                Awaiting infrastructure mapping...
              </div>
            ) : null}

            <AnimatePresence mode="wait">
              {status === 'complete' && (
                <motion.div
                  key={activeScenario.framework}
                  variants={diffContainerVariants}
                  initial="hidden"
                  animate="show"
                  className="w-full flex flex-col h-full"
                >
                  <motion.div
                    variants={diffLineVariants}
                    className="bg-blue-50 text-slate-500 text-xs py-2 px-4 border-b border-slate-200 font-mono w-full shrink-0"
                  >
                    @@ -12,{activeScenario.oldCode.length} +12,
                    {activeScenario.oldCode.length + activeScenario.additions} @@
                  </motion.div>

                  {activeScenario.oldCode.map((line, idx) => (
                    <DiffLine
                      key={`old-${idx}`}
                      type="context"
                      oldLineNum={12 + idx}
                      newLineNum={12 + idx}
                      content={'  ' + line}
                    />
                  ))}

                  {activeScenario.newCode.map((line, idx) => (
                    <DiffLine
                      key={`new-${idx}`}
                      type="add"
                      oldLineNum=""
                      newLineNum={12 + activeScenario.oldCode.length + idx}
                      content={line}
                    />
                  ))}

                  <DiffLine
                    type="context"
                    oldLineNum={12 + activeScenario.oldCode.length}
                    newLineNum={12 + activeScenario.oldCode.length + activeScenario.additions}
                    content="  }"
                  />

                  <div className="flex-grow bg-white"></div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
