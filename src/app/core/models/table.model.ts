// ==========================================
// Table Model — Modelo de Mesa
// ==========================================

export type TableStatus = 'available' | 'occupied' | 'reserved' | 'billing';

export interface CafeTable {
  id: string;
  number: number;
  capacity: number;
  status: TableStatus;
  zone: string;         // e.g. "Interior", "Terraza"
  currentAccountId?: string;
}
