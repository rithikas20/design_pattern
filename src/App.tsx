import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { PatternView } from './components/PatternView';
import { Chatbot } from './components/Chatbot';
import { patterns } from './data/patterns';

export default function App() {
  const [selectedPatternId, setSelectedPatternId] = useState(patterns[0].id);

  const selectedPattern = patterns.find((p) => p.id === selectedPatternId) || patterns[0];

  return (
    <div className="flex h-screen w-full bg-zinc-100 overflow-hidden font-sans text-zinc-900">
      <Sidebar
        selectedPatternId={selectedPatternId}
        onSelectPattern={setSelectedPatternId}
      />
      <main className="flex-1 flex flex-col relative h-full">
        <PatternView pattern={selectedPattern} />
        <Chatbot />
      </main>
    </div>
  );
}
