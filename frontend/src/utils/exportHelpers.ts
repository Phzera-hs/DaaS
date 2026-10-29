import { DatasetTable } from '../types/dataset';

export function exportToCSV(table: DatasetTable): string {
  if (!table.rows || table.rows.length === 0) return '';
  const headers = table.columns.map(c => c.name);
  const csvContent = [
    headers.join(','),
    ...table.rows.map(row => headers.map(h => {
      const val = row[h];
      if (val === null || val === undefined) return '';
      // Escape quotes and wrap in quotes if contains comma
      const strVal = String(val).replace(/"/g, '""');
      return strVal.includes(',') ? `"${strVal}"` : strVal;
    }).join(','))
  ].join('\n');
  return csvContent;
}

export function exportToJSON(table: DatasetTable): string {
  return JSON.stringify(table.rows, null, 2);
}

export function exportToSQL(table: DatasetTable): string {
  if (!table.rows || table.rows.length === 0) return '';
  
  // Basic generate CREATE TABLE and INSERT statements
  const createTable = `CREATE TABLE ${table.tableName} (
${table.columns.map(c => `  ${c.name} ${c.type}`).join(',\n')}
);`;

  const headers = table.columns.map(c => c.name);
  
  const insertStatements = table.rows.map(row => {
    const values = headers.map(h => {
      const val = row[h];
      if (val === null || val === undefined) return 'NULL';
      if (typeof val === 'number') return val;
      return `'${String(val).replace(/'/g, "''")}'`;
    });
    return `INSERT INTO ${table.tableName} (${headers.join(', ')}) VALUES (${values.join(', ')});`;
  }).join('\n');
  
  return `${createTable}\n\n${insertStatements}`;
}

export function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
