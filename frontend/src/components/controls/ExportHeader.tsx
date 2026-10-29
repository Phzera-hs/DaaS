'use client';

import React from 'react';
import { useWorkspaceStore } from '@/stores/useWorkspaceStore';
import { exportToCSV, exportToJSON, exportToSQL, downloadFile } from '@/utils/exportHelpers';
import JSZip from 'jszip';

export function ExportHeader() {
  const { schemaData, dirtyLevel, exportFormat, datasetData } = useWorkspaceStore();

  const handleExport = async (format: 'CSV' | 'JSON' | 'SQL') => {
    if (!datasetData || datasetData.tables.length === 0) return;

    if (datasetData.tables.length === 1) {
      const table = datasetData.tables[0];
      let content = '';
      let mime = '';
      let ext = '';
      
      if (format === 'CSV') {
        content = exportToCSV(table);
        mime = 'text/csv';
        ext = 'csv';
      } else if (format === 'JSON') {
        content = exportToJSON(table);
        mime = 'application/json';
        ext = 'json';
      } else if (format === 'SQL') {
        content = exportToSQL(table);
        mime = 'application/sql';
        ext = 'sql';
      }
      
      downloadFile(content, `${table.tableName}_export.${ext}`, mime);
    } else {
      // Multiple tables, create a zip file
      const zip = new JSZip();
      
      datasetData.tables.forEach(table => {
        let content = '';
        let ext = '';
        if (format === 'CSV') {
          content = exportToCSV(table);
          ext = 'csv';
        } else if (format === 'JSON') {
          content = exportToJSON(table);
          ext = 'json';
        } else if (format === 'SQL') {
          content = exportToSQL(table);
          ext = 'sql';
        }
        zip.file(`${table.tableName}.${ext}`, content);
      });
      
      const blob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `dataset_export.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <header className="h-16 border-b border-border flex items-center justify-between px-6 bg-background shadow-sm z-10">
      <div className="flex items-center gap-4 text-sm">
        <span className="font-medium text-muted-foreground">
          Schema: <strong className="text-foreground text-base">{schemaData?.title || 'None generated'}</strong>
        </span>
        <span className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${
          dirtyLevel === 'CHAOS' ? 'bg-destructive/15 text-destructive' :
          dirtyLevel === 'ENGINEERING' ? 'bg-orange-500/15 text-orange-500' :
          dirtyLevel === 'ANALYTICS' ? 'bg-yellow-500/15 text-yellow-500' :
          'bg-green-500/15 text-green-500'
        }`}>
          {dirtyLevel} MODE
        </span>
      </div>
      <div className="flex gap-3">
        <button 
          onClick={() => handleExport(exportFormat)}
          disabled={!datasetData}
          className="py-2 px-4 bg-secondary text-secondary-foreground rounded-lg text-sm font-semibold border border-border hover:bg-secondary/80 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Download {exportFormat}
        </button>
        {exportFormat !== 'SQL' && (
          <button 
            onClick={() => handleExport('SQL')}
            disabled={!datasetData}
            className="py-2 px-4 bg-secondary text-secondary-foreground rounded-lg text-sm font-semibold border border-border hover:bg-secondary/80 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Download SQL
          </button>
        )}
      </div>
    </header>
  );
}
