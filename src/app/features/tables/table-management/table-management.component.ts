import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { StatCardComponent } from '../../../shared/components/stat-card/stat-card.component';
import { TableService } from '../../../core/services/table.service';
import { OrderService } from '../../../core/services/order.service';
import { CafeTable, TableStatus } from '../../../core/models/table.model';

@Component({
  selector: 'app-table-management',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, StatCardComponent],
  templateUrl: './table-management.component.html',
  styleUrl: './table-management.component.css'
})
export class TableManagementComponent {
  selectedZone = '';
  showModal = false;
  editingTable: CafeTable | null = null;
  selectedTable: CafeTable | null = null;

  formNumber = 0;
  formCapacity = 2;
  formZone = 'Interior';
  formStatus: TableStatus = 'available';

  constructor(
    public tableService: TableService,
    public orderService: OrderService
  ) {}

  get filteredTables(): CafeTable[] {
    const tables = this.tableService.allTables();
    if (!this.selectedZone) return tables;
    return tables.filter(t => t.zone === this.selectedZone);
  }

  getStatusLabel(status: TableStatus): string {
    const map: Record<TableStatus, string> = {
      available: 'Disponible', occupied: 'Ocupada', reserved: 'Reservada', billing: 'En cuenta'
    };
    return map[status];
  }

  getStatusColor(status: TableStatus): string {
    const map: Record<TableStatus, string> = {
      available: '#4CAF50', occupied: '#E53935', reserved: '#FF9800', billing: '#2196F3'
    };
    return map[status];
  }

  getTableOrders(tableId: string) {
    return this.orderService.getOrdersByTable(tableId);
  }

  selectTable(table: CafeTable): void {
    this.selectedTable = this.selectedTable?.id === table.id ? null : table;
  }

  changeStatus(table: CafeTable, status: TableStatus): void {
    this.tableService.updateStatus(table.id, status);
  }

  openCreateModal(): void {
    this.editingTable = null;
    this.formNumber = this.tableService.allTables().length + 1;
    this.formCapacity = 2;
    this.formZone = 'Interior';
    this.formStatus = 'available';
    this.showModal = true;
  }

  openEditModal(table: CafeTable): void {
    this.editingTable = table;
    this.formNumber = table.number;
    this.formCapacity = table.capacity;
    this.formZone = table.zone;
    this.formStatus = table.status;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.editingTable = null;
  }

  saveTable(): void {
    if (!this.formNumber || !this.formCapacity) return;

    if (this.editingTable) {
      this.tableService.updateTable({
        ...this.editingTable,
        number: this.formNumber,
        capacity: this.formCapacity,
        zone: this.formZone,
        status: this.formStatus
      });
    } else {
      this.tableService.addTable({
        id: '', number: this.formNumber, capacity: this.formCapacity,
        zone: this.formZone, status: 'available'
      });
    }
    this.closeModal();
  }

  deleteTable(id: string): void {
    if (confirm('¿Eliminar esta mesa?')) {
      this.tableService.deleteTable(id);
      if (this.selectedTable?.id === id) this.selectedTable = null;
    }
  }
}
