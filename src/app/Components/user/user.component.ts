import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Services/User/user.service';
import { User } from '../../Services/User/User'


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  currentUser: User;

  constructor(private _UserSrv: UserService) { 
    this.currentUser.fname = "";
    this.currentUser.lname = "";
    this.currentUser.password = "";
    this.currentUser.email = "";
    this.currentUser.portfolio = [];
  }

  ngOnInit() {
  }

  login () {
    this._UserSrv.login("yossi@yossi.com", "123");
  }
}
