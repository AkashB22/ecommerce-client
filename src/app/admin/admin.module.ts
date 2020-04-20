import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ProductsComponent } from './products/products.component';
import { CreateComponent } from './products/create/create.component'
import { UsersComponent } from './users/users.component';
import { OrdersComponent } from './orders/orders.component';
import { CartsComponent } from './carts/carts.component';



@NgModule({
  declarations: [AdminComponent, ProductsComponent, UsersComponent, OrdersComponent, CartsComponent, CreateComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FontAwesomeModule,
    FormsModule, 
    ReactiveFormsModule
  ]
})
export class AdminModule { }
