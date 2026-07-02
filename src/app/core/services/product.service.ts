// ==========================================
// Product Service — Servicio de Productos
// ==========================================

import { Injectable, signal, computed } from '@angular/core';
import { Product, Category } from '../models/product.model';
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from '../mock/mock-data';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private products = signal<Product[]>([...MOCK_PRODUCTS]);
  private categories = signal<Category[]>([...MOCK_CATEGORIES]);

  readonly allProducts = this.products.asReadonly();
  readonly allCategories = this.categories.asReadonly();
  readonly availableProducts = computed(() => this.products().filter(p => p.available));
  readonly productCount = computed(() => this.products().length);

  getProductsByCategory(categoryId: string): Product[] {
    return this.products().filter(p => p.categoryId === categoryId);
  }

  getProduct(id: string): Product | undefined {
    return this.products().find(p => p.id === id);
  }

  getCategory(id: string): Category | undefined {
    return this.categories().find(c => c.id === id);
  }

  getCategoryName(id: string): string {
    return this.categories().find(c => c.id === id)?.name ?? 'Sin categoría';
  }

  addProduct(product: Product): void {
    this.products.update(list => [...list, { ...product, id: 'p' + Date.now(), createdAt: new Date() }]);
  }

  updateProduct(updated: Product): void {
    this.products.update(list => list.map(p => p.id === updated.id ? { ...updated } : p));
  }

  deleteProduct(id: string): void {
    this.products.update(list => list.filter(p => p.id !== id));
  }

  toggleAvailability(id: string): void {
    this.products.update(list => list.map(p =>
      p.id === id ? { ...p, available: !p.available } : p
    ));
  }

  searchProducts(query: string): Product[] {
    const q = query.toLowerCase();
    return this.products().filter(p =>
      p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
    );
  }
}
