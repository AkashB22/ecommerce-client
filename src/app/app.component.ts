import { Component, OnInit } from '@angular/core';
import {UserService} from './services/user.service';
import {Subscription} from 'rxjs';
import {User} from './models/user';

import {faSearch, faShoppingBasket} from '@fortawesome/free-solid-svg-icons';
import {faFacebookF, faInstagram, faYoutube, faTwitter} from '@fortawesome/free-brands-svg-icons'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private userService: UserService){}

  validUser = false;
  title = 'Title';
  authListenerSubs : Subscription;
  user : User;
  faSearch = faSearch;
  faShoppingBasket = faShoppingBasket;
  faFacebookF = faFacebookF;
  faInstagram = faInstagram;
  faTwitter = faTwitter;
  faYoutube = faYoutube;

  ngOnInit(){
    this.userService.autoAuthUser();
    this.validUser = this.userService.getIsAuth();
    this.authListenerSubs = this.userService
      .getAuthStatusListener()
      .subscribe((auth)=>{
        this.validUser = auth;
        if(this.validUser){
          this.userService.getProfile()
          .subscribe(
            user=>{
              this.user = user;
              console.log(this.user);
            });
        } else{
          this.user = null;
        }
      });
    if(this.validUser){
      this.userService.getProfile()
          .subscribe(
            user=>{
              this.user = user;
              console.log(this.user);
            });
    }
  }

  logoutUser(){
    this.userService.logout();
    console.log('User logged out');
  }
}
