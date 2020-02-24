import { Component, OnInit } from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';

import {UserService} from './../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.getProfile()
      .subscribe(
        userData => console.log('user Data is '+ userData),
        err=>{
          if(err instanceof HttpErrorResponse){
            if(err.status === 401){
              this.router.navigate(['signin']);
            }
          }
        }
      )
  }

}
