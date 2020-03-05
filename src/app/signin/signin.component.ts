import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import {UserService} from './../services/user.service';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private fb: FormBuilder, private userService: UserService) { }

    signinForm : FormGroup;
    errors_message = {
      'email' : [
        {type:'email', message: 'Not a valid emal.'},
        {type: 'required', message: 'email is required.'},
        {type: 'minlength', message: 'email should be minimum of 6 character.'},
        {type: 'maxlength', message: 'email could be maximum of 255 character.'},
      ],
      'password' : [
        {type: 'required', message: 'password is required.'},
        {type: 'minlength', message: 'password must be minimum of 6 characters.'},
        {type: 'maxlength', message: 'password could be a maximum of 30 characters.'}
      ]
    };
    isServerError: boolean = false;
    serverMessage: string;
    signinStatusListenerSubs: Subscription;
    
    ngOnInit() {
    this.signinForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(6), Validators.maxLength(255)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(30)])
    });

    this.signinStatusListenerSubs = this.userService.getSigninStatusListener()
      .subscribe(
        response=>{
          this.isServerError = true;
          this.serverMessage = response['error']['error'];
        }
      )
  }


  ngOnDestroy(){
    this.signinStatusListenerSubs.unsubscribe();
  }

  onSubmit(event){
    this.userService.signinUser(this.signinForm.value);
  }
}
