'use client';

import React from 'react';
import { useWorkspaceStore } from '@/stores/useWorkspaceStore';

export function ExportFormatSelect() {
  const { exportFormat, setExportFormat } = useWorkspaceStore();

  return (
    <div className="space-y-2 w-full">
      <label className="text-sm font-semibold">Export Format</label>
      <div className="relative">
        <select
          value={exportFormat}
          onChange={(e) => setExportFormat(e.target.value as 'CSV' | 'JSON' | 'SQL')}
          className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer appearance-none"
        >
          <option value="CSV">CSV Files (Separated by table)</option>
          <option value="JSON">JSON (Nested or Flat)</option>
          <option value="SQL">SQL Insert Statements</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
}
