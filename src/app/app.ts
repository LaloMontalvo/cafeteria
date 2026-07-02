import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: '<router-outlet></router-outlet>',
  styles: [':host { display: block; }']
})
export class App implements OnInit {
  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.tryRestoreSession();
  }
}
