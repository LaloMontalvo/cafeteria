import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';
  loading = false;
  showPassword = false;

  constructor(private auth: AuthService, private router: Router) {}

  async onSubmit(): Promise<void> {
    this.errorMessage = '';

    if (!this.email || !this.password) {
      this.errorMessage = 'Por favor ingresa tu correo y contraseña';
      return;
    }

    this.loading = true;

    // Simulate network delay
    await new Promise(r => setTimeout(r, 800));

    const result = this.auth.login(this.email, this.password);
    this.loading = false;

    if (result.success) {
      const role = this.auth.userRole();
      switch (role) {
        case 'admin':
          this.router.navigate(['/dashboard']);
          break;
        case 'waiter':
          this.router.navigate(['/tables']);
          break;
        case 'kitchen':
          this.router.navigate(['/kitchen']);
          break;
        default:
          this.router.navigate(['/dashboard']);
      }
    } else {
      this.errorMessage = result.message;
    }
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
}
