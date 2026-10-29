import React, { useMemo, useEffect } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  MiniMap,
  Edge,
  useNodesState,
  useEdgesState,
  BackgroundVariant
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useWorkspaceStore } from '@/stores/useWorkspaceStore';
import { TableNode } from './TableNode';
import { generateLayout } from '@/utils/layoutEngine';

const nodeTypes = {
  tableNode: TableNode,
};

export function SchemaVisualizer() {
  const { schemaData } = useWorkspaceStore();

  const { initialNodes, initialEdges } = useMemo(() => {
    if (!schemaData) return { initialNodes: [], initialEdges: [] };

    const nodes = generateLayout(schemaData.tables);
    const edges: Edge[] = [];
    
    // Create lookup maps to resolve names to IDs
    const tableNameToId = new Map<string, string>();
    const tableIdToColNameToId = new Map<string, Map<string, string>>();
    
    schemaData.tables.forEach(table => {
      tableNameToId.set(table.name, table.id);
      const colMap = new Map<string, string>();
      table.columns.forEach(col => colMap.set(col.name, col.id));
      tableIdToColNameToId.set(table.id, colMap);
    });

    schemaData.tables.forEach(table => {
      table.columns.forEach(col => {
        if (col.foreignKey) {
          const targetTableId = tableNameToId.get(col.foreignKey.targetTable) || col.foreignKey.targetTable;
          const targetColId = tableIdToColNameToId.get(targetTableId)?.get(col.foreignKey.targetColumn) || col.foreignKey.targetColumn;
          
          edges.push({
            id: `edge-${table.id}-${col.id}-${targetTableId}-${targetColId}`,
            source: table.id,
            sourceHandle: `source-${col.id}`,
            target: targetTableId,
            targetHandle: `target-${targetColId}`,
            animated: true,
            style: { stroke: '#3b82f6', strokeWidth: 2 },
          });
        }
      });
    });

    return { initialNodes: nodes, initialEdges: edges };
  }, [schemaData]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [initialNodes, initialEdges, setNodes, setEdges]);

  if (!schemaData) {
    return (
      <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-background/50 backdrop-blur-sm transition-all">
        <div className="flex flex-col items-center gap-2">
          <span className="text-lg font-medium">No Schema Data</span>
          <span className="text-sm">Generate a schema to see the visualization.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        <Controls />
        <MiniMap zoomable pannable nodeColor="#cbd5e1" />
      </ReactFlow>
    </div>
  );
}
