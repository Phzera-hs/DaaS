import { Table } from '@/types/schema';
import { Node } from '@xyflow/react';

export function generateLayout(tables: Table[]): Node[] {
  // A simple grid layout for the tables
  const nodeWidth = 350;
  const nodeHeight = 300;
  const columns = Math.ceil(Math.sqrt(tables.length)) || 1;
  
  return tables.map((table, index) => {
    const row = Math.floor(index / columns);
    const col = index % columns;
    
    return {
      id: table.id,
      type: 'tableNode',
      position: { x: col * nodeWidth + 50, y: row * nodeHeight + 50 },
      data: { table }
    };
  });
}
