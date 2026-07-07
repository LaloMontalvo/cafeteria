// ==========================================
// Cart Service — Servicio de Carrito de Compras
// ==========================================

import { Injectable, signal, computed } from '@angular/core';
import { CartItem, CartSummary } from '../models/cart.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private items = signal<CartItem[]>([]);

  readonly cartItems = this.items.asReadonly();
  readonly itemCount = computed(() => this.items().reduce((sum, i) => sum + i.quantity, 0));
  readonly subtotal = computed(() => this.items().reduce((sum, i) => sum + (i.price * i.quantity), 0));
  readonly tax = computed(() => Math.round(this.subtotal() * 0.16 * 100) / 100);
  readonly total = computed(() => Math.round((this.subtotal() + this.tax()) * 100) / 100);
  readonly isEmpty = computed(() => this.items().length === 0);

  readonly summary = computed<CartSummary>(() => ({
    items: this.items(),
    subtotal: this.subtotal(),
    tax: this.tax(),
    total: this.total(),
    itemCount: this.itemCount()
  }));

  addItem(item: CartItem): void {
    const existing = this.items().find(
      i => i.productId === item.productId && JSON.stringify(i.options) === JSON.stringify(item.options)
    );
    if (existing) {
      this.items.update(list => list.map(i =>
        i === existing ? { ...i, quantity: i.quantity + item.quantity } : i
      ));
    } else {
      this.items.update(list => [...list, { ...item }]);
    }
  }

  removeItem(index: number): void {
    this.items.update(list => list.filter((_, i) => i !== index));
  }

  updateQuantity(index: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeItem(index);
      return;
    }
    this.items.update(list => list.map((item, i) =>
      i === index ? { ...item, quantity } : item
    ));
  }

  clear(): void {
    this.items.set([]);
  }
}
