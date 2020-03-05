import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import {Subscription} from 'rxjs';
import {UserService} from './../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private fb: FormBuilder, private userService: UserService) { }

  signupForm : FormGroup;
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
  signupStatusListnerSubs: Subscription;
  isServerError: boolean = false;
  serverMessage: string = '';

  ngOnInit() {
    this.signupForm = this.fb.group({
      username: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(255)]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(6), Validators.maxLength(255)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]),
      phone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(30)])
    },
    {
      validators: [this.matchPassword.bind(this), this.numberValidate.bind(this)]
    });

    this.signupStatusListnerSubs = this.userService.getSignupStatusListener()
      .subscribe(
        response=>{
          this.isServerError = true;
          this.serverMessage = response['error']['error'];
        }
      )
  }

  onSubmit(event){
    console.log(this.signupForm.value);
    delete this.signupForm.value.confirmPassword;
    this.userService.signupUser(this.signupForm.value);
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
}
