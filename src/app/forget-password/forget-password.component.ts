import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {UserService} from './../services/user.service';
import {Subscription} from 'rxjs'

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  constructor(private fb: FormBuilder, private userService: UserService) { }

  forgetPasswordForm : FormGroup;
  errors_message = {
    'email' : [
      {type: 'required', message: 'email is required.'},
      {type: 'email', message: 'not a valid email.'},
      {type: 'minlength', message: 'email must have minimum of 6 characters.'},
      {type: 'maxlength', message: 'email could have maximum of 30 characters.'},
    ]
  }
  forgetPasswordListenerSubs : Subscription;
  isRequestError: boolean = false;
  forgetPwdResText: string;

  ngOnInit() {
    this.forgetPasswordForm = this.fb.group({
      email : new FormControl('', [Validators.required, Validators.email, Validators.minLength(6), Validators.maxLength(30)])
    })

    this.forgetPasswordListenerSubs = this.userService.getForgetPasswordListener()
      .subscribe(
        response=>{
          console.log(response);
          if(response['error']){
            this.isRequestError = true;
            this.forgetPwdResText = response['error']['error'];
          } else{
            this.isRequestError = false;
            this.forgetPwdResText = response['info'];
          }
        }
      )
  }

  ngOnDestroy(){
    this.forgetPasswordListenerSubs.unsubscribe();
  }

  onSubmit(e){
    console.log(this.forgetPasswordForm.value);
    this.userService.forgetPassword(this.forgetPasswordForm.value);
  }

}
