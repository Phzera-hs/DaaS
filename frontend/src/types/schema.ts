export type DirtyLevel = 'CLEAN' | 'ANALYTICS' | 'ENGINEERING' | 'CHAOS';

export interface GenerationConfig {
  datasetSize: number;
  dirtyLevel: DirtyLevel;
  exportFormat: 'CSV' | 'JSON' | 'SQL';
  promptText: string;
}

export interface ForeignKey {
  targetTable: string;
  targetColumn: string;
}

export interface Column {
  id: string;
  name: string;
  type: string;
  isPrimaryKey?: boolean;
  foreignKey?: ForeignKey;
  isNullable?: boolean;
  description?: string;
}

export interface Table {
  id: string;
  name: string;
  columns: Column[];
  description?: string;
}

export interface Schema {
  id: string;
  tables: Table[];
  title?: string;
  description?: string;
}
