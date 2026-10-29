import React from 'react';
import { DirtyLevel } from '@/types/schema';

interface CellHighlightProps {
  value: any;
  isCorrupted?: boolean;
  originalValue?: any;
  dirtyLevel: DirtyLevel;
}

export function CellHighlight({ value, isCorrupted, originalValue, dirtyLevel }: CellHighlightProps) {
  if (!isCorrupted) {
    return (
      <span className={`truncate max-w-[200px] inline-block ${value === null ? "text-muted-foreground italic" : "text-foreground"}`}>
        {value === null ? 'NULL' : String(value)}
      </span>
    );
  }

  // Handle corrupted visual state
  const isChaos = dirtyLevel === 'CHAOS';
  const isEngineering = dirtyLevel === 'ENGINEERING';

  return (
    <div className="relative group inline-block max-w-[200px]">
      <span className={`px-2 py-0.5 rounded text-sm font-medium border truncate block w-full ${isChaos ? "bg-destructive/10 text-destructive border-destructive/20" : ""} ${isEngineering ? "bg-orange-500/10 text-orange-500 border-orange-500/20" : ""}`}>
        {value === null ? 'NULL' : String(value)}
      </span>
      
      {/* Tooltip for original value */}
      {originalValue !== undefined && (
        <div className="absolute z-50 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded shadow-md whitespace-nowrap">
          Original: {originalValue === null ? 'NULL' : String(originalValue)}
          <svg className="absolute text-popover h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255"><polygon className="fill-current" points="0,0 127.5,127.5 255,0"/></svg>
        </div>
      )}
    </div>
  );
}
