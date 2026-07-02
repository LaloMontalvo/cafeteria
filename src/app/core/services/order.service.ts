// ==========================================
// Order Service — Servicio de Órdenes
// ==========================================

import { Injectable, signal, computed } from '@angular/core';
import { Order, OrderStatus } from '../models/order.model';
import { MOCK_ORDERS } from '../mock/mock-data';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private orders = signal<Order[]>([...MOCK_ORDERS]);

  readonly allOrders = this.orders.asReadonly();
  readonly pendingOrders = computed(() => this.orders().filter(o => o.status === 'pending'));
  readonly preparingOrders = computed(() => this.orders().filter(o => o.status === 'preparing'));
  readonly readyOrders = computed(() => this.orders().filter(o => o.status === 'ready'));
  readonly deliveredOrders = computed(() => this.orders().filter(o => o.status === 'delivered'));
  readonly activeOrders = computed(() => this.orders().filter(o => o.status !== 'delivered' && o.status !== 'cancelled'));
  readonly totalOrdersToday = computed(() => this.orders().length);

  getOrder(id: string): Order | undefined {
    return this.orders().find(o => o.id === id);
  }

  getOrdersByTable(tableId: string): Order[] {
    return this.orders().filter(o => o.tableId === tableId);
  }

  getOrdersByWaiter(waiterId: string): Order[] {
    return this.orders().filter(o => o.waiterId === waiterId);
  }

  getOrdersByStatus(status: OrderStatus): Order[] {
    return this.orders().filter(o => o.status === status);
  }

  addOrder(order: Order): void {
    const newOrder = { ...order, id: 'ord' + Date.now(), createdAt: new Date(), updatedAt: new Date() };
    this.orders.update(list => [newOrder, ...list]);
  }

  updateOrderStatus(id: string, status: OrderStatus): void {
    this.orders.update(list => list.map(o =>
      o.id === id ? { ...o, status, updatedAt: new Date() } : o
    ));
  }

  deleteOrder(id: string): void {
    this.orders.update(list => list.filter(o => o.id !== id));
  }

  getMinutesSinceCreation(order: Order): number {
    return Math.floor((new Date().getTime() - new Date(order.createdAt).getTime()) / 60000);
  }
}
