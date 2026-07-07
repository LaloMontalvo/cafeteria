import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { StoreLayoutComponent } from './layouts/store-layout/store-layout.component';

export const routes: Routes = [
  // Default root redirect directly to store!
  { path: '', redirectTo: 'store', pathMatch: 'full' },

  // Login page with role switcher
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
  },

  // ── Public Store (Clients - No Auth Required to view) ──────────────────
  {
    path: 'store',
    component: StoreLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./features/store/landing/landing.component').then(m => m.LandingComponent)
      },
      {
        path: 'menu',
        loadComponent: () => import('./features/store/store-menu/store-menu.component').then(m => m.StoreMenuComponent)
      },
      {
        path: 'product/:id',
        loadComponent: () => import('./features/store/product-detail/product-detail.component').then(m => m.ProductDetailComponent)
      },
      {
        path: 'cart',
        loadComponent: () => import('./features/store/cart/cart.component').then(m => m.CartComponent)
      },
      {
        path: 'checkout',
        loadComponent: () => import('./features/store/checkout/checkout.component').then(m => m.CheckoutComponent)
      },
      {
        path: 'my-orders',
        loadComponent: () => import('./features/store/my-orders/my-orders.component').then(m => m.MyOrdersComponent),
        canActivate: [authGuard]
      },
      {
        path: 'profile',
        loadComponent: () => import('./features/store/client-profile/client-profile.component').then(m => m.ClientProfileComponent),
        canActivate: [authGuard]
      }
    ]
  },

  // ── Admin & Staff Dashboard (Authenticated) ─────────
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

      // Notifications (All staff roles)
      {
        path: 'notifications',
        loadComponent: () => import('./features/notifications/notification-center/notification-center.component').then(m => m.NotificationCenterComponent),
        canActivate: [roleGuard('admin', 'waiter', 'kitchen')]
      }
    ]
  },

  // Fallback -> Store
  { path: '**', redirectTo: 'store' }
];
