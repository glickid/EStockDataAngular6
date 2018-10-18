import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';
import {Router} from "@angular/router";

import { UserService } from '../../../Services/User/user.service'

@Component({
  selector: 'app-sisignInFormgnup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  
  signInForm : FormGroup;

  constructor(private _userSrv: UserService,
              private _route: Router) { }

  ngOnInit() {
    this.signInForm = new FormGroup({
      fname: new FormControl(),
      lname: new FormControl(),
      email: new FormControl(),
      password : new FormControl()
    });
  }

  onSubmit(): void {
    console.log(this.signInForm.value)
    this._userSrv.signInNewUser(this.signInForm.value).subscribe(
      reply => {
        console.log("user created");
        this._route.navigate(['/home']);
      }
    )
  }
}
