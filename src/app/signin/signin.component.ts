import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import {UserService} from './../services/user.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private fb: FormBuilder, private userService: UserService) { }

    signinForm : FormGroup;
    
    ngOnInit() {
    this.signinForm = this.fb.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit(event){
    console.log(this.signinForm.value);
    this.userService.signinUser(this.signinForm.value);
  }

}
