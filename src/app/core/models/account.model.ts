// ==========================================
// Account & Payment Models — Modelos de Cuenta y Pago
// ==========================================

export type AccountStatus = 'open' | 'paid' | 'closed';
export type PaymentMethod = 'cash' | 'card' | 'transfer';

export interface Account {
  id: string;
  tableId: string;
  tableNumber: number;
  orderIds: string[];
  subtotal: number;
  tax: number;          // IVA u otros impuestos
  tip: number;
  total: number;
  status: AccountStatus;
  openedAt: Date;
  closedAt?: Date;
  waiterId: string;
  waiterName: string;
}

export interface Payment {
  id: string;
  accountId: string;
  amount: number;
  method: PaymentMethod;
  reference?: string;
  paidAt: Date;
}
