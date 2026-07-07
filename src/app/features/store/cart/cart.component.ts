import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  generalNotes = '';

  constructor(public cart: CartService) {}

  increment(index: number): void {
    const item = this.cart.cartItems()[index];
    if (item) this.cart.updateQuantity(index, item.quantity + 1);
  }

  decrement(index: number): void {
    const item = this.cart.cartItems()[index];
    if (item) this.cart.updateQuantity(index, item.quantity - 1);
  }

  remove(index: number): void {
    this.cart.removeItem(index);
  }
}
