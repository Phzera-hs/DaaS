'use client';

import React from 'react';
import { useWorkspaceStore } from '@/stores/useWorkspaceStore';
import { DirtyLevel } from '@/types/schema';

const LEVELS: { value: DirtyLevel; label: string; desc: string }[] = [
  { value: 'CLEAN', label: 'Clean', desc: 'Perfectly structured data' },
  { value: 'ANALYTICS', label: 'Analytics', desc: 'Minor inconsistencies' },
  { value: 'ENGINEERING', label: 'Engineering', desc: 'Missing values & errors' },
  { value: 'CHAOS', label: 'Chaos', desc: 'Extreme data corruption' },
];

export function DirtyEngineSelector() {
  const { dirtyLevel, setDirtyLevel } = useWorkspaceStore();

  return (
    <div className="space-y-2 w-full">
      <label className="text-sm font-semibold">Dirty Engine Level</label>
      <div className="grid grid-cols-2 gap-2">
        {LEVELS.map((level) => (
          <button
            key={level.value}
            onClick={() => setDirtyLevel(level.value)}
            className={`flex flex-col items-start p-2 rounded-lg border text-left transition-all ${
              dirtyLevel === level.value 
                ? 'border-primary bg-primary/10' 
                : 'border-input bg-background hover:border-primary/50'
            }`}
          >
            <span className={`text-xs font-bold ${dirtyLevel === level.value ? 'text-primary' : 'text-foreground'}`}>
              {level.label}
            </span>
            <span className="text-[10px] text-muted-foreground leading-tight mt-0.5">
              {level.desc}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
