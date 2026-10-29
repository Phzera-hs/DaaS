'use client';

import React, { useState } from 'react';
import { PromptInput } from '@/components/controls/PromptInput';
import { DatasetSizeSlider } from '@/components/controls/DatasetSizeSlider';
import { DirtyEngineSelector } from '@/components/controls/DirtyEngineSelector';
import { ExportFormatSelect } from '@/components/controls/ExportFormatSelect';
import { ExportHeader } from '@/components/controls/ExportHeader';
import { DatasetPreviewTable } from '@/components/preview/DatasetPreviewTable';
import { useWorkspaceStore } from '@/stores/useWorkspaceStore';
import { SchemaVisualizer } from '@/components/visualization/SchemaVisualizer';

export default function WorkspacePage() {
  const [activeTab, setActiveTab] = useState<'schema' | 'preview'>('schema');
  const { schemaData, dirtyLevel, exportFormat } = useWorkspaceStore();

  return (
    <div className="flex h-screen w-full bg-background text-foreground overflow-hidden font-sans">
      {/* Left Panel: Controls & Storytelling */}
      <aside className="w-1/3 min-w-[350px] max-w-[450px] border-r border-border p-6 flex flex-col gap-8 bg-card overflow-y-auto shadow-md z-10">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight mb-1 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            DataForge
          </h1>
          <p className="text-sm text-muted-foreground font-medium">Data as a Storytelling</p>
        </div>
        
        {/* Prompt Input Section */}
        <PromptInput />

        {/* Dataset Configurator Section */}
        <section className="flex flex-col gap-5 mt-2">
          <h2 className="text-lg font-bold border-b border-border pb-2">Configuration</h2>
          
          <DatasetSizeSlider />
          <DirtyEngineSelector />
          <ExportFormatSelect />
        </section>
      </aside>

      {/* Right Panel: Visualization & Inspection */}
      <main className="flex-1 flex flex-col min-w-0 bg-muted/30">
        {/* Action Bar (ExportHeader) */}
        <ExportHeader />

        {/* Visualization Area */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {/* Tabs */}
          <div className="flex border-b border-border bg-background px-6 pt-2 gap-4">
            <button 
              onClick={() => setActiveTab('schema')}
              className={`px-4 py-3 text-sm font-bold border-b-2 transition-colors ${
                activeTab === 'schema' 
                  ? 'border-primary text-foreground' 
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              Schema Graph
            </button>
            <button 
              onClick={() => setActiveTab('preview')}
              className={`px-4 py-3 text-sm font-bold border-b-2 transition-colors ${
                activeTab === 'preview' 
                  ? 'border-primary text-foreground' 
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              Data Preview
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1 relative overflow-auto p-6">
            <div className="w-full h-full rounded-xl border border-border bg-background shadow-inner overflow-hidden">
              {activeTab === 'schema' ? <SchemaVisualizer /> : <DatasetPreviewTable />}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
