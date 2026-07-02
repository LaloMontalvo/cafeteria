import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { ProductService } from '../../../core/services/product.service';
import { Product, Category } from '../../../core/models/product.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  searchQuery = '';
  selectedCategory = '';
  showModal = false;
  editingProduct: Product | null = null;

  // Form fields
  formName = '';
  formCategory = '';
  formPrice: number = 0;
  formDescription = '';
  formImage = '';
  formAvailable = true;

  constructor(public productService: ProductService) {}

  get filteredProducts(): Product[] {
    let products = this.productService.allProducts();
    if (this.searchQuery) {
      products = this.productService.searchProducts(this.searchQuery);
    }
    if (this.selectedCategory) {
      products = products.filter(p => p.categoryId === this.selectedCategory);
    }
    return products;
  }

  get categories(): Category[] {
    return this.productService.allCategories();
  }

  openCreateModal(): void {
    this.editingProduct = null;
    this.resetForm();
    this.showModal = true;
  }

  openEditModal(product: Product): void {
    this.editingProduct = product;
    this.formName = product.name;
    this.formCategory = product.categoryId;
    this.formPrice = product.price;
    this.formDescription = product.description;
    this.formImage = product.imageUrl || '';
    this.formAvailable = product.available;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.editingProduct = null;
    this.resetForm();
  }

  saveProduct(): void {
    if (!this.formName || !this.formCategory || !this.formPrice) return;

    if (this.editingProduct) {
      this.productService.updateProduct({
        ...this.editingProduct,
        name: this.formName,
        categoryId: this.formCategory,
        price: this.formPrice,
        description: this.formDescription,
        image: this.editingProduct.image,
        imageUrl: this.formImage || '',
        available: this.formAvailable
      });
    } else {
      this.productService.addProduct({
        id: '',
        name: this.formName,
        categoryId: this.formCategory,
        price: this.formPrice,
        description: this.formDescription,
        image: 'coffee',
        imageUrl: this.formImage || '',
        available: this.formAvailable,
        createdAt: new Date()
      });
    }
    this.closeModal();
  }

  deleteProduct(id: string): void {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this.productService.deleteProduct(id);
    }
  }

  toggleAvailability(id: string): void {
    this.productService.toggleAvailability(id);
  }

  private resetForm(): void {
    this.formName = '';
    this.formCategory = '';
    this.formPrice = 0;
    this.formDescription = '';
    this.formImage = '';
    this.formAvailable = true;
  }
}
