// ==========================================
// User Model — Modelo de Usuario
// ==========================================

export type UserRole = 'admin' | 'waiter' | 'kitchen';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  avatar: string;
  active: boolean;
  createdAt: Date;
}
