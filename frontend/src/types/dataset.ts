export interface DataRow {
  [columnName: string]: any;
}

export interface DatasetColumnMeta {
  name: string;
  type: string;
  isCorrupted?: boolean;
  originalValue?: any;
}

export interface DatasetTable {
  tableName: string;
  columns: DatasetColumnMeta[];
  rows: DataRow[];
}

export interface DatasetResponse {
  schemaId: string;
  tables: DatasetTable[];
}
