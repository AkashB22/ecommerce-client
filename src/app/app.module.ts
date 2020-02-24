import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {SlickCarouselModule} from 'ngx-slick-carousel';
import {NgsRevealModule} from 'ngx-scrollreveal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { ProfileComponent } from './profile/profile.component';
import {TokenInterceptorService} from './services/token-interceptor.service';
import { HomeComponent } from './home/home.component';
import { EventsComponent } from './events/events.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { PdpComponent } from './pdp/pdp.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    ProfileComponent,
    HomeComponent,
    EventsComponent,
    LandingPageComponent,
    PdpComponent,
    ProductsListComponent,
    ProductDetailsComponent,
    ShoppingCartComponent,
    OrderSummaryComponent,
    ForgetPasswordComponent
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    FontAwesomeModule,
    SlickCarouselModule,
    NgsRevealModule,
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
