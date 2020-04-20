import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS, HttpClientXsrfModule} from '@angular/common/http';
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
import { MainComponent } from './main/main.component';
import { EventsComponent } from './events/events.component';
import { PdpComponent } from './pdp/pdp.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    SignupComponent,
    SigninComponent,
    ProfileComponent,
    MainComponent,
    EventsComponent,
    PdpComponent,
    ProductsListComponent,
    ProductDetailsComponent,
    ShoppingCartComponent,
    OrderSummaryComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent
  ],
  imports: [
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-XSRF-TOKEN'
    }),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    FontAwesomeModule,
    SlickCarouselModule,
    NgsRevealModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
