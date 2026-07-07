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
  },
  {
    id: 'u6', name: 'Laura Martínez', email: 'laura@gmail.com',
    password: 'cliente123', role: 'client', avatar: '', active: true,
    createdAt: new Date('2025-05-01')
  },
  {
    id: 'u7', name: 'Pedro Sánchez', email: 'pedro@gmail.com',
    password: 'cliente123', role: 'client', avatar: '', active: true,
    createdAt: new Date('2025-05-15')
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
  {
    id: 'p1', name: 'Café Americano', categoryId: 'cat1', price: 45,
    description: 'Café negro intenso preparado con espresso doble y agua caliente artesanal.',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
    available: true, createdAt: new Date('2025-01-15')
  },
  {
    id: 'p2', name: 'Capuchino Tradicional', categoryId: 'cat1', price: 55,
    description: 'Espresso rico con leche vaporizada a la perfección y espumosa capa con canela.',
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=600&q=80',
    available: true, createdAt: new Date('2025-01-15')
  },
  {
    id: 'p3', name: 'Latte Cremoso', categoryId: 'cat1', price: 60,
    description: 'Shot de espresso intenso suavizado con abundante leche caliente y toque cremoso.',
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=600&q=80',
    available: true, createdAt: new Date('2025-01-15')
  },
  {
    id: 'p4', name: 'Espresso Italiano', categoryId: 'cat1', price: 35,
    description: 'Shot concentrado de granos 100% arábiga con crema dorada y aroma penetrante.',
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=600&q=80',
    available: true, createdAt: new Date('2025-01-15')
  },
  {
    id: 'p5', name: 'Chocolate Caliente Artesanal', categoryId: 'cat1', price: 50,
    description: 'Cacao oaxaqueño artesanal disuelto en leche entera o vegetal con bombones.',
    image: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&w=600&q=80',
    available: true, createdAt: new Date('2025-01-15')
  },
  {
    id: 'p6', name: 'Té Chai Especiado', categoryId: 'cat1', price: 48,
    description: 'Té negro aromático infusionado con jengibre, cardamomo, canela y leche cremosa.',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80',
    available: true, createdAt: new Date('2025-01-15')
  },
  // Bebidas Frías
  {
    id: 'p7', name: 'Frappé de Moka Gourmet', categoryId: 'cat2', price: 70,
    description: 'Refrescante mezcla helada de café espresso, chocolate belga y crema batida.',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80',
    available: true, createdAt: new Date('2025-01-15')
  },
  {
    id: 'p8', name: 'Limonada de Hierbabuena', categoryId: 'cat2', price: 38,
    description: 'Limonada recién exprimida mezclada con hojas de hierbabuena fresca y hielo.',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80',
    available: true, createdAt: new Date('2025-01-15')
  },
  {
    id: 'p9', name: 'Smoothie de Fresa & Yogurt', categoryId: 'cat2', price: 65,
    description: 'Batido cremoso de fresas orgánicas maduras con yogurt griego y toque de miel.',
    image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=600&q=80',
    available: true, createdAt: new Date('2025-02-01')
  },
  // Postres
  {
    id: 'p10', name: 'Pastel de Chocolate Supremo', categoryId: 'cat3', price: 75,
    description: 'Bizcocho ultra húmedo horneado con chocolate belga 70% cacao y fudge derretido.',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80',
    available: true, createdAt: new Date('2025-01-15')
  },
  {
    id: 'p11', name: 'Cheesecake Frutos Rojos', categoryId: 'cat3', price: 80,
    description: 'Estilo Nueva York cremoso sobre galleta crujiente y coulis de frutos del bosque.',
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80',
    available: true, createdAt: new Date('2025-01-15')
  },
  {
    id: 'p12', name: 'Galletas Artesanales', categoryId: 'cat3', price: 35,
    description: 'Trío de galletas horneadas hoy con chispas de chocolate semiamargo y nuez.',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=600&q=80',
    available: true, createdAt: new Date('2025-01-15')
  },
  // Desayunos & Comidas
  {
    id: 'p13', name: 'Panini Caprese Italiano', categoryId: 'cat4', price: 85,
    description: 'Pan baguette crujiente con mozzarella fresca, jitomate y pesto de albahaca.',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80',
    available: true, createdAt: new Date('2025-01-15')
  },
  {
    id: 'p14', name: 'Tostadas de Aguacate & Huevo', categoryId: 'cat4', price: 72,
    description: 'Pan de masa madre tostado con aguacate, huevo pochado y semillas.',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80',
    available: true, createdAt: new Date('2025-01-15')
  },
  {
    id: 'p15', name: 'Ensalada César Gourmet', categoryId: 'cat5', price: 95,
    description: 'Lechuga romana fresca, crutones dorados de ajo, pollo a la parrilla y parmesano.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80',
    available: true, createdAt: new Date('2025-01-15')
  },
  {
    id: 'p16', name: 'Wrap de Pollo Artisan', categoryId: 'cat5', price: 88,
    description: 'Tortilla integral rellena de pechuga de pollo, tiras de pimiento y aguacate.',
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=600&q=80',
    available: true, createdAt: new Date('2025-02-10')
  },
  {
    id: 'p17', name: 'Combo Café + Postre', categoryId: 'cat6', price: 99,
    description: 'Selecciona cualquier café de la casa emparejado con un postre del día.',
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=600&q=80',
    available: true, createdAt: new Date('2025-03-01')
  }
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

export const MOCK_ORDERS: Order[] = [];

// ── Cuentas ─────────────────────────────────
export const MOCK_ACCOUNTS: Account[] = [];

// ── Notificaciones ──────────────────────────
export const MOCK_NOTIFICATIONS: AppNotification[] = [];

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
