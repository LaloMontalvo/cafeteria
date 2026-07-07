import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';
import { AuthService } from '../../../core/services/auth.service';
import { OrderService } from '../../../core/services/order.service';
import { TableService } from '../../../core/services/table.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  customerName = '';
  customerEmail = '';
  customerPhone = '';
  orderType: 'takeaway' | 'dine-in' = 'takeaway';
  selectedTable = '';
  paymentMethod: 'cash' | 'card' | 'transfer' = 'cash';
  confirmed = false;
  loading = false;

  constructor(
    public cart: CartService,
    public auth: AuthService,
    private orderService: OrderService,
    public tableService: TableService,
    private notificationService: NotificationService,
    private router: Router
  ) {
    if (auth.isLoggedIn()) {
      this.customerName = auth.userName();
      this.customerEmail = auth.user()?.email ?? '';
    }
  }

  get availableTables() {
    return this.tableService.allTables().filter(t => t.status === 'available');
  }

  async confirmOrder(): Promise<void> {
    if (!this.customerName.trim() || !this.customerEmail.trim()) return;

    this.loading = true;
    await new Promise(r => setTimeout(r, 800));

    // Auto-register or log in client if not logged in
    let clientUser = this.auth.user();
    if (!clientUser) {
      clientUser = this.auth.registerOrLoginClient(this.customerName.trim(), this.customerEmail.trim(), this.customerPhone.trim());
    }

    const items = this.cart.cartItems().map(item => ({
      productId: item.productId,
      productName: item.productName,
      quantity: item.quantity,
      unitPrice: item.price,
      notes: [item.notes, ...item.options].filter(Boolean).join(', '),
      subtotal: item.price * item.quantity
    }));

    const tableNum = this.orderType === 'dine-in' && this.selectedTable ?
      (this.tableService.allTables().find(t => t.id === this.selectedTable)?.number ?? 0) : 0;

    const newOrder = this.orderService.addOrder({
      id: '',
      tableId: this.selectedTable || 'takeaway',
      tableNumber: tableNum,
      waiterId: clientUser.id,
      waiterName: clientUser.name,
      items,
      status: 'pending',
      notes: `${this.orderType === 'takeaway' ? 'Para llevar' : 'En mesa ' + tableNum} · Pago: ${this.paymentMethod.toUpperCase()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
      total: this.cart.total(),
      accountId: clientUser.id
    });

    // Update table status if dine-in
    if (this.orderType === 'dine-in' && this.selectedTable) {
      this.tableService.updateStatus(this.selectedTable, 'occupied');
    }

    // Send notifications to Reception (waiter), Kitchen, and Admin
    this.notificationService.addNotification({
      title: '🛒 Nuevo Pedido Web',
      message: `El cliente ${clientUser.name} realizó una compra por $${newOrder.total.toFixed(2)} (${items.length} producto/s)`,
      type: 'new_order',
      targetRole: 'waiter',
      read: false
    });

    this.notificationService.addNotification({
      title: '👨‍🍳 Nuevo Pedido para Cocina',
      message: `Orden #${newOrder.id} (${items.map(i => `${i.quantity}x ${i.productName}`).join(', ')})`,
      type: 'new_order',
      targetRole: 'kitchen',
      read: false
    });

    this.cart.clear();
    this.confirmed = true;
    this.loading = false;
  }
}
