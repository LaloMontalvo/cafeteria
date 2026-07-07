import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrderService } from '../../../core/services/order.service';
import { AuthService } from '../../../core/services/auth.service';
import { Order } from '../../../core/models/order.model';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css'
})
export class MyOrdersComponent {
  selectedOrder: Order | null = null;

  constructor(
    public orderService: OrderService,
    public auth: AuthService
  ) {}

  get myOrders(): Order[] {
    const user = this.auth.user();
    const userName = this.auth.userName().toLowerCase();
    const all = this.orderService.allOrders();

    if (!user) return [];

    // Filter strictly for orders belonging to this customer
    return all.filter(o =>
      (o.accountId && o.accountId === user.id) ||
      (o.waiterId && o.waiterId === user.id) ||
      (o.waiterName && o.waiterName.toLowerCase() === userName)
    );
  }

  get activeOrders(): Order[] {
    return this.myOrders.filter(o => o.status !== 'delivered' && o.status !== 'cancelled');
  }

  get pastOrders(): Order[] {
    return this.myOrders.filter(o => o.status === 'delivered');
  }

  getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      'pending': 'Pendiente',
      'preparing': 'En preparación',
      'ready': 'Listo',
      'delivered': 'Entregado',
      'cancelled': 'Cancelado'
    };
    return labels[status] || status;
  }

  getStatusIcon(status: string): string {
    const icons: Record<string, string> = {
      'pending': 'schedule',
      'preparing': 'soup_kitchen',
      'ready': 'check_circle',
      'delivered': 'done_all',
      'cancelled': 'cancel'
    };
    return icons[status] || 'info';
  }

  getTimeAgo(date: Date): string {
    const mins = Math.floor((Date.now() - new Date(date).getTime()) / 60000);
    if (mins < 1) return 'Ahora';
    if (mins < 60) return `Hace ${mins} min`;
    const hrs = Math.floor(mins / 60);
    return `Hace ${hrs}h ${mins % 60}min`;
  }

  selectOrder(order: Order): void {
    this.selectedOrder = this.selectedOrder?.id === order.id ? null : order;
  }
}
