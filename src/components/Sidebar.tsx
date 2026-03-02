import React from 'react';
import { patterns, PatternCategory } from '../data/patterns';

interface SidebarProps {
  selectedPatternId: string;
  onSelectPattern: (id: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ selectedPatternId, onSelectPattern }) => {
  const categories: PatternCategory[] = ['Creational', 'Structural', 'Behavioral'];

  return (
    <div className="w-64 h-full bg-zinc-50 border-r border-zinc-200 overflow-y-auto flex flex-col">
      <div className="p-4 border-b border-zinc-200 sticky top-0 bg-zinc-50 z-10">
        <h1 className="text-lg font-semibold text-zinc-900 tracking-tight">Design Patterns</h1>
        <p className="text-xs text-zinc-500 mt-1">Learn the 23 GoF patterns</p>
      </div>
      
      <div className="flex-1 py-4">
        {categories.map((category) => (
          <div key={category} className="mb-6">
            <h2 className="px-4 text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
              {category}
            </h2>
            <ul className="space-y-0.5">
              {patterns
                .filter((p) => p.category === category)
                .map((pattern) => (
                  <li key={pattern.id}>
                    <button
                      onClick={() => onSelectPattern(pattern.id)}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                        selectedPatternId === pattern.id
                          ? 'bg-indigo-50 text-indigo-700 font-medium border-r-2 border-indigo-600'
                          : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'
                      }`}
                    >
                      {pattern.name}
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
