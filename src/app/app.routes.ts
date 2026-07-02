import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';

export const routes: Routes = [
  // Login
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
  },

  // Authenticated routes with layout
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      // Dashboard (Admin)
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard-home/dashboard-home.component').then(m => m.DashboardHomeComponent),
        canActivate: [roleGuard('admin')]
      },

      // Tables (Admin + Waiter)
      {
        path: 'tables',
        loadComponent: () => import('./features/tables/table-management/table-management.component').then(m => m.TableManagementComponent),
        canActivate: [roleGuard('admin', 'waiter')]
      },

      // Orders (Admin + Waiter)
      {
        path: 'orders',
        loadComponent: () => import('./features/orders/order-list/order-list.component').then(m => m.OrderListComponent),
        canActivate: [roleGuard('admin', 'waiter')]
      },

      // Products (Admin)
      {
        path: 'products',
        loadComponent: () => import('./features/products/product-list/product-list.component').then(m => m.ProductListComponent),
        canActivate: [roleGuard('admin')]
      },

      // Kitchen (Admin + Kitchen)
      {
        path: 'kitchen',
        loadComponent: () => import('./features/kitchen/kitchen-panel/kitchen-panel.component').then(m => m.KitchenPanelComponent),
        canActivate: [roleGuard('admin', 'kitchen')]
      },

      // Users (Admin)
      {
        path: 'users',
        loadComponent: () => import('./features/users/user-list/user-list.component').then(m => m.UserListComponent),
        canActivate: [roleGuard('admin')]
      },

      // Reports (Admin)
      {
        path: 'reports',
        loadComponent: () => import('./features/reports/sales-report/sales-report.component').then(m => m.SalesReportComponent),
        canActivate: [roleGuard('admin')]
      },

      // Notifications (All roles)
      {
        path: 'notifications',
        loadComponent: () => import('./features/notifications/notification-center/notification-center.component').then(m => m.NotificationCenterComponent),
        canActivate: [roleGuard('admin', 'waiter', 'kitchen')]
      },

      // Default redirect
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },

  // Fallback
  { path: '**', redirectTo: 'login' }
];
