import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { OrderService } from '../../../core/services/order.service';
import { Order, OrderStatus } from '../../../core/models/order.model';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})
export class OrderListComponent {
  filterStatus = '';
  selectedOrder: Order | null = null;

  statuses: { value: string; label: string; color: string }[] = [
    { value: '', label: 'Todos', color: '#6F4E37' },
    { value: 'pending', label: 'Pendientes', color: '#FF9800' },
    { value: 'preparing', label: 'En preparación', color: '#2196F3' },
    { value: 'ready', label: 'Listos', color: '#4CAF50' },
    { value: 'delivered', label: 'Entregados', color: '#9E9E9E' },
  ];

  constructor(public orderService: OrderService) {}

  get filteredOrders(): Order[] {
    if (!this.filterStatus) return this.orderService.allOrders();
    return this.orderService.getOrdersByStatus(this.filterStatus as OrderStatus);
  }

  getStatusLabel(status: string): string {
    const map: Record<string, string> = {
      pending: 'Pendiente', preparing: 'En preparación',
      ready: 'Listo', delivered: 'Entregado', cancelled: 'Cancelado'
    };
    return map[status] || status;
  }

  getStatusColor(status: string): string {
    const map: Record<string, string> = {
      pending: '#FF9800', preparing: '#2196F3',
      ready: '#4CAF50', delivered: '#9E9E9E', cancelled: '#E53935'
    };
    return map[status] || '#9E9E9E';
  }

  getMinutesAgo(date: Date): number {
    return Math.floor((Date.now() - new Date(date).getTime()) / 60000);
  }

  selectOrder(order: Order): void {
    this.selectedOrder = this.selectedOrder?.id === order.id ? null : order;
  }

  changeStatus(orderId: string, status: OrderStatus): void {
    this.orderService.updateOrderStatus(orderId, status);
    if (this.selectedOrder?.id === orderId) {
      this.selectedOrder = this.orderService.getOrder(orderId) || null;
    }
  }
}
