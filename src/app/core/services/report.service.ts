// ==========================================
// Report Service — Servicio de Reportes
// ==========================================

import { Injectable, computed } from '@angular/core';
import { OrderService } from './order.service';
import { ProductService } from './product.service';
import { MOCK_DAILY_SALES, MOCK_ACCOUNTS } from '../mock/mock-data';

@Injectable({ providedIn: 'root' })
export class ReportService {

  constructor(
    private orderService: OrderService,
    private productService: ProductService
  ) {}

  getDailySales() {
    return MOCK_DAILY_SALES;
  }

  getTodaySales(): number {
    return MOCK_DAILY_SALES[MOCK_DAILY_SALES.length - 1]?.total ?? 0;
  }

  getWeekTotal(): number {
    return MOCK_DAILY_SALES.reduce((sum, d) => sum + d.total, 0);
  }

  getWeekOrders(): number {
    return MOCK_DAILY_SALES.reduce((sum, d) => sum + d.orders, 0);
  }

  getAverageTicket(): number {
    const total = this.getWeekTotal();
    const orders = this.getWeekOrders();
    return orders > 0 ? total / orders : 0;
  }

  getClosedAccounts() {
    return MOCK_ACCOUNTS.filter(a => a.status === 'paid' || a.status === 'closed');
  }

  getTopProducts(): { name: string; count: number; revenue: number }[] {
    const productMap = new Map<string, { count: number; revenue: number }>();

    for (const order of this.orderService.allOrders()) {
      for (const item of order.items) {
        const existing = productMap.get(item.productName) || { count: 0, revenue: 0 };
        existing.count += item.quantity;
        existing.revenue += item.subtotal;
        productMap.set(item.productName, existing);
      }
    }

    return Array.from(productMap.entries())
      .map(([name, data]) => ({ name, ...data }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 8);
  }

  getRevenueByCategory(): { category: string; revenue: number }[] {
    const catMap = new Map<string, number>();

    for (const order of this.orderService.allOrders()) {
      for (const item of order.items) {
        const product = this.productService.getProduct(item.productId);
        if (product) {
          const catName = this.productService.getCategoryName(product.categoryId);
          catMap.set(catName, (catMap.get(catName) || 0) + item.subtotal);
        }
      }
    }

    return Array.from(catMap.entries())
      .map(([category, revenue]) => ({ category, revenue }))
      .sort((a, b) => b.revenue - a.revenue);
  }
}
