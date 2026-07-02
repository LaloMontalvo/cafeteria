// ==========================================
// Table Service — Servicio de Mesas
// ==========================================

import { Injectable, signal, computed } from '@angular/core';
import { CafeTable, TableStatus } from '../models/table.model';
import { MOCK_TABLES } from '../mock/mock-data';

@Injectable({ providedIn: 'root' })
export class TableService {
  private tables = signal<CafeTable[]>([...MOCK_TABLES]);

  readonly allTables = this.tables.asReadonly();
  readonly availableCount = computed(() => this.tables().filter(t => t.status === 'available').length);
  readonly occupiedCount = computed(() => this.tables().filter(t => t.status === 'occupied').length);
  readonly reservedCount = computed(() => this.tables().filter(t => t.status === 'reserved').length);
  readonly billingCount = computed(() => this.tables().filter(t => t.status === 'billing').length);
  readonly totalTables = computed(() => this.tables().length);

  getTable(id: string): CafeTable | undefined {
    return this.tables().find(t => t.id === id);
  }

  getTableByNumber(num: number): CafeTable | undefined {
    return this.tables().find(t => t.number === num);
  }

  updateStatus(id: string, status: TableStatus): void {
    this.tables.update(list => list.map(t =>
      t.id === id ? { ...t, status } : t
    ));
  }

  addTable(table: CafeTable): void {
    this.tables.update(list => [...list, { ...table, id: 't' + Date.now() }]);
  }

  updateTable(updated: CafeTable): void {
    this.tables.update(list => list.map(t => t.id === updated.id ? { ...updated } : t));
  }

  deleteTable(id: string): void {
    this.tables.update(list => list.filter(t => t.id !== id));
  }

  getTablesByZone(zone: string): CafeTable[] {
    return this.tables().filter(t => t.zone === zone);
  }

  getZones(): string[] {
    return [...new Set(this.tables().map(t => t.zone))];
  }
}
