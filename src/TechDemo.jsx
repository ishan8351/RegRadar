import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileJson,
  GitPullRequest,
  ShieldCheck,
  Play,
  Loader2,
  CheckCircle2,
  X,
} from 'lucide-react';
import { useTheme } from './context/ThemeContext';

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

function TechDemoContent({ onClose }) {
  const { isDark } = useTheme();
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
            ? isDark
              ? 'bg-green-900/30 text-green-400'
              : 'bg-[#e6ffec] text-[#055030]'
            : isDark
              ? 'bg-dark-800 text-slate-300 hover:bg-dark-700 transition-colors'
              : 'bg-white text-slate-700 hover:bg-slate-50 transition-colors'
        }`}
      >
        <div
          className={`w-10 md:w-12 shrink-0 border-r text-right pr-2 md:pr-3 select-none py-[1px] ${
            isAddition
              ? isDark
                ? 'bg-green-900/20 text-slate-600 border-slate-700'
                : 'bg-[#e6ffec] text-slate-400/50 border-slate-200'
              : isDark
                ? 'bg-dark-700 text-slate-600 border-slate-700'
                : 'bg-slate-50 text-slate-400 border-slate-200'
          }`}
        >
          {oldLineNum || '\u00A0'}
        </div>
        <div
          className={`w-10 md:w-12 shrink-0 border-r text-right pr-2 md:pr-3 select-none py-[1px] ${
            isAddition
              ? isDark
                ? 'bg-green-900/40 text-green-400 cursor-pointer border-slate-700'
                : 'bg-[#ccffd8] text-slate-600 cursor-pointer border-slate-200'
              : isDark
                ? 'bg-dark-700 text-slate-600 border-slate-700'
                : 'bg-slate-50 text-slate-400 border-slate-200'
          }`}
        >
          {newLineNum || '\u00A0'}
        </div>
        <div className="pl-4 py-[1px] whitespace-pre-wrap break-words flex-grow tracking-tight">
          {!isAddition && content.includes('resource') ? (
            <>
              <span className={isDark ? 'text-red-400 font-medium' : 'text-[#cf222e] font-medium'}>
                resource
              </span>{' '}
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
    <div
      className={`relative rounded-2xl p-6 lg:p-8 overflow-hidden shadow-xl w-full max-w-6xl ${
        isDark ? 'bg-dark-800 border border-slate-700' : 'bg-white border border-slate-200'
      }`}
    >
      {/* Close button */}
      {onClose && (
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-2 rounded-lg transition-colors z-20 ${
            isDark
              ? 'hover:bg-dark-700 text-slate-400 hover:text-slate-200'
              : 'hover:bg-slate-100 text-slate-500 hover:text-slate-700'
          }`}
        >
          <X size={20} />
        </button>
      )}

      <div
        className={`absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] blur-[100px] rounded-full pointer-events-none ${
          isDark ? 'bg-brand-500/10' : 'bg-blue-50'
        }`}
      />

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4 relative z-10">
        <div>
          <h3
            className={`text-2xl font-bold flex items-center gap-3 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}
          >
            <ShieldCheck className="text-brand-500" /> Live Engine Simulation
          </h3>
          <p className={`text-sm mt-1 font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Target: <span className="text-brand-500 font-bold">{activeScenario.framework}</span> vs.
            AWS Infrastructure
          </p>
        </div>

        <button
          onClick={runScan}
          disabled={status !== 'idle' && status !== 'complete'}
          className={`relative group flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all overflow-hidden shadow-sm shrink-0 ${
            status === 'extracting' || status === 'mapping'
              ? isDark
                ? 'bg-dark-700 text-slate-500 border border-slate-700 cursor-not-allowed'
                : 'bg-slate-50 text-slate-400 border border-slate-200 cursor-not-allowed'
              : status === 'complete'
                ? isDark
                  ? 'bg-dark-700 text-slate-200 hover:bg-dark-600 border border-slate-700 hover:shadow-md'
                  : 'bg-white text-slate-800 hover:bg-slate-50 border border-slate-200 hover:shadow-md'
                : 'bg-brand-500 text-white hover:bg-brand-600 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(59,130,246,0.3)]'
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

      <div className="grid lg:grid-cols-[1fr_80px_1.2fr] gap-4 lg:gap-0 items-stretch h-[500px] relative z-10">
        {/* Left Panel - JSON */}
        <div
          className={`rounded-xl border overflow-hidden flex flex-col relative shadow-inner ${
            isDark ? 'bg-dark-900 border-slate-700' : 'bg-slate-50 border-slate-200'
          }`}
        >
          <div
            className={`px-4 py-3 border-b flex items-center justify-between text-sm font-mono z-10 ${
              isDark
                ? 'bg-dark-700 border-slate-700 text-slate-400'
                : 'bg-slate-100 border-slate-200 text-slate-600'
            }`}
          >
            <div className="flex items-center gap-2 font-semibold shrink-0">
              <FileJson
                size={16}
                className={
                  status === 'complete' || status === 'mapping'
                    ? 'text-brand-500'
                    : isDark
                      ? 'text-slate-500'
                      : 'text-slate-400'
                }
              />
              extracted_rules.json
            </div>
            {status === 'extracting' && (
              <span className="text-xs text-brand-500 font-bold animate-pulse text-right">
                Reading PDF...
              </span>
            )}
            {status === 'mapping' && (
              <span className="text-xs text-brand-400 font-bold animate-pulse text-right">
                Streaming Tokens...
              </span>
            )}
            {status === 'complete' && (
              <CheckCircle2 size={16} className="text-brand-500 shrink-0" />
            )}
          </div>

          <div className="p-5 overflow-hidden text-[13px] md:text-sm font-mono flex-grow relative whitespace-pre-wrap break-words">
            <AnimatePresence>
              {status === 'extracting' && (
                <motion.div
                  initial={{ top: '-100%' }}
                  animate={{ top: '200%' }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                  className={`absolute left-0 right-0 h-32 bg-gradient-to-b from-transparent to-transparent z-20 pointer-events-none ${
                    isDark
                      ? 'via-brand-500/20 border-b border-brand-500'
                      : 'via-blue-200/50 border-b border-blue-400'
                  }`}
                />
              )}
            </AnimatePresence>

            {status === 'idle' && (
              <div
                className={`absolute inset-0 flex items-center justify-center font-medium ${isDark ? 'text-slate-500' : 'text-slate-400'}`}
              >
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
                  className={isDark ? 'text-slate-300' : 'text-slate-700'}
                >
                  <motion.div
                    variants={jsonTypewriterVariants}
                    className={isDark ? 'text-slate-500' : 'text-slate-400'}
                  >
                    {'{'}
                  </motion.div>
                  <motion.div variants={jsonTypewriterVariants}>
                    {'  '}
                    <span className="text-brand-500 font-medium">"regulatory_framework"</span>:{' '}
                    <span className="text-emerald-500">"{activeScenario.framework}"</span>,
                  </motion.div>
                  <motion.div variants={jsonTypewriterVariants}>
                    {'  '}
                    <span className="text-brand-500 font-medium">"article"</span>:{' '}
                    <span className="text-emerald-500">"{activeScenario.article}"</span>,
                  </motion.div>
                  <motion.div variants={jsonTypewriterVariants}>
                    {'  '}
                    <span className="text-brand-500 font-medium">"mandates"</span>:{' '}
                    <span className={isDark ? 'text-slate-500' : 'text-slate-400'}>{'['}</span>
                  </motion.div>
                  <motion.div
                    variants={jsonTypewriterVariants}
                    className={isDark ? 'text-slate-500' : 'text-slate-400'}
                  >
                    {'    {'}
                  </motion.div>
                  <motion.div variants={jsonTypewriterVariants}>
                    {'      '}
                    <span className="text-brand-500 font-medium">"requirement"</span>:{' '}
                    <span className="text-emerald-500">"{activeScenario.requirement}"</span>,
                  </motion.div>
                  <motion.div variants={jsonTypewriterVariants}>
                    {'      '}
                    <span className="text-brand-500 font-medium">"target_resources"</span>: [
                    <span className="text-emerald-500">"{activeScenario.targetResource}"</span>],
                  </motion.div>
                  <motion.div variants={jsonTypewriterVariants}>
                    {'      '}
                    <span className="text-brand-500 font-medium">"confidence_score"</span>:{' '}
                    <span className="text-amber-500">{activeScenario.confidence}</span>
                  </motion.div>
                  <motion.div
                    variants={jsonTypewriterVariants}
                    className={isDark ? 'text-slate-500' : 'text-slate-400'}
                  >
                    {'    }'}
                  </motion.div>
                  <motion.div
                    variants={jsonTypewriterVariants}
                    className={isDark ? 'text-slate-500' : 'text-slate-400'}
                  >
                    {']'}
                  </motion.div>
                  <motion.div
                    variants={jsonTypewriterVariants}
                    className={`flex items-center gap-1 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}
                  >
                    {'}'}

                    {status === 'mapping' && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                        className="w-2 h-4 bg-brand-500 inline-block align-middle"
                      />
                    )}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Arrow connector */}
        <div className="hidden lg:flex flex-col items-center justify-center relative">
          <svg width="80" height="24" viewBox="0 0 80 24" fill="none" className="absolute">
            <path
              d="M0 12L80 12"
              stroke={isDark ? '#374151' : '#e2e8f0'}
              strokeWidth="2"
              strokeDasharray="4 4"
            />
            <motion.path
              d="M0 12L80 12"
              stroke="#3B82F6"
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
                className="absolute w-2.5 h-2.5 rounded-full bg-brand-500 shadow-[0_0_12px_#3B82F6]"
                style={{ top: 'calc(50% - 5px)' }}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Right Panel - Diff */}
        <div
          className={`rounded-xl border overflow-hidden flex flex-col relative shadow-inner ${
            isDark ? 'bg-dark-900 border-slate-700' : 'bg-slate-50 border-slate-200'
          }`}
        >
          <div
            className={`px-4 py-3 border-b flex items-center justify-between text-sm font-mono z-10 ${
              isDark
                ? 'bg-dark-700 border-slate-700 text-slate-400'
                : 'bg-slate-100 border-slate-200 text-slate-700'
            }`}
          >
            <div className="flex items-center gap-2 font-semibold shrink-0">
              <GitPullRequest
                size={16}
                className={
                  status === 'complete'
                    ? 'text-brand-500'
                    : isDark
                      ? 'text-slate-500'
                      : 'text-slate-400'
                }
              />
              {activeScenario.fileName}
            </div>
            {status === 'mapping' && (
              <span className="text-xs text-brand-500 font-bold animate-pulse text-right">
                Generating diff...
              </span>
            )}
            {status === 'complete' && (
              <span
                className={`text-[11px] font-bold px-2 py-0.5 rounded border shrink-0 ${
                  isDark
                    ? 'text-emerald-400 bg-emerald-900/30 border-emerald-800'
                    : 'text-emerald-700 bg-emerald-100 border-emerald-200'
                }`}
              >
                +{activeScenario.additions} additions
              </span>
            )}
          </div>

          <div
            className={`p-0 overflow-hidden text-sm flex-grow relative ${isDark ? 'bg-dark-800' : 'bg-white'}`}
          >
            <AnimatePresence>
              {status === 'mapping' && (
                <motion.div
                  initial={{ top: '-100%' }}
                  animate={{ top: '200%' }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                  className={`absolute left-0 right-0 h-32 bg-gradient-to-b from-transparent to-transparent z-20 pointer-events-none ${
                    isDark
                      ? 'via-emerald-500/20 border-b border-emerald-500'
                      : 'via-emerald-200/50 border-b border-emerald-400'
                  }`}
                />
              )}
            </AnimatePresence>

            {status === 'idle' || status === 'extracting' ? (
              <div
                className={`absolute inset-0 flex items-center justify-center font-medium ${isDark ? 'text-slate-500' : 'text-slate-400'}`}
              >
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
                    className={`text-xs py-2 px-4 border-b font-mono w-full shrink-0 ${
                      isDark
                        ? 'bg-dark-700 text-slate-500 border-slate-700'
                        : 'bg-blue-50 text-slate-500 border-slate-200'
                    }`}
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

                  <div className={`flex-grow ${isDark ? 'bg-dark-800' : 'bg-white'}`}></div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TechDemoModal({ isOpen, onClose }) {
  const { isDark } = useTheme();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`absolute inset-0 ${isDark ? 'bg-black/80' : 'bg-black/50'} backdrop-blur-sm`}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10"
          >
            <TechDemoContent onClose={onClose} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Also export the content for potential inline use
export { TechDemoContent };
