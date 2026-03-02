import React, { useState } from 'react';
import { DesignPattern } from '../data/patterns';
import { Mermaid } from './Mermaid';
import { Code2, Info, Target, Copy, Check } from 'lucide-react';

interface PatternViewProps {
  pattern: DesignPattern;
}

export const PatternView: React.FC<PatternViewProps> = ({ pattern }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(pattern.codeExample);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-white p-8">
      <div className="max-w-4xl mx-auto space-y-12 pb-24">
        
        {/* Header Section */}
        <header className="space-y-4">
          <div className="flex items-center space-x-3">
            <span className="px-3 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full">
              {pattern.category}
            </span>
            <h1 className="text-4xl font-bold text-zinc-900 tracking-tight">{pattern.name}</h1>
          </div>
          <p className="text-xl text-zinc-600 leading-relaxed">{pattern.description}</p>
        </header>

        {/* Intent Section */}
        <section className="bg-zinc-50 rounded-2xl p-6 border border-zinc-100">
          <div className="flex items-center space-x-2 mb-3">
            <Target className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-semibold text-zinc-900">Intent</h2>
          </div>
          <p className="text-zinc-700 leading-relaxed">{pattern.intent}</p>
        </section>

        {/* Visualization Section */}
        <section>
          <div className="flex items-center space-x-2 mb-6">
            <Info className="w-5 h-5 text-indigo-600" />
            <h2 className="text-2xl font-semibold text-zinc-900 tracking-tight">Structure</h2>
          </div>
          <div className="bg-white border border-zinc-200 rounded-2xl p-8 shadow-sm">
            <Mermaid chart={pattern.mermaidCode} />
          </div>
        </section>

        {/* Code Example Section */}
        <section>
          <div className="flex items-center space-x-2 mb-6">
            <Code2 className="w-5 h-5 text-indigo-600" />
            <h2 className="text-2xl font-semibold text-zinc-900 tracking-tight">Code Example</h2>
          </div>
          <div className="bg-zinc-900 rounded-2xl overflow-hidden shadow-md relative group">
            <div className="flex items-center justify-between px-4 py-2 bg-zinc-800 border-b border-zinc-700">
              <div className="flex items-center">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="ml-4 text-xs font-mono text-zinc-400">example.java</span>
              </div>
              <button
                onClick={handleCopy}
                className="p-1.5 text-zinc-400 hover:text-white transition-colors rounded hover:bg-zinc-700"
                title="Copy code"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <pre className="p-6 overflow-x-auto">
              <code className="text-sm font-mono text-zinc-300">
                {pattern.codeExample}
              </code>
            </pre>
          </div>
        </section>

      </div>
    </div>
  );
};
