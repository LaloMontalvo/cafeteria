import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent],
  template: `
    <div class="layout" [class.sidebar-collapsed]="sidebarCollapsed">
      <app-sidebar
        [collapsed]="sidebarCollapsed"
        (collapsedChange)="sidebarCollapsed = $event">
      </app-sidebar>
      <main class="main-content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .layout {
      display: flex;
      min-height: 100vh;
      height: 100vh;
      background: var(--color-bg);
      overflow: hidden;
    }
    .main-content {
      flex: 1;
      margin-left: 260px;
      transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      height: 100vh;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    .layout.sidebar-collapsed .main-content {
      margin-left: 72px;
    }
    @media (max-width: 768px) {
      .main-content {
        margin-left: 72px;
      }
    }
  `]
})
export class MainLayoutComponent {
  sidebarCollapsed = false;
}
