import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Table, Column } from '@/types/schema';
import { Key, Link as LinkIcon } from 'lucide-react';

export interface TableNodeData {
  table: Table;
}

export function TableNode({ data }: { data: TableNodeData }) {
  const { table } = data;

  return (
    <div className="bg-card border-2 border-border rounded-xl shadow-sm w-64 overflow-hidden font-sans">
      <div className="bg-muted px-4 py-3 border-b border-border flex items-center justify-between">
        <h3 className="font-bold text-foreground truncate">{table.name}</h3>
      </div>
      <div className="flex flex-col py-1">
        {table.columns.map((col: Column) => (
          <div key={col.id} className="relative px-4 py-2 flex items-center justify-between hover:bg-muted/50 transition-colors text-sm group">
            <Handle
              type="target"
              position={Position.Left}
              id={`target-${col.id}`}
              className="w-2 h-2 -ml-[18px] bg-blue-500 border-none opacity-0 group-hover:opacity-100 transition-opacity"
            />
            
            <div className="flex items-center gap-2 overflow-hidden">
              {col.isPrimaryKey ? (
                <Key className="w-4 h-4 text-yellow-500 flex-shrink-0" />
              ) : col.foreignKey ? (
                <LinkIcon className="w-4 h-4 text-blue-500 flex-shrink-0" />
              ) : (
                <div className="w-4 h-4 flex-shrink-0" />
              )}
              <span className="font-medium text-foreground truncate">{col.name}</span>
            </div>
            <span className="text-muted-foreground text-xs font-mono ml-4">{col.type}</span>

            <Handle
              type="source"
              position={Position.Right}
              id={`source-${col.id}`}
              className="w-2 h-2 -mr-[18px] bg-blue-500 border-none opacity-0 group-hover:opacity-100 transition-opacity"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
