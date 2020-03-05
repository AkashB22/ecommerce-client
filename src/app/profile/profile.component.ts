import { Component, OnInit } from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms'
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

import {UserService} from './../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private fb: FormBuilder) { }

  profileForm: FormGroup;
  errors_message = {
    'username': [
      {type: 'required', message: 'username is required.'},
      {type: 'minlength', message: 'username should be minimum of 6 character.'},
      {type: 'maxlength', message: 'username could be maximum of 255 character.'},
    ],
    'email': [
      {type: 'required', message: 'email is required.'},
      {type: 'minlength', message: 'email should be minimum of 6 character.'},
      {type: 'maxlength', message: 'email could be maximum of 255 character.'},
    ],
    'password': [
      {type: 'required', message: 'password is required.'},
      {type: 'minlength', message: 'password should be minimum of 6 character.'},
      {type: 'maxlength', message: 'password could be maximum of 30 character.'},
    ],
    'confirmPassword': [
      {type: 'required', message: 'confirmPassword is required.'},
      {type: 'minlength', message: 'confirmPassword should be minimum of 6 character.'},
      {type: 'maxlength', message: 'confirmPassword could be maximum of 30 character.'},
    ],
    'phone': [
      {type: 'required', message: 'phone is required.'},
      {type: 'minlength', message: 'phone should be minimum of 10 numbers.'},
      {type: 'maxlength', message: 'confirmPassword could be maximum of 30 numbers.'},
    ],
  };
  isServerError: boolean = false;
  serverMessage: string = '';
  profileListenerSubs : Subscription;

  ngOnInit() {
    this.profileForm = this.fb.group({
      username: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(255)]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(6), Validators.maxLength(255)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]),
      phone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(30)])
    },
    {
      validators: [this.matchPassword.bind(this), this.numberValidate.bind(this)]
    });
    this.userService.getProfile();
    this.profileListenerSubs = this.userService.getProfileListener()
      .subscribe(
        response => {
          console.log(response['user']);
          this.profileForm.patchValue({
            username: response['user']['username'],
            email: response['user']['email'],
            phone: response['user']['phone'],
          })
        },
        err=>{
          if(err instanceof HttpErrorResponse){
            if(err.status === 401){
              this.router.navigate(['signin']);
            }
          }
        }
      )
  }

  ngOnDestroy(){
    this.profileListenerSubs.unsubscribe();
  }

  matchPassword(formGroup: FormGroup){
    let {value: password} = formGroup.get('password');
    let {value: confirmPassword} = formGroup.get('confirmPassword');

    if(password !== confirmPassword){
      return {passworNotMatch: true};
    } else{
      return null;
    }
  }

  numberValidate(formGroup: FormGroup){
    let {value: phone} = formGroup.get('phone');
    if((/[a-zA-z]/gi).test(phone.toString())){
      return {notANumber : true};
    } else{
      return null;
    }
  }

  onSubmit(event){
    console.log(this.profileForm.value);
    this.userService.updateUser(this.profileForm.value);
  }
}
