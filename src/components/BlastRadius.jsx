import React, { useCallback, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  MarkerType,
  Handle,
  Position,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import {
  FileText,
  Database,
  Server,
  GitPullRequest,
  Shield,
  AlertTriangle,
  CheckCircle2,
  RotateCcw,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

// Custom Node Component with Handles
const CustomNode = ({ data, selected }) => {
  const { isDark } = useTheme();
  const IconComponent = data.icon;
  const isHighlighted = data.highlighted;
  const isViolation = data.violation;

  return (
    <div className="relative">
      {/* Source Handle (Right) */}
      <Handle
        type="source"
        position={Position.Right}
        className="!w-3 !h-3 !bg-brand-500 !border-2 !border-white dark:!border-dark-800"
        style={{ right: -6 }}
      />
      {/* Target Handle (Left) */}
      <Handle
        type="target"
        position={Position.Left}
        className="!w-3 !h-3 !bg-brand-500 !border-2 !border-white dark:!border-dark-800"
        style={{ left: -6 }}
      />

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={`
          px-4 py-3 rounded-xl border-2 transition-all duration-300 min-w-[160px]
          ${
            isViolation
              ? 'bg-red-500/10 border-red-500/50 hover:border-red-500'
              : isHighlighted
                ? 'bg-brand-500/10 border-brand-500/50 hover:border-brand-500'
                : isDark
                  ? 'bg-dark-800 border-slate-700 hover:border-slate-600'
                  : 'bg-white border-slate-300 hover:border-slate-400'
          }
          ${selected ? 'ring-2 ring-brand-500 ring-offset-2' : ''}
        `}
        style={{
          ringOffsetColor: isDark ? '#09090b' : '#ffffff',
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className={`
            w-8 h-8 rounded-lg flex items-center justify-center
            ${
              isViolation
                ? 'bg-red-500/20'
                : isHighlighted
                  ? 'bg-brand-500/20'
                  : isDark
                    ? 'bg-dark-700'
                    : 'bg-slate-100'
            }
          `}
          >
            <IconComponent
              size={16}
              className={
                isViolation
                  ? 'text-red-500'
                  : isHighlighted
                    ? 'text-brand-500'
                    : isDark
                      ? 'text-slate-400'
                      : 'text-slate-500'
              }
            />
          </div>
          <div>
            <div
              className={`text-sm font-medium ${
                isViolation ? 'text-red-500' : isDark ? 'text-slate-100' : 'text-slate-900'
              }`}
            >
              {data.label}
            </div>
            {data.sublabel && (
              <div className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                {data.sublabel}
              </div>
            )}
          </div>
          {isViolation && <AlertTriangle size={14} className="text-red-500 ml-auto" />}
          {data.fixed && <CheckCircle2 size={14} className="text-green-500 ml-auto" />}
        </div>
      </motion.div>
    </div>
  );
};

const nodeTypes = {
  custom: CustomNode,
};

const getInitialNodes = () => [
  // Regulation layer
  {
    id: 'regulation',
    type: 'custom',
    position: { x: 50, y: 150 },
    data: {
      label: 'EU AI Act',
      sublabel: 'Article 15',
      icon: FileText,
      highlighted: true,
    },
  },
  // Rules extracted
  {
    id: 'rule1',
    type: 'custom',
    position: { x: 300, y: 80 },
    data: {
      label: 'encryption_at_rest',
      sublabel: 'Required: true',
      icon: Shield,
      highlighted: true,
    },
  },
  {
    id: 'rule2',
    type: 'custom',
    position: { x: 300, y: 220 },
    data: {
      label: 'mfa_required',
      sublabel: 'Required: true',
      icon: Shield,
      highlighted: true,
    },
  },
  // Infrastructure resources
  {
    id: 'resource1',
    type: 'custom',
    position: { x: 550, y: 20 },
    data: {
      label: 'aws_s3_bucket',
      sublabel: 'user_data',
      icon: Database,
      violation: true,
    },
  },
  {
    id: 'resource2',
    type: 'custom',
    position: { x: 550, y: 150 },
    data: {
      label: 'aws_rds_instance',
      sublabel: 'production_db',
      icon: Server,
      violation: false,
    },
  },
  {
    id: 'resource3',
    type: 'custom',
    position: { x: 550, y: 280 },
    data: {
      label: 'aws_iam_user',
      sublabel: 'admin_user',
      icon: Server,
      violation: true,
    },
  },
  // PR output
  {
    id: 'pr',
    type: 'custom',
    position: { x: 800, y: 150 },
    data: {
      label: 'Pull Request',
      sublabel: '#142 created',
      icon: GitPullRequest,
      fixed: true,
    },
  },
];

const getInitialEdges = () => [
  // Regulation to rules
  {
    id: 'e-reg-rule1',
    source: 'regulation',
    target: 'rule1',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#3B82F6', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#3B82F6', width: 20, height: 20 },
  },
  {
    id: 'e-reg-rule2',
    source: 'regulation',
    target: 'rule2',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#3B82F6', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#3B82F6', width: 20, height: 20 },
  },
  // Rules to resources
  {
    id: 'e-rule1-res1',
    source: 'rule1',
    target: 'resource1',
    type: 'smoothstep',
    style: { stroke: '#EF4444', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#EF4444', width: 20, height: 20 },
  },
  {
    id: 'e-rule1-res2',
    source: 'rule1',
    target: 'resource2',
    type: 'smoothstep',
    style: { stroke: '#64748b', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#64748b', width: 20, height: 20 },
  },
  {
    id: 'e-rule2-res3',
    source: 'rule2',
    target: 'resource3',
    type: 'smoothstep',
    style: { stroke: '#EF4444', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#EF4444', width: 20, height: 20 },
  },
  // Violations to PR
  {
    id: 'e-res1-pr',
    source: 'resource1',
    target: 'pr',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#10B981', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#10B981', width: 20, height: 20 },
  },
  {
    id: 'e-res3-pr',
    source: 'resource3',
    target: 'pr',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#10B981', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#10B981', width: 20, height: 20 },
  },
];

export default function BlastRadius() {
  const { isDark } = useTheme();
  const [nodes, setNodes, onNodesChange] = useNodesState(getInitialNodes());
  const [edges, setEdges, onEdgesChange] = useEdgesState(getInitialEdges());
  const [selectedNode, setSelectedNode] = useState(null);

  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node);
  }, []);

  const handleReset = useCallback(() => {
    setNodes(getInitialNodes());
    setEdges(getInitialEdges());
    setSelectedNode(null);
  }, [setNodes, setEdges]);

  return (
    <section
      className={`py-24 md:py-32 relative overflow-hidden ${isDark ? 'bg-dark-900' : 'bg-white'}`}
    >
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-500/20 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-brand-500 text-sm font-medium tracking-wide uppercase mb-4 block">
            Key Differentiator
          </span>
          <h2
            className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-6 ${
              isDark ? 'text-slate-100' : 'text-slate-900'
            }`}
          >
            Blast Radius Mapping
          </h2>
          <p
            className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}
          >
            See exactly which infrastructure resources fail compliance checks. Click on any node to
            explore the connection.
          </p>
        </motion.div>

        {/* Legend & Reset Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center items-center gap-6 mb-8"
        >
          <div
            className={`flex items-center gap-2 text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}
          >
            <div className="w-3 h-3 rounded-full bg-brand-500"></div>
            <span>Regulation / Rule</span>
          </div>
          <div
            className={`flex items-center gap-2 text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}
          >
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span>Violation Found</span>
          </div>
          <div
            className={`flex items-center gap-2 text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}
          >
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>Fix Generated</span>
          </div>
          <div
            className={`flex items-center gap-2 text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}
          >
            <div
              className={`w-3 h-3 rounded-full ${isDark ? 'bg-slate-600' : 'bg-slate-300'}`}
            ></div>
            <span>Compliant</span>
          </div>

          {/* Reset Button */}
          <button
            onClick={handleReset}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              isDark
                ? 'bg-dark-700 hover:bg-dark-600 text-slate-300 border border-slate-700 hover:border-slate-600'
                : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 hover:border-slate-400'
            }`}
          >
            <RotateCcw size={14} />
            Reset View
          </button>
        </motion.div>

        {/* Graph Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className={`rounded-2xl border overflow-hidden ${
            isDark ? 'bg-dark-800 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}
          style={{ height: '500px' }}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeClick={onNodeClick}
            nodeTypes={nodeTypes}
            fitView
            fitViewOptions={{ padding: 0.2 }}
            proOptions={{ hideAttribution: true }}
            defaultEdgeOptions={{
              type: 'smoothstep',
            }}
            minZoom={0.5}
            maxZoom={1.5}
          >
            <Background color={isDark ? '#27272A' : '#cbd5e1'} gap={20} size={1} />
            <Controls
              showZoom={true}
              showFitView={true}
              showInteractive={false}
              className={`${
                isDark ? '!bg-dark-700 !border-slate-700' : '!bg-white !border-slate-200'
              } !rounded-lg`}
            />
          </ReactFlow>
        </motion.div>

        {/* Info Panel */}
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-6 border rounded-xl p-6 ${
              isDark ? 'bg-dark-800 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-start gap-4">
              <div
                className={`
                w-12 h-12 rounded-xl flex items-center justify-center
                ${
                  selectedNode.data.violation
                    ? 'bg-red-500/20'
                    : selectedNode.data.highlighted
                      ? 'bg-brand-500/20'
                      : isDark
                        ? 'bg-dark-700'
                        : 'bg-slate-100'
                }
              `}
              >
                <selectedNode.data.icon
                  size={24}
                  className={selectedNode.data.violation ? 'text-red-500' : 'text-brand-500'}
                />
              </div>
              <div>
                <h4
                  className={`text-lg font-semibold ${
                    isDark ? 'text-slate-100' : 'text-slate-900'
                  }`}
                >
                  {selectedNode.data.label}
                </h4>
                <p className={`text-sm ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                  {selectedNode.data.sublabel}
                </p>
                {selectedNode.data.violation && (
                  <p className="text-red-500 text-sm mt-2">
                    This resource violates the extracted mandate. A fix has been generated.
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <p className={`text-sm ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
            <span className="text-brand-500">Tip:</span> Click and drag nodes to explore. The graph
            shows the full lineage from regulation to remediation.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
