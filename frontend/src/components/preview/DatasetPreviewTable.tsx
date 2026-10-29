'use client';

import React, { useState, useMemo } from 'react';
import { useWorkspaceStore } from '@/stores/useWorkspaceStore';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { CellHighlight } from './CellHighlight';

export function DatasetPreviewTable() {
  const { datasetData, dirtyLevel } = useWorkspaceStore();
  const [activeTableIndex, setActiveTableIndex] = useState(0);

  const activeTable = datasetData?.tables[activeTableIndex];

  const columns = useMemo(() => {
    if (!activeTable) return [];
    const columnHelper = createColumnHelper<any>();
    
    return activeTable.columns.map(col => 
      columnHelper.accessor(col.name, {
        header: () => <span className="font-bold text-sm">{col.name}</span>,
        cell: info => {
          const val = info.getValue();
          const row = info.row.original;
          const isCorrupted = row[`_corrupted_${col.name}`];
          const originalVal = row[`_original_${col.name}`];
          
          return (
            <CellHighlight 
              value={val} 
              isCorrupted={isCorrupted} 
              originalValue={originalVal} 
              dirtyLevel={dirtyLevel} 
            />
          );
        }
      })
    );
  }, [activeTable, dirtyLevel]);

  const table = useReactTable({
    data: activeTable?.rows || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (!datasetData || datasetData.tables.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
        No dataset generated yet.
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col">
      {/* Table Selector Header */}
      <div className="flex gap-2 p-4 border-b border-border bg-muted/20">
        {datasetData.tables.map((t, idx) => (
          <button
            key={t.tableName}
            onClick={() => setActiveTableIndex(idx)}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
              activeTableIndex === idx 
                ? 'bg-primary text-primary-foreground shadow-sm' 
                : 'bg-background border border-border hover:bg-muted text-foreground'
            }`}
          >
            {t.tableName}
          </button>
        ))}
      </div>

      {/* Table Content */}
      <div className="flex-1 overflow-auto p-4 bg-background">
        <div className="rounded-md border border-border overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted text-muted-foreground border-b border-border">
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id} className="px-4 py-3 font-semibold whitespace-nowrap">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map(row => (
                  <tr key={row.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                    {row.getVisibleCells().map(cell => (
                      <td key={cell.id} className="px-4 py-3 whitespace-nowrap">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="px-4 py-8 text-center text-muted-foreground">
                    No rows found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
