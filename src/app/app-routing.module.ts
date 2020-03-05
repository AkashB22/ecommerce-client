import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {SignupComponent} from './signup/signup.component'
import {SigninComponent} from './signin/signin.component';
import {ProfileComponent} from './profile/profile.component';
import {HomeComponent} from './home/home.component';
import {EventsComponent} from './events/events.component'
import {LandingPageComponent} from './landing-page/landing-page.component';
import {PdpComponent} from './pdp/pdp.component';
import {ProductsListComponent} from './products-list/products-list.component';
import {ProductDetailsComponent} from './product-details/product-details.component';
import {ShoppingCartComponent} from './shopping-cart/shopping-cart.component';
import {OrderSummaryComponent} from './order-summary/order-summary.component';
import {ForgetPasswordComponent} from './forget-password/forget-password.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {AuthGuard} from './auth.guard';

const routes: Routes = [
  {path:'', redirectTo: '/home', pathMatch: 'full'},
  {path:'land', component: LandingPageComponent},
  {path:'pdp', component: PdpComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'signin', component: SigninComponent},
  {path: 'forget-password', component: ForgetPasswordComponent},
  {path: 'reset-password/:resetPasswordToken', component: ResetPasswordComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'home', component: HomeComponent},
  {path: 'products-list', component: ProductsListComponent},
  {path: 'product-details', component: ProductDetailsComponent},
  {path: 'shopping-cart', component: ShoppingCartComponent},
  {path: 'order-summary', component: OrderSummaryComponent},
  {path: 'events', component : EventsComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
