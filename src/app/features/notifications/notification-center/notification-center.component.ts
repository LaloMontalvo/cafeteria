import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { NotificationService } from '../../../core/services/notification.service';
import { AppNotification } from '../../../core/models/notification.model';

@Component({
  selector: 'app-notification-center',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './notification-center.component.html',
  styleUrl: './notification-center.component.css'
})
export class NotificationCenterComponent {

  constructor(public notifService: NotificationService) {}

  get notifications(): AppNotification[] {
    return this.notifService.allNotifications()
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  getIcon(type: string): string {
    const map: Record<string, string> = {
      order_ready: 'check_circle', new_order: 'receipt_long',
      payment: 'payments', system: 'info'
    };
    return map[type] || 'info';
  }

  getIconColor(type: string): string {
    const map: Record<string, string> = {
      order_ready: '#4CAF50', new_order: '#2196F3',
      payment: '#6F4E37', system: '#FF9800'
    };
    return map[type] || '#9E9E9E';
  }

  getTimeAgo(date: Date): string {
    const min = Math.floor((Date.now() - new Date(date).getTime()) / 60000);
    if (min < 1) return 'Ahora';
    if (min < 60) return `Hace ${min} min`;
    const hrs = Math.floor(min / 60);
    if (hrs < 24) return `Hace ${hrs}h`;
    return `Hace ${Math.floor(hrs / 24)}d`;
  }

  markAsRead(id: string): void { this.notifService.markAsRead(id); }
  markAllAsRead(): void { this.notifService.markAllAsRead(); }
  deleteNotif(id: string): void { this.notifService.deleteNotification(id); }
}
