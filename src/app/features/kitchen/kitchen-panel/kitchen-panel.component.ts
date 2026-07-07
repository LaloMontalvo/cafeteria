import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { OrderService } from '../../../core/services/order.service';
import { NotificationService } from '../../../core/services/notification.service';
import { Order, OrderStatus } from '../../../core/models/order.model';

@Component({
  selector: 'app-kitchen-panel',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './kitchen-panel.component.html',
  styleUrl: './kitchen-panel.component.css'
})
export class KitchenPanelComponent {
  filterStatus: string = 'pending';

  constructor(
    public orderService: OrderService,
    private notifService: NotificationService
  ) {}

  get filteredOrders(): Order[] {
    if (this.filterStatus === 'all') return this.orderService.activeOrders();
    return this.orderService.getOrdersByStatus(this.filterStatus as OrderStatus);
  }

  getStatusLabel(status: string): string {
    const map: Record<string, string> = {
      pending: 'Pendiente', preparing: 'En preparación',
      ready: 'Listo', delivered: 'Entregado'
    };
    return map[status] || status;
  }

  getStatusColor(status: string): string {
    const map: Record<string, string> = {
      pending: '#FF9800', preparing: '#2196F3', ready: '#4CAF50', delivered: '#9E9E9E'
    };
    return map[status] || '#9E9E9E';
  }

  getMinutesAgo(date: Date): number {
    return Math.floor((Date.now() - new Date(date).getTime()) / 60000);
  }

  getTimeClass(date: Date): string {
    const min = this.getMinutesAgo(date);
    if (min > 30) return 'time-critical';
    if (min > 15) return 'time-warning';
    return 'time-normal';
  }

  advanceStatus(order: Order): void {
    const flow: Record<string, OrderStatus> = {
      pending: 'preparing', preparing: 'ready', ready: 'delivered'
    };
    const next = flow[order.status];
    if (!next) return;

    this.orderService.updateOrderStatus(order.id, next);

    const isDineIn = order.tableNumber > 0;
    const clientTarget = order.accountId || order.waiterId;

    if (next === 'preparing') {
      const msg = isDineIn ?
        `¡Tu pedido en Mesa ${order.tableNumber} se está preparando en cocina!` :
        `¡Tu pedido para llevar está en preparación en cocina!`;

      this.notifService.addNotification({
        type: 'new_order',
        title: '👨‍🍳 Pedido en Preparación',
        message: msg,
        read: false,
        targetUserId: clientTarget,
        targetRole: 'client',
        orderId: order.id,
        tableNumber: order.tableNumber
      });
    } else if (next === 'ready') {
      const msg = isDineIn ?
        `¡Tu pedido está listo! Te lo llevamos de inmediato a la Mesa ${order.tableNumber}.` :
        `¡Tu pedido está listo para entrega / recolección en mostrador!`;

      // Notification for Client
      this.notifService.addNotification({
        type: 'order_ready',
        title: '🎉 ¡Tu Pedido está Listo!',
        message: msg,
        read: false,
        targetUserId: clientTarget,
        targetRole: 'client',
        orderId: order.id,
        tableNumber: order.tableNumber
      });

      // Notification for Waiter / Reception
      this.notifService.addNotification({
        type: 'order_ready',
        title: '🔔 Orden Lista en Cocina',
        message: isDineIn ? `Mesa ${order.tableNumber} lista para servir.` : `Orden #${order.id} lista para entrega en mostrador.`,
        read: false,
        targetRole: 'waiter',
        orderId: order.id,
        tableNumber: order.tableNumber
      });
    } else if (next === 'delivered') {
      const msg = isDineIn ?
        `¡Tu pedido fue servido en Mesa ${order.tableNumber}! ¡Buen provecho!` :
        `¡Tu pedido fue entregado exitosamente! ¡Gracias por elegir Café Aroma!`;

      this.notifService.addNotification({
        type: 'order_ready',
        title: '✅ Pedido Entregado',
        message: msg,
        read: false,
        targetUserId: clientTarget,
        targetRole: 'client',
        orderId: order.id,
        tableNumber: order.tableNumber
      });
    }
  }

  getNextStatusLabel(status: string): string {
    const map: Record<string, string> = {
      pending: 'Empezar a preparar', preparing: 'Marcar como listo', ready: 'Marcar como entregado'
    };
    return map[status] || '';
  }

  getNextStatusIcon(status: string): string {
    const map: Record<string, string> = {
      pending: 'play_arrow', preparing: 'check_circle', ready: 'delivery_dining'
    };
    return map[status] || 'arrow_forward';
  }
}
