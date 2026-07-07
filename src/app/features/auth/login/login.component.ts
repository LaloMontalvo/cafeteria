import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
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

  async quickLogin(roleEmail: string, rolePass: string): Promise<void> {
    this.email = roleEmail;
    this.password = rolePass;
    await this.onSubmit();
  }

  async onSubmit(): Promise<void> {
    this.errorMessage = '';

    if (!this.email || !this.password) {
      this.errorMessage = 'Por favor ingresa tu correo y contraseña';
      return;
    }

    this.loading = true;
    await new Promise(r => setTimeout(r, 400));

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
        case 'client':
          this.router.navigate(['/store']);
          break;
        default:
          this.router.navigate(['/store']);
      }
    } else {
      this.errorMessage = result.message;
    }
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
}
