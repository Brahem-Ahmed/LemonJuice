import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ManagerHome } from './manager-home/manager-home';
import { UserManagement } from './user-management/user-management';
import { ReceiptLookup } from './receipt-lookup/receipt-lookup';

const routes: Routes = [
  { path: '', redirectTo: 'Dashboard', pathMatch: 'full' },
  { path: 'Dashboard', component: ManagerHome },
  { path: 'users', component: UserManagement },
  { path: 'receipts', component: ReceiptLookup },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagerRoutingModule {}
