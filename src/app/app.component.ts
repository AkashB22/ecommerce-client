import { Component, OnInit } from '@angular/core';
import {UserService} from './services/user.service';
import {Subscription} from 'rxjs';


import {User} from './models/user';
import {faSearch, faShoppingBasket, faUserEdit} from '@fortawesome/free-solid-svg-icons';
import {faFacebookF, faInstagram, faYoutube, faTwitter} from '@fortawesome/free-brands-svg-icons'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private userService: UserService){}

  validUser = false;
  username: string = '';
  title = 'Title';
  authListenerSubs : Subscription;
  profileListenerSubs : Subscription;
  user : User;
  faSearch = faSearch;
  faShoppingBasket = faShoppingBasket;
  faFacebookF = faFacebookF;
  faInstagram = faInstagram;
  faTwitter = faTwitter;
  faYoutube = faYoutube;
  faUserEdit = faUserEdit;

  ngOnInit(){
    this.userService.autoAuthUser();
    this.authListenerSubs = this.userService.getAuthStatusListener()
      .subscribe((auth)=>{
        this.validUser = auth;
        if(this.validUser){
          this.userService.getProfile();
          this.profileListenerSubs = this.userService.getProfileListener()
          .subscribe(
            response =>{
              console.log(response);
              this.username = response['user']['username'];
            }
          )
        }
      });
    
  }

  ngOnDestroy(){
    this.authListenerSubs.unsubscribe();
    if(this.validUser){
      this.profileListenerSubs.unsubscribe();
    }
  }

  logoutUser(){
    this.userService.logout();
    console.log('User logged out');
  }
}
