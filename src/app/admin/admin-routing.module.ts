import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { ProductsComponent } from './products/products.component';
import { UsersComponent } from './users/users.component';
import { OrdersComponent } from './orders/orders.component';
import { CartsComponent } from './carts/carts.component';


const routes: Routes = [
  { path: '', component: AdminComponent , children: [
    {path: 'products', component: ProductsComponent},
    {path: 'users', component: UsersComponent},
    {path: 'orders', component: OrdersComponent},
    {path: 'carts', component: CartsComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
