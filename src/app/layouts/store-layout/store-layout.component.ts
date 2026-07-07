import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../core/services/cart.service';
import { NotificationService } from '../../core/services/notification.service';
import { AppNotification } from '../../core/models/notification.model';

@Component({
  selector: 'app-store-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './store-layout.component.html',
  styleUrl: './store-layout.component.css'
})
export class StoreLayoutComponent {
  mobileMenuOpen = false;
  showNotifications = false;

  constructor(
    public auth: AuthService,
    public cart: CartService,
    public notifService: NotificationService,
    private router: Router
  ) {}

  get clientNotifications(): AppNotification[] {
    const userId = this.auth.user()?.id;
    if (!userId) return [];
    return this.notifService.allNotifications().filter(n =>
      n.targetUserId === userId || n.targetRole === 'client'
    );
  }

  get unreadClientNotificationsCount(): number {
    return this.clientNotifications.filter(n => !n.read).length;
  }

  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
  }

  markNotificationRead(id: string): void {
    this.notifService.markAsRead(id);
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/store']);
  }
}
