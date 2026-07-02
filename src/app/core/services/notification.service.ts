// ==========================================
// Notification Service — Servicio de Notificaciones
// ==========================================

import { Injectable, signal, computed } from '@angular/core';
import { AppNotification } from '../models/notification.model';
import { MOCK_NOTIFICATIONS } from '../mock/mock-data';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private notifications = signal<AppNotification[]>([...MOCK_NOTIFICATIONS]);

  readonly allNotifications = this.notifications.asReadonly();
  readonly unreadCount = computed(() => this.notifications().filter(n => !n.read).length);

  getNotificationsForUser(userId: string): AppNotification[] {
    return this.notifications()
      .filter(n => n.targetUserId === userId || n.targetUserId === '')
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  getNotificationsByRole(role: string): AppNotification[] {
    return this.notifications()
      .filter(n => n.targetRole === role)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  markAsRead(id: string): void {
    this.notifications.update(list =>
      list.map(n => n.id === id ? { ...n, read: true } : n)
    );
  }

  markAllAsRead(): void {
    this.notifications.update(list =>
      list.map(n => ({ ...n, read: true }))
    );
  }

  addNotification(notification: Omit<AppNotification, 'id' | 'createdAt'>): void {
    const newNotif: AppNotification = {
      ...notification,
      id: 'n' + Date.now(),
      createdAt: new Date()
    };
    this.notifications.update(list => [newNotif, ...list]);
  }

  deleteNotification(id: string): void {
    this.notifications.update(list => list.filter(n => n.id !== id));
  }
}
