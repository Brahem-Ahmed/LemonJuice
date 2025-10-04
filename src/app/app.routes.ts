import { Routes } from '@angular/router';
import { Home } from './home/home';
import { PageNotFoundComponent } from './page-not-found-component/page-not-found-component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  {
    path: 'manager',
    loadChildren: () => import('./manager/manager-module').then((m) => m.ManagerModule),
  },
  { path: 'user', loadChildren: () => import('./user/user-module').then((m) => m.UserModule) },
  {
    path: 'inventory',
    loadChildren: () => import('./inventory/inventory-module').then((m) => m.InventoryModule),
  },
  {
    path: '**',
    loadChildren: () =>
      import('./page-not-found-component/page-not-found-component').then(
        (m) => m.PageNotFoundComponent,
      ),
  }, // Wildcard route for a 404 page,
];
