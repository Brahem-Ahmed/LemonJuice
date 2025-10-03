import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Products } from './products/products';
import { Categories } from './categories/categories';
import { StockEntry } from './stock-entry/stock-entry';
import { InventoryHome } from './inventory-home/inventory-home';

const routes: Routes = [
  { path: '', component: InventoryHome },
  { path: 'products', component: Products },
  { path: 'categories', component: Categories },
  { path: 'stock-entry', component: StockEntry },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventoryRoutingModule {}
