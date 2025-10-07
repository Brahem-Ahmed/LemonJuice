import { Routes } from '@angular/router';
import { Home } from './home/home';
import { PageNotFoundComponent } from './page-not-found-component/page-not-found-component';
import { LoginComponent } from './login-component/login-component';
import { authGuard } from './auth/auth.guard';
import { Role } from './auth/auth.enum';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  {
    path: 'manager',
    loadChildren: () => import('./manager/manager-module').then((m) => m.ManagerModule),
    canLoad: [authGuard],
    data: { expectedRole: 'manager', roles: [Role.Manager] },
    canActivate: [authGuard],
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user-module').then((m) => m.UserModule),
    canActivate: [authGuard],
  },
  {
    path: 'inventory',
    loadChildren: () => import('./inventory/inventory-module').then((m) => m.InventoryModule),
  },
  { path: 'login', component: LoginComponent },
  { path: 'login/:redirectUrl', component: LoginComponent },
  {
    path: '**',
    loadChildren: () =>
      import('./page-not-found-component/page-not-found-component').then(
        (m) => m.PageNotFoundComponent,
      ),
  }, // Wildcard route for a 404 page,
];
