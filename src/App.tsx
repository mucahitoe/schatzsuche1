import React from 'react';
import { HuntGenerator } from './components/HuntGenerator';
import { Bot } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen space-mountains">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12 float">
          <div className="inline-flex items-center justify-center mb-6">
            <Bot className="w-16 h-16 text-[#ff6b6b]" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Space Adventure Hunt Generator
          </h1>
          <p className="text-xl text-white/70">
            Create an out-of-this-world adventure in minutes!
          </p>
        </div>
        <div className="moon-surface rounded-3xl p-8">
          <HuntGenerator />
        </div>
      </div>
    </div>
  );
}

export default App;