// ==========================================
// Order Service — Servicio de Órdenes (con Persistencia Local)
// ==========================================

import { Injectable, signal, computed } from '@angular/core';
import { Order, OrderStatus } from '../models/order.model';
import { MOCK_ORDERS } from '../mock/mock-data';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private orders = signal<Order[]>(this.loadFromStorage());

  readonly allOrders = this.orders.asReadonly();
  readonly pendingOrders = computed(() => this.orders().filter(o => o.status === 'pending'));
  readonly preparingOrders = computed(() => this.orders().filter(o => o.status === 'preparing'));
  readonly readyOrders = computed(() => this.orders().filter(o => o.status === 'ready'));
  readonly deliveredOrders = computed(() => this.orders().filter(o => o.status === 'delivered'));
  readonly activeOrders = computed(() => this.orders().filter(o => o.status !== 'delivered' && o.status !== 'cancelled'));
  readonly totalOrdersToday = computed(() => this.orders().length);

  constructor() {
    window.addEventListener('storage', (event) => {
      if (event.key === 'cafe_orders') {
        this.orders.set(this.loadFromStorage());
      }
    });
  }

  private loadFromStorage(): Order[] {
    const saved = localStorage.getItem('cafe_orders');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.map((o: any) => ({
          ...o,
          createdAt: new Date(o.createdAt),
          updatedAt: new Date(o.updatedAt)
        }));
      } catch (e) {
        console.error('Error reading cafe_orders from storage:', e);
      }
    }
    localStorage.setItem('cafe_orders', JSON.stringify(MOCK_ORDERS));
    return [...MOCK_ORDERS];
  }

  private saveToStorage(list: Order[]): void {
    localStorage.setItem('cafe_orders', JSON.stringify(list));
  }

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

  addOrder(order: Order): Order {
    const newOrder: Order = {
      ...order,
      id: order.id || 'ord' + Date.now(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.orders.update(list => {
      const updated = [newOrder, ...list];
      this.saveToStorage(updated);
      return updated;
    });
    return newOrder;
  }

  updateOrderStatus(id: string, status: OrderStatus): void {
    this.orders.update(list => {
      const updated = list.map(o =>
        o.id === id ? { ...o, status, updatedAt: new Date() } : o
      );
      this.saveToStorage(updated);
      return updated;
    });
  }

  deleteOrder(id: string): void {
    this.orders.update(list => {
      const updated = list.filter(o => o.id !== id);
      this.saveToStorage(updated);
      return updated;
    });
  }

  getMinutesSinceCreation(order: Order): number {
    return Math.floor((new Date().getTime() - new Date(order.createdAt).getTime()) / 60000);
  }
}
