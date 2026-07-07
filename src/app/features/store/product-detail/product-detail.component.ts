import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { CartService } from '../../../core/services/cart.service';
import { Product } from '../../../core/models/product.model';

interface ProductOption {
  label: string;
  icon: string;
  selected: boolean;
}

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  product: Product | undefined;
  quantity = 1;
  notes = '';
  added = false;

  options: ProductOption[] = [
    { label: 'Sin azúcar', icon: 'block', selected: false },
    { label: 'Extra caliente', icon: 'whatshot', selected: false },
    { label: 'Leche deslactosada', icon: 'water_drop', selected: false },
    { label: 'Leche de almendras', icon: 'eco', selected: false },
    { label: 'Descafeinado', icon: 'coffee', selected: false },
    { label: 'Para llevar', icon: 'takeout_dining', selected: false }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public productService: ProductService,
    private cart: CartService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.product = this.productService.getProduct(params['id']);
      if (!this.product) {
        this.router.navigate(['/store/menu']);
      }
    });
  }

  get selectedOptions(): string[] {
    return this.options.filter(o => o.selected).map(o => o.label);
  }

  toggleOption(option: ProductOption): void {
    option.selected = !option.selected;
  }

  incrementQty(): void {
    if (this.quantity < 20) this.quantity++;
  }

  decrementQty(): void {
    if (this.quantity > 1) this.quantity--;
  }

  addToCart(): void {
    if (!this.product) return;
    this.cart.addItem({
      productId: this.product.id,
      productName: this.product.name,
      price: this.product.price,
      quantity: this.quantity,
      notes: this.notes,
      options: this.selectedOptions,
      image: this.product.image
    });
    this.added = true;
    setTimeout(() => {
      this.router.navigate(['/store/menu']);
    }, 1200);
  }
}
