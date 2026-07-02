// ==========================================
// Order Model — Modelo de Orden
// ==========================================

export type OrderStatus = 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled';

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  notes: string;        // e.g. "Sin azúcar", "Extra caliente"
  subtotal: number;
}

export interface Order {
  id: string;
  tableId: string;
  tableNumber: number;
  waiterId: string;
  waiterName: string;
  items: OrderItem[];
  status: OrderStatus;
  notes: string;           // Notas generales del pedido
  createdAt: Date;
  updatedAt: Date;
  total: number;
  accountId: string;
}
