import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { CartService } from '../../../core/services/cart.service';
import { Product, Category } from '../../../core/models/product.model';

@Component({
  selector: 'app-store-menu',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './store-menu.component.html',
  styleUrl: './store-menu.component.css'
})
export class StoreMenuComponent implements OnInit {
  searchQuery = '';
  selectedCategory = '';
  addedProductId = '';

  constructor(
    public productService: ProductService,
    private cart: CartService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['category']) {
        this.selectedCategory = params['category'];
      }
    });
  }

  get categories(): Category[] {
    return this.productService.allCategories();
  }

  get filteredProducts(): Product[] {
    let products = this.productService.availableProducts();
    if (this.selectedCategory) {
      products = products.filter(p => p.categoryId === this.selectedCategory);
    }
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      products = products.filter(p =>
        p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      );
    }
    return products;
  }

  selectCategory(catId: string): void {
    this.selectedCategory = this.selectedCategory === catId ? '' : catId;
  }

  quickAdd(product: Product): void {
    this.cart.addItem({
      productId: product.id,
      productName: product.name,
      price: product.price,
      quantity: 1,
      notes: '',
      options: [],
      image: product.image
    });
    this.addedProductId = product.id;
    setTimeout(() => this.addedProductId = '', 1500);
  }
}
