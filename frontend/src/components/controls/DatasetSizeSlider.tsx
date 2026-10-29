'use client';

import React from 'react';
import { useWorkspaceStore } from '@/stores/useWorkspaceStore';

export function DatasetSizeSlider() {
  const { datasetSize, setDatasetSize } = useWorkspaceStore();

  return (
    <div className="space-y-2 w-full">
      <label className="text-sm font-semibold flex justify-between">
        <span>Dataset Size</span>
        <span className="text-muted-foreground">{datasetSize.toLocaleString()} rows</span>
      </label>
      <div className="flex items-center gap-3 pt-2">
        <input
          type="range"
          min="100"
          max="100000"
          step="100"
          value={datasetSize}
          onChange={(e) => setDatasetSize(Number(e.target.value))}
          className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
        />
      </div>
    </div>
  );
}
