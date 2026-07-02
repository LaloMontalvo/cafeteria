// ==========================================
// Auth Service — Servicio de Autenticación
// ==========================================

import { Injectable, signal, computed } from '@angular/core';
import { User, UserRole } from '../models/user.model';
import { MOCK_USERS } from '../mock/mock-data';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUser = signal<User | null>(null);

  readonly user = this.currentUser.asReadonly();
  readonly isLoggedIn = computed(() => !!this.currentUser());
  readonly userRole = computed(() => this.currentUser()?.role ?? null);
  readonly userName = computed(() => this.currentUser()?.name ?? '');

  login(email: string, password: string): { success: boolean; message: string } {
    const user = MOCK_USERS.find(u => u.email === email && u.password === password);
    if (!user) {
      return { success: false, message: 'Correo o contraseña incorrectos' };
    }
    if (!user.active) {
      return { success: false, message: 'Tu cuenta está desactivada. Contacta al administrador.' };
    }
    this.currentUser.set(user);
    localStorage.setItem('cafe_user', JSON.stringify(user));
    return { success: true, message: `Bienvenido, ${user.name}` };
  }

  logout(): void {
    this.currentUser.set(null);
    localStorage.removeItem('cafe_user');
  }

  tryRestoreSession(): void {
    const stored = localStorage.getItem('cafe_user');
    if (stored) {
      try {
        const user: User = JSON.parse(stored);
        this.currentUser.set(user);
      } catch {
        localStorage.removeItem('cafe_user');
      }
    }
  }

  hasRole(role: UserRole): boolean {
    return this.currentUser()?.role === role;
  }
}
