// ==========================================
// Mock Data — Datos Simulados para Cafetería
// ==========================================

import { User } from '../models/user.model';
import { Category, Product } from '../models/product.model';
import { CafeTable } from '../models/table.model';
import { Order } from '../models/order.model';
import { Account } from '../models/account.model';
import { AppNotification } from '../models/notification.model';

// ── Usuarios ────────────────────────────────
export const MOCK_USERS: User[] = [
  {
    id: 'u1', name: 'Carlos Admin', email: 'admin@cafe.com',
    password: 'admin123', role: 'admin', avatar: '', active: true,
    createdAt: new Date('2025-01-10')
  },
  {
    id: 'u2', name: 'María López', email: 'maria@cafe.com',
    password: 'mesero123', role: 'waiter', avatar: '', active: true,
    createdAt: new Date('2025-02-15')
  },
  {
    id: 'u3', name: 'Juan Pérez', email: 'juan@cafe.com',
    password: 'mesero123', role: 'waiter', avatar: '', active: true,
    createdAt: new Date('2025-03-01')
  },
  {
    id: 'u4', name: 'Ana García', email: 'ana@cafe.com',
    password: 'cocina123', role: 'kitchen', avatar: '', active: true,
    createdAt: new Date('2025-02-20')
  },
  {
    id: 'u5', name: 'Roberto Díaz', email: 'roberto@cafe.com',
    password: 'cocina123', role: 'kitchen', avatar: '', active: false,
    createdAt: new Date('2025-04-10')
  }
];

// ── Categorías ──────────────────────────────
export const MOCK_CATEGORIES: Category[] = [
  { id: 'cat1', name: 'Cafés', icon: 'coffee', color: '#6F4E37', order: 1 },
  { id: 'cat2', name: 'Bebidas Frías', icon: 'local_bar', color: '#2196F3', order: 2 },
  { id: 'cat3', name: 'Postres', icon: 'cake', color: '#E91E63', order: 3 },
  { id: 'cat4', name: 'Desayunos', icon: 'egg_alt', color: '#FF9800', order: 4 },
  { id: 'cat5', name: 'Comida', icon: 'restaurant', color: '#4CAF50', order: 5 },
  { id: 'cat6', name: 'Promociones', icon: 'local_offer', color: '#9C27B0', order: 6 }
];

// ── Productos ───────────────────────────────
export const MOCK_PRODUCTS: Product[] = [
  // Cafés
  { id: 'p1', name: 'Café Americano', categoryId: 'cat1', price: 45, description: 'Café negro intenso con agua caliente', image: 'coffee', available: true, createdAt: new Date('2025-01-15') },
  { id: 'p2', name: 'Capuchino', categoryId: 'cat1', price: 55, description: 'Espresso con leche espumada y canela', image: 'coffee', available: true, createdAt: new Date('2025-01-15') },
  { id: 'p3', name: 'Latte', categoryId: 'cat1', price: 60, description: 'Espresso con leche vaporizada cremosa', image: 'coffee', available: true, createdAt: new Date('2025-01-15') },
  { id: 'p4', name: 'Espresso', categoryId: 'cat1', price: 35, description: 'Shot concentrado de café puro', image: 'coffee', available: true, createdAt: new Date('2025-01-15') },
  { id: 'p5', name: 'Chocolate Caliente', categoryId: 'cat1', price: 50, description: 'Chocolate artesanal con leche cremosa', image: 'coffee', available: true, createdAt: new Date('2025-01-15') },
  { id: 'p6', name: 'Té Chai', categoryId: 'cat1', price: 48, description: 'Té negro con especias y leche', image: 'emoji_food_beverage', available: true, createdAt: new Date('2025-01-15') },
  // Bebidas Frías
  { id: 'p7', name: 'Frappé de Moka', categoryId: 'cat2', price: 70, description: 'Café frappé con chocolate y crema', image: 'local_cafe', available: true, createdAt: new Date('2025-01-15') },
  { id: 'p8', name: 'Limonada Natural', categoryId: 'cat2', price: 38, description: 'Limonada fresca con hierbabuena', image: 'local_bar', available: true, createdAt: new Date('2025-01-15') },
  { id: 'p9', name: 'Smoothie de Fresa', categoryId: 'cat2', price: 65, description: 'Smoothie cremoso de fresa con yogurt', image: 'local_bar', available: false, createdAt: new Date('2025-02-01') },
  // Postres
  { id: 'p10', name: 'Pastel de Chocolate', categoryId: 'cat3', price: 75, description: 'Pastel húmedo de chocolate belga', image: 'cake', available: true, createdAt: new Date('2025-01-15') },
  { id: 'p11', name: 'Cheesecake', categoryId: 'cat3', price: 80, description: 'Cheesecake NY con frutos rojos', image: 'cake', available: true, createdAt: new Date('2025-01-15') },
  { id: 'p12', name: 'Galletas Artesanales', categoryId: 'cat3', price: 35, description: 'Pack de 3 galletas de avena y chispas', image: 'cookie', available: true, createdAt: new Date('2025-01-15') },
  // Desayunos
  { id: 'p13', name: 'Panini Caprese', categoryId: 'cat4', price: 85, description: 'Panini con mozzarella, tomate y albahaca', image: 'lunch_dining', available: true, createdAt: new Date('2025-01-15') },
  { id: 'p14', name: 'Tostadas con Aguacate', categoryId: 'cat4', price: 72, description: 'Pan artesanal con aguacate y huevo', image: 'breakfast_dining', available: true, createdAt: new Date('2025-01-15') },
  // Comida
  { id: 'p15', name: 'Ensalada César', categoryId: 'cat5', price: 95, description: 'Lechuga romana, crutones, parmesano', image: 'lunch_dining', available: true, createdAt: new Date('2025-01-15') },
  { id: 'p16', name: 'Wrap de Pollo', categoryId: 'cat5', price: 88, description: 'Tortilla integral con pollo y verduras', image: 'restaurant', available: true, createdAt: new Date('2025-02-10') },
  // Promociones
  { id: 'p17', name: 'Combo Café + Postre', categoryId: 'cat6', price: 99, description: 'Cualquier café + postre del día', image: 'local_offer', available: true, createdAt: new Date('2025-03-01') },
];

// ── Mesas ───────────────────────────────────
export const MOCK_TABLES: CafeTable[] = [
  { id: 't1', number: 1, capacity: 2, status: 'available', zone: 'Interior' },
  { id: 't2', number: 2, capacity: 4, status: 'occupied', zone: 'Interior', currentAccountId: 'acc1' },
  { id: 't3', number: 3, capacity: 4, status: 'available', zone: 'Interior' },
  { id: 't4', number: 4, capacity: 6, status: 'occupied', zone: 'Interior', currentAccountId: 'acc2' },
  { id: 't5', number: 5, capacity: 2, status: 'reserved', zone: 'Terraza' },
  { id: 't6', number: 6, capacity: 4, status: 'available', zone: 'Terraza' },
  { id: 't7', number: 7, capacity: 8, status: 'billing', zone: 'Terraza', currentAccountId: 'acc3' },
  { id: 't8', number: 8, capacity: 2, status: 'available', zone: 'Terraza' },
  { id: 't9', number: 9, capacity: 4, status: 'occupied', zone: 'Interior', currentAccountId: 'acc4' },
  { id: 't10', number: 10, capacity: 6, status: 'available', zone: 'VIP' },
  { id: 't11', number: 11, capacity: 4, status: 'available', zone: 'VIP' },
  { id: 't12', number: 12, capacity: 8, status: 'reserved', zone: 'VIP' },
];

// ── Órdenes ─────────────────────────────────
const now = new Date();
const minutesAgo = (m: number) => new Date(now.getTime() - m * 60000);

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ord1', tableId: 't2', tableNumber: 2, waiterId: 'u2', waiterName: 'María López',
    items: [
      { productId: 'p1', productName: 'Café Americano', quantity: 2, unitPrice: 45, notes: '', subtotal: 90 },
      { productId: 'p10', productName: 'Pastel de Chocolate', quantity: 1, unitPrice: 75, notes: 'Sin crema', subtotal: 75 }
    ],
    status: 'preparing', notes: '', createdAt: minutesAgo(25), updatedAt: minutesAgo(15), total: 165, accountId: 'acc1'
  },
  {
    id: 'ord2', tableId: 't4', tableNumber: 4, waiterId: 'u3', waiterName: 'Juan Pérez',
    items: [
      { productId: 'p2', productName: 'Capuchino', quantity: 3, unitPrice: 55, notes: 'Uno sin azúcar', subtotal: 165 },
      { productId: 'p13', productName: 'Panini Caprese', quantity: 2, unitPrice: 85, notes: '', subtotal: 170 },
      { productId: 'p8', productName: 'Limonada Natural', quantity: 1, unitPrice: 38, notes: 'Extra hielo', subtotal: 38 }
    ],
    status: 'pending', notes: 'Para llevar si es posible', createdAt: minutesAgo(5), updatedAt: minutesAgo(5), total: 373, accountId: 'acc2'
  },
  {
    id: 'ord3', tableId: 't7', tableNumber: 7, waiterId: 'u2', waiterName: 'María López',
    items: [
      { productId: 'p15', productName: 'Ensalada César', quantity: 2, unitPrice: 95, notes: '', subtotal: 190 },
      { productId: 'p3', productName: 'Latte', quantity: 2, unitPrice: 60, notes: 'Leche deslactosada', subtotal: 120 },
      { productId: 'p11', productName: 'Cheesecake', quantity: 2, unitPrice: 80, notes: '', subtotal: 160 }
    ],
    status: 'ready', notes: '', createdAt: minutesAgo(45), updatedAt: minutesAgo(5), total: 470, accountId: 'acc3'
  },
  {
    id: 'ord4', tableId: 't9', tableNumber: 9, waiterId: 'u3', waiterName: 'Juan Pérez',
    items: [
      { productId: 'p4', productName: 'Espresso', quantity: 1, unitPrice: 35, notes: 'Doble', subtotal: 35 },
      { productId: 'p12', productName: 'Galletas Artesanales', quantity: 2, unitPrice: 35, notes: '', subtotal: 70 }
    ],
    status: 'delivered', notes: '', createdAt: minutesAgo(60), updatedAt: minutesAgo(20), total: 105, accountId: 'acc4'
  },
  {
    id: 'ord5', tableId: 't2', tableNumber: 2, waiterId: 'u2', waiterName: 'María López',
    items: [
      { productId: 'p7', productName: 'Frappé de Moka', quantity: 1, unitPrice: 70, notes: '', subtotal: 70 }
    ],
    status: 'pending', notes: '', createdAt: minutesAgo(2), updatedAt: minutesAgo(2), total: 70, accountId: 'acc1'
  }
];

// ── Cuentas ─────────────────────────────────
export const MOCK_ACCOUNTS: Account[] = [
  {
    id: 'acc1', tableId: 't2', tableNumber: 2, orderIds: ['ord1', 'ord5'],
    subtotal: 235, tax: 37.6, tip: 0, total: 272.6, status: 'open',
    openedAt: minutesAgo(30), waiterId: 'u2', waiterName: 'María López'
  },
  {
    id: 'acc2', tableId: 't4', tableNumber: 4, orderIds: ['ord2'],
    subtotal: 373, tax: 59.68, tip: 0, total: 432.68, status: 'open',
    openedAt: minutesAgo(10), waiterId: 'u3', waiterName: 'Juan Pérez'
  },
  {
    id: 'acc3', tableId: 't7', tableNumber: 7, orderIds: ['ord3'],
    subtotal: 470, tax: 75.2, tip: 50, total: 595.2, status: 'open',
    openedAt: minutesAgo(50), waiterId: 'u2', waiterName: 'María López'
  },
  {
    id: 'acc4', tableId: 't9', tableNumber: 9, orderIds: ['ord4'],
    subtotal: 105, tax: 16.8, tip: 15, total: 136.8, status: 'paid',
    openedAt: minutesAgo(65), closedAt: minutesAgo(10), waiterId: 'u3', waiterName: 'Juan Pérez'
  }
];

// ── Notificaciones ──────────────────────────
export const MOCK_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'n1', type: 'order_ready', title: 'Pedido Listo',
    message: 'El pedido de la Mesa 7 está listo para servir.',
    read: false, targetUserId: 'u2', orderId: 'ord3', tableNumber: 7,
    createdAt: minutesAgo(5)
  },
  {
    id: 'n2', type: 'new_order', title: 'Nuevo Pedido',
    message: 'María López envió un pedido desde la Mesa 2.',
    read: false, targetUserId: '', targetRole: 'kitchen', orderId: 'ord5', tableNumber: 2,
    createdAt: minutesAgo(2)
  },
  {
    id: 'n3', type: 'payment', title: 'Pago Registrado',
    message: 'La cuenta de la Mesa 9 fue pagada exitosamente.',
    read: true, targetUserId: 'u1', orderId: 'ord4', tableNumber: 9,
    createdAt: minutesAgo(10)
  },
  {
    id: 'n4', type: 'system', title: 'Producto Agotado',
    message: 'El Smoothie de Fresa ha sido marcado como no disponible.',
    read: true, targetUserId: 'u1',
    createdAt: minutesAgo(120)
  }
];

// ── Sales history data for reports ──────────
export const MOCK_DAILY_SALES = [
  { date: '2026-05-06', total: 4250, orders: 32 },
  { date: '2026-05-07', total: 5120, orders: 41 },
  { date: '2026-05-08', total: 3890, orders: 28 },
  { date: '2026-05-09', total: 6340, orders: 52 },
  { date: '2026-05-10', total: 5780, orders: 45 },
  { date: '2026-05-11', total: 7200, orders: 58 },
  { date: '2026-05-12', total: 3150, orders: 22 },
];
