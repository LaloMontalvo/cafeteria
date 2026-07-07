import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { UserService } from '../../../core/services/user.service';
import { User, UserRole } from '../../../core/models/user.model';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  showModal = false;
  editingUser: User | null = null;
  formName = ''; formEmail = ''; formPassword = ''; formRole: UserRole = 'waiter'; formActive = true;

  constructor(public userService: UserService) {}

  getRoleBadge(role: UserRole): { label: string; color: string } {
    const map: Record<UserRole, { label: string; color: string }> = {
      admin: { label: 'Administrador', color: '#6F4E37' },
      waiter: { label: 'Mesero', color: '#2196F3' },
      kitchen: { label: 'Cocina', color: '#FF9800' },
      client: { label: 'Cliente', color: '#4CAF50' }
    };
    return map[role];
  }

  openCreateModal(): void {
    this.editingUser = null;
    this.formName = ''; this.formEmail = ''; this.formPassword = '';
    this.formRole = 'waiter'; this.formActive = true;
    this.showModal = true;
  }

  openEditModal(user: User): void {
    this.editingUser = user;
    this.formName = user.name; this.formEmail = user.email; this.formPassword = user.password;
    this.formRole = user.role; this.formActive = user.active;
    this.showModal = true;
  }

  closeModal(): void { this.showModal = false; this.editingUser = null; }

  saveUser(): void {
    if (!this.formName || !this.formEmail) return;
    if (this.editingUser) {
      this.userService.updateUser({ ...this.editingUser, name: this.formName, email: this.formEmail, password: this.formPassword, role: this.formRole, active: this.formActive });
    } else {
      this.userService.addUser({ id: '', name: this.formName, email: this.formEmail, password: this.formPassword || 'pass123', role: this.formRole, avatar: '', active: this.formActive, createdAt: new Date() });
    }
    this.closeModal();
  }

  deleteUser(id: string): void {
    if (confirm('¿Eliminar este usuario?')) this.userService.deleteUser(id);
  }

  toggleActive(id: string): void { this.userService.toggleActive(id); }
}
