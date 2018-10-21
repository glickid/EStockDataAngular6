import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';
import {Router} from "@angular/router";

import { UserService } from '../../Services/User/user.service'

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signInForm : FormGroup;

  constructor(private _userSrv: UserService,
              private _route: Router) { }

  ngOnInit() {
    this.signInForm = new FormGroup({
      email: new FormControl(),
      password : new FormControl()
    });
  }

  onSubmit() {
    // console.log(this.signInForm.value);
    this._userSrv.login(this.signInForm.value.email, 
                        this.signInForm.value.password).subscribe(result => 
                          {
                            console.log(result);
                            this._route.navigate(['/home']);
                            $('#loginModal').modal('hide');
                            this.signInForm.reset();
                          })
  }

  resetLoginModal(value) {
    console.log("reset modal" + value);
    $('#loginModal').modal('hide');
    this.signInForm.reset();
  }
}
