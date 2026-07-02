import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { NotificationService } from '../../../core/services/notification.service';

interface NavItem {
  icon: string;
  label: string;
  route: string;
  roles: string[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Input() collapsed = false;
  @Output() collapsedChange = new EventEmitter<boolean>();

  constructor(
    public auth: AuthService,
    public notifService: NotificationService
  ) {}

  navItems: NavItem[] = [
    { icon: 'dashboard', label: 'Dashboard', route: '/dashboard', roles: ['admin'] },
    { icon: 'table_restaurant', label: 'Mesas', route: '/tables', roles: ['admin', 'waiter'] },
    { icon: 'receipt_long', label: 'Órdenes', route: '/orders', roles: ['admin', 'waiter'] },
    { icon: 'restaurant_menu', label: 'Productos', route: '/products', roles: ['admin'] },
    { icon: 'soup_kitchen', label: 'Cocina', route: '/kitchen', roles: ['admin', 'kitchen'] },
    { icon: 'people', label: 'Usuarios', route: '/users', roles: ['admin'] },
    { icon: 'bar_chart', label: 'Reportes', route: '/reports', roles: ['admin'] },
    { icon: 'notifications', label: 'Notificaciones', route: '/notifications', roles: ['admin', 'waiter', 'kitchen'] },
  ];

  get visibleItems(): NavItem[] {
    const role = this.auth.userRole();
    if (!role) return [];
    return this.navItems.filter(item => item.roles.includes(role));
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.collapsedChange.emit(this.collapsed);
  }

  logout(): void {
    this.auth.logout();
  }
}
