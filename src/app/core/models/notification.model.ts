// ==========================================
// Notification Model — Modelo de Notificación
// ==========================================

export type NotificationType = 'order_ready' | 'new_order' | 'payment' | 'system';

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  targetUserId: string;
  targetRole?: string;
  orderId?: string;
  tableNumber?: number;
  createdAt: Date;
}
