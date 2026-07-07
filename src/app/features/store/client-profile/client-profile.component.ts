import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { OrderService } from '../../../core/services/order.service';

@Component({
  selector: 'app-client-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './client-profile.component.html',
  styleUrl: './client-profile.component.css'
})
export class ClientProfileComponent {
  editMode = false;
  editName = '';
  editEmail = '';
  darkMode = false;

  constructor(
    public auth: AuthService,
    public orderService: OrderService,
    private router: Router
  ) {
    this.editName = this.auth.userName();
    this.editEmail = this.auth.user()?.email ?? '';
    this.darkMode = document.body.classList.contains('dark-mode');
  }

  get purchaseHistory() {
    return this.orderService.allOrders().filter(o => o.status === 'delivered').slice(0, 10);
  }

  get totalSpent(): number {
    return this.purchaseHistory.reduce((sum, o) => sum + o.total, 0);
  }

  toggleEdit(): void {
    this.editMode = !this.editMode;
  }

  saveProfile(): void {
    // In a real app, we'd update the user profile here
    this.editMode = false;
  }

  toggleDarkMode(): void {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark-mode', this.darkMode);
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
