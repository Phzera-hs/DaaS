import { create } from 'zustand';
import { Schema, DirtyLevel } from '../types/schema';

interface WorkspaceState {
  prompt: string;
  datasetSize: number;
  dirtyLevel: DirtyLevel;
  exportFormat: 'CSV' | 'JSON' | 'SQL';
  isGenerating: boolean;
  schemaData: Schema | null;
  datasetData: import('../types/dataset').DatasetResponse | null;
  
  setPrompt: (prompt: string) => void;
  setDatasetSize: (size: number) => void;
  setDirtyLevel: (level: DirtyLevel) => void;
  setExportFormat: (format: 'CSV' | 'JSON' | 'SQL') => void;
  setIsGenerating: (isGenerating: boolean) => void;
  setSchemaData: (data: Schema | null) => void;
  setDatasetData: (data: import('../types/dataset').DatasetResponse | null) => void;
  generateMockSchema: () => void;
}

export const useWorkspaceStore = create<WorkspaceState>((set) => ({
  prompt: '',
  datasetSize: 1000,
  dirtyLevel: 'CLEAN',
  exportFormat: 'CSV',
  isGenerating: false,
  schemaData: null,
  datasetData: null,
  
  setPrompt: (prompt) => set({ prompt }),
  setDatasetSize: (datasetSize) => set({ datasetSize }),
  setDirtyLevel: (dirtyLevel) => set({ dirtyLevel }),
  setExportFormat: (exportFormat) => set({ exportFormat }),
  setIsGenerating: (isGenerating) => set({ isGenerating }),
  setSchemaData: (schemaData) => set({ schemaData }),
  setDatasetData: (datasetData) => set({ datasetData }),
  
  generateMockSchema: () => {
    set({ isGenerating: true });
    setTimeout(() => {
      set({
        isGenerating: false,
        schemaData: {
          id: 'mock-1',
          title: 'E-commerce Mock',
          tables: [
            {
              id: 't1',
              name: 'users',
              columns: [
                { id: 'c1', name: 'id', type: 'uuid', isPrimaryKey: true },
                { id: 'c2', name: 'email', type: 'varchar' },
                { id: 'c3', name: 'created_at', type: 'timestamp' }
              ]
            },
            {
              id: 't2',
              name: 'orders',
              columns: [
                { id: 'c4', name: 'id', type: 'uuid', isPrimaryKey: true },
                { id: 'c5', name: 'user_id', type: 'uuid', foreignKey: { targetTable: 'users', targetColumn: 'id' } },
                { id: 'c6', name: 'total', type: 'decimal' }
              ]
            }
          ]
        },
        datasetData: {
          schemaId: 'mock-1',
          tables: [
            {
              tableName: 'users',
              columns: [
                { name: 'id', type: 'uuid' },
                { name: 'email', type: 'varchar' },
                { name: 'created_at', type: 'timestamp' }
              ],
              rows: [
                { id: 'usr-1', email: 'john@example.com', created_at: '2023-01-01' },
                { id: 'usr-2', email: 'jane@example.com', created_at: '2023-01-02' },
                { id: 'usr-3', email: 'bob@example.com', created_at: '2023-01-03' }
              ]
            },
            {
              tableName: 'orders',
              columns: [
                { name: 'id', type: 'uuid' },
                { name: 'user_id', type: 'uuid' },
                { name: 'total', type: 'decimal' }
              ],
              rows: [
                { id: 'ord-1', user_id: 'usr-1', total: 100.50 },
                { id: 'ord-2', user_id: 'usr-2', total: 250.00 },
                { id: 'ord-3', user_id: 'usr-1', total: null, _corrupted_total: true, _original_total: 50.00 }
              ]
            }
          ]
        }
      });
    }, 1500);
  }
}));
