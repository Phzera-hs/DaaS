'use client';

import React from 'react';
import { useWorkspaceStore } from '@/stores/useWorkspaceStore';

const SUGGESTIONS = [
  "E-commerce with Users, Orders and Products",
  "Healthcare system with Patients and Appointments",
  "Social Network with Posts, Comments and Likes"
];

export function PromptInput() {
  const { prompt, setPrompt, isGenerating, generateMockSchema } = useWorkspaceStore();

  return (
    <div className="flex flex-col gap-3">
      <label className="text-sm font-semibold">Scenario Description</label>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe the database schema you want to generate..."
        className="h-32 w-full rounded-lg border border-input bg-background p-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
      />
      <div className="flex flex-wrap gap-2">
        {SUGGESTIONS.map((suggestion, i) => (
          <button
            key={i}
            onClick={() => setPrompt(suggestion)}
            className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-md hover:bg-muted/80 transition-colors text-left"
          >
            {suggestion}
          </button>
        ))}
      </div>
      <button 
        onClick={generateMockSchema}
        disabled={isGenerating || !prompt.trim()}
        className="w-full mt-2 py-2.5 px-4 bg-primary text-primary-foreground rounded-lg font-semibold shadow hover:bg-primary/90 hover:shadow-lg transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isGenerating ? 'Generating...' : 'Generate Schema'}
      </button>
    </div>
  );
}
