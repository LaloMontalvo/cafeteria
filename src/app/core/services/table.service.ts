// ==========================================
// Table Service — Servicio de Mesas (con Persistencia Local)
// ==========================================

import { Injectable, signal, computed } from '@angular/core';
import { CafeTable, TableStatus } from '../models/table.model';
import { MOCK_TABLES } from '../mock/mock-data';

@Injectable({ providedIn: 'root' })
export class TableService {
  private tables = signal<CafeTable[]>(this.loadFromStorage());

  readonly allTables = this.tables.asReadonly();
  readonly availableCount = computed(() => this.tables().filter(t => t.status === 'available').length);
  readonly occupiedCount = computed(() => this.tables().filter(t => t.status === 'occupied').length);
  readonly reservedCount = computed(() => this.tables().filter(t => t.status === 'reserved').length);
  readonly billingCount = computed(() => this.tables().filter(t => t.status === 'billing').length);
  readonly totalTables = computed(() => this.tables().length);

  constructor() {
    window.addEventListener('storage', (event) => {
      if (event.key === 'cafe_tables') {
        this.tables.set(this.loadFromStorage());
      }
    });
  }

  private loadFromStorage(): CafeTable[] {
    const saved = localStorage.getItem('cafe_tables');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error loading cafe_tables:', e);
      }
    }
    localStorage.setItem('cafe_tables', JSON.stringify(MOCK_TABLES));
    return [...MOCK_TABLES];
  }

  private saveToStorage(list: CafeTable[]): void {
    localStorage.setItem('cafe_tables', JSON.stringify(list));
  }

  getTable(id: string): CafeTable | undefined {
    return this.tables().find(t => t.id === id);
  }

  getTableByNumber(num: number): CafeTable | undefined {
    return this.tables().find(t => t.number === num);
  }

  updateStatus(id: string, status: TableStatus): void {
    this.tables.update(list => {
      const updated = list.map(t => t.id === id ? { ...t, status } : t);
      this.saveToStorage(updated);
      return updated;
    });
  }

  addTable(table: CafeTable): void {
    this.tables.update(list => {
      const updated = [...list, { ...table, id: 't' + Date.now() }];
      this.saveToStorage(updated);
      return updated;
    });
  }

  updateTable(updated: CafeTable): void {
    this.tables.update(list => {
      const listUpdated = list.map(t => t.id === updated.id ? { ...updated } : t);
      this.saveToStorage(listUpdated);
      return listUpdated;
    });
  }

  deleteTable(id: string): void {
    this.tables.update(list => {
      const updated = list.filter(t => t.id !== id);
      this.saveToStorage(updated);
      return updated;
    });
  }

  getTablesByZone(zone: string): CafeTable[] {
    return this.tables().filter(t => t.zone === zone);
  }

  getZones(): string[] {
    return [...new Set(this.tables().map(t => t.zone))];
  }
}
