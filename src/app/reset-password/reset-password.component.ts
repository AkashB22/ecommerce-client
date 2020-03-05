import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';

import {UserService} from './../services/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private userService: UserService) { }

  resetPasswordToken: string;
  validResetUser: boolean = false;
  userEmail: string = '';
  resetPasswordForm : FormGroup;
  error_messages = {
    'password': [
      {type: 'required', message: 'password is required.'},
      {type: 'minlength', message: 'password must be minimum of 6 characters.'},
      {type: 'maxlength', message: 'password could be a maximum of 30 characters.'}
    ],
    'confirmPassword': [
      {type: 'required', message: 'confirm password is required.'},
      {type: 'minlength', message: 'confirm password must be minimum 6 characters.'},
      {type: 'maxlength', message: 'confirm password could be a maximum of 30 characters.'}
    ]
  };
  serverMessage: string = '';
  serverErrorMessage: string = '';

  ngOnInit() {
    this.resetPasswordForm = this.fb.group({
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]),
    },{
      validators: this.matchPassword.bind(this)
    })

    this.route.params
      .subscribe(
        param=>{
          console.log(param);
          this.resetPasswordToken = param.resetPasswordToken;
          this.userService.resetPasswordLink(this.resetPasswordToken)
            .subscribe(
              response=>{
                console.log(response);
                this.validResetUser = true;
                this.userEmail = response['user']['email'];
              },
              errorResponse=>{
                this.serverErrorMessage = errorResponse['error']['info'];
              }
            )
        }
      )
  }

  matchPassword(formGroup: FormGroup){
    let {value: password} = formGroup.get('password');
    let {value: confirmPassword} = formGroup.get('confirmPassword');
    if(password !== confirmPassword){
      return {passwordMatch: false};
    } else{
      return null;
    }
  }

  onSubmit(e){
    console.log(this.resetPasswordForm.value);
    let payload = {};
    payload['password'] = this.resetPasswordForm.value.password;

    this.userService.resetPassword(this.resetPasswordToken, payload);

  }

}
