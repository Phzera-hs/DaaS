import { Schema, GenerationConfig } from '../types/schema';
import { DatasetResponse } from '../types/dataset';

export const mockSchema: Schema = {
  id: "schema-ecommerce-01",
  title: "E-commerce Scenario",
  description: "A relational schema for a typical e-commerce platform.",
  tables: [
    {
      id: "table-users",
      name: "users",
      description: "Platform customers",
      columns: [
        { id: "col-user-id", name: "id", type: "UUID", isPrimaryKey: true },
        { id: "col-user-name", name: "name", type: "VARCHAR" },
        { id: "col-user-email", name: "email", type: "VARCHAR", isNullable: true },
        { id: "col-user-created", name: "created_at", type: "TIMESTAMP" }
      ]
    },
    {
      id: "table-orders",
      name: "orders",
      description: "Customer orders",
      columns: [
        { id: "col-order-id", name: "id", type: "UUID", isPrimaryKey: true },
        { id: "col-order-user", name: "user_id", type: "UUID", foreignKey: { targetTable: "users", targetColumn: "id" } },
        { id: "col-order-total", name: "total_amount", type: "DECIMAL" },
        { id: "col-order-status", name: "status", type: "VARCHAR" }
      ]
    },
    {
      id: "table-payments",
      name: "payments",
      description: "Payment transactions for orders",
      columns: [
        { id: "col-payment-id", name: "id", type: "UUID", isPrimaryKey: true },
        { id: "col-payment-order", name: "order_id", type: "UUID", foreignKey: { targetTable: "orders", targetColumn: "id" } },
        { id: "col-payment-method", name: "payment_method", type: "VARCHAR" },
        { id: "col-payment-status", name: "status", type: "VARCHAR" }
      ]
    }
  ]
};

export const mockDatasetPreview: DatasetResponse = {
  schemaId: "schema-ecommerce-01",
  tables: [
    {
      tableName: "users",
      columns: [
        { name: "id", type: "UUID" },
        { name: "name", type: "VARCHAR" },
        { name: "email", type: "VARCHAR", isCorrupted: true }, // Simulating chaos/dirty data
        { name: "created_at", type: "TIMESTAMP" }
      ],
      rows: [
        { id: "u-1", name: "Alice", email: "alice@example.com", created_at: "2023-01-01T10:00:00Z" },
        { id: "u-2", name: "Bob", email: null, created_at: "2023-01-02T11:30:00Z" }, // Null corrupted
        { id: "u-3", name: "Charlie", email: "invalid-email-format", created_at: "2023-01-03T09:15:00Z" } // Corrupted formatting
      ]
    }
  ]
};

export const mockConfig: GenerationConfig = {
  promptText: "E-commerce platform with users, orders, and payments.",
  datasetSize: 1000,
  dirtyLevel: 'CHAOS',
  exportFormat: 'CSV'
};
