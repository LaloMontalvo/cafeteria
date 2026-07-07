// ==========================================
// Notification Service — Servicio de Notificaciones (con Persistencia Local)
// ==========================================

import { Injectable, signal, computed } from '@angular/core';
import { AppNotification } from '../models/notification.model';
import { MOCK_NOTIFICATIONS } from '../mock/mock-data';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private notifications = signal<AppNotification[]>(this.loadFromStorage());

  readonly allNotifications = this.notifications.asReadonly();
  readonly unreadCount = computed(() => this.notifications().filter(n => !n.read).length);

  constructor() {
    window.addEventListener('storage', (event) => {
      if (event.key === 'cafe_notifications') {
        this.notifications.set(this.loadFromStorage());
      }
    });
  }

  private loadFromStorage(): AppNotification[] {
    const saved = localStorage.getItem('cafe_notifications');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.map((n: any) => ({
          ...n,
          createdAt: new Date(n.createdAt)
        }));
      } catch (e) {
        console.error('Error loading notifications from storage:', e);
      }
    }
    localStorage.setItem('cafe_notifications', JSON.stringify(MOCK_NOTIFICATIONS));
    return [...MOCK_NOTIFICATIONS];
  }

  private saveToStorage(list: AppNotification[]): void {
    localStorage.setItem('cafe_notifications', JSON.stringify(list));
  }

  getNotificationsForUser(userId: string): AppNotification[] {
    return this.notifications()
      .filter(n => n.targetUserId === userId || n.targetUserId === '')
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  getNotificationsByRole(role: string): AppNotification[] {
    return this.notifications()
      .filter(n => !n.targetRole || n.targetRole === role || role === 'admin')
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  markAsRead(id: string): void {
    this.notifications.update(list => {
      const updated = list.map(n => n.id === id ? { ...n, read: true } : n);
      this.saveToStorage(updated);
      return updated;
    });
  }

  markAllAsRead(): void {
    this.notifications.update(list => {
      const updated = list.map(n => ({ ...n, read: true }));
      this.saveToStorage(updated);
      return updated;
    });
  }

  addNotification(notification: Omit<AppNotification, 'id' | 'createdAt'>): void {
    const newNotif: AppNotification = {
      ...notification,
      id: 'n' + Date.now(),
      createdAt: new Date()
    };
    this.notifications.update(list => {
      const updated = [newNotif, ...list];
      this.saveToStorage(updated);
      return updated;
    });
  }

  deleteNotification(id: string): void {
    this.notifications.update(list => {
      const updated = list.filter(n => n.id !== id);
      this.saveToStorage(updated);
      return updated;
    });
  }
}
