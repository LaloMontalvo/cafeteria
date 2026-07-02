// ==========================================
// User Management Service
// ==========================================

import { Injectable, signal, computed } from '@angular/core';
import { User } from '../models/user.model';
import { MOCK_USERS } from '../mock/mock-data';

@Injectable({ providedIn: 'root' })
export class UserService {
  private users = signal<User[]>([...MOCK_USERS]);

  readonly allUsers = this.users.asReadonly();
  readonly activeUsers = computed(() => this.users().filter(u => u.active));
  readonly userCount = computed(() => this.users().length);

  getUser(id: string): User | undefined {
    return this.users().find(u => u.id === id);
  }

  addUser(user: User): void {
    this.users.update(list => [...list, { ...user, id: 'u' + Date.now(), createdAt: new Date() }]);
  }

  updateUser(updated: User): void {
    this.users.update(list => list.map(u => u.id === updated.id ? { ...updated } : u));
  }

  deleteUser(id: string): void {
    this.users.update(list => list.filter(u => u.id !== id));
  }

  toggleActive(id: string): void {
    this.users.update(list => list.map(u =>
      u.id === id ? { ...u, active: !u.active } : u
    ));
  }
}
