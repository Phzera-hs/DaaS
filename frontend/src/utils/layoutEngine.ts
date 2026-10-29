import { Table } from '@/types/schema';
import { Node } from '@xyflow/react';

export function generateLayout(tables: Table[]): Node[] {
  const nodeWidth = 350;
  const nodeHeight = 300;

  if (tables.length === 0) return [];

  // Determine layer/depth for each table based on FK relationships.
  // Tables with foreign keys (sources) are placed to the left of their referenced tables (targets),
  // because source handles are on Position.Right and target handles are on Position.Left.
  const layers = new Map<string, number>();
  tables.forEach(table => layers.set(table.id, 0));

  const tableNameToId = new Map<string, string>();
  tables.forEach(table => {
    tableNameToId.set(table.name, table.id);
  });

  // Iteratively relax layer constraints (longest path in DAG)
  let changed = true;
  let iterations = 0;
  while (changed && iterations < tables.length) {
    changed = false;
    iterations++;

    for (const table of tables) {
      const currentLayer = layers.get(table.id) ?? 0;

      for (const col of table.columns) {
        if (col.foreignKey) {
          const targetTableId =
            tableNameToId.get(col.foreignKey.targetTable) || col.foreignKey.targetTable;

          if (targetTableId && targetTableId !== table.id && layers.has(targetTableId)) {
            const targetLayer = layers.get(targetTableId) ?? 0;
            if (targetLayer <= currentLayer) {
              layers.set(targetTableId, currentLayer + 1);
              changed = true;
            }
          }
        }
      }
    }
  }

  const hasRelationships = Array.from(layers.values()).some(layer => layer > 0);

  // If no relationships exist and multiple tables, fall back to simple grid
  if (!hasRelationships && tables.length > 2) {
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

  // Group tables by calculated layer
  const layerGroups = new Map<number, Table[]>();
  tables.forEach(table => {
    const layer = layers.get(table.id) ?? 0;
    if (!layerGroups.has(layer)) {
      layerGroups.set(layer, []);
    }
    layerGroups.get(layer)!.push(table);
  });

  const sortedLayers = Array.from(layerGroups.keys()).sort((a, b) => a - b);
  const nodes: Node[] = [];

  sortedLayers.forEach(layer => {
    const tablesInLayer = layerGroups.get(layer) || [];
    tablesInLayer.forEach((table, row) => {
      nodes.push({
        id: table.id,
        type: 'tableNode',
        position: {
          x: layer * nodeWidth + 50,
          y: row * nodeHeight + 50
        },
        data: { table }
      });
    });
  });

  return nodes;
}
