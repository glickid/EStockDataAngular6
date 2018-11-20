import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Services/User/user.service';
import { User } from '../../Services/User/User'


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public currentUser: User = {id: -1, fname:" ", lname: " ", email:" ",
                              password: " ", 
                              portfolio: []};

  constructor(private _UserSrv: UserService) { 
  }

  ngOnInit() {
  }

  public logout() {
    this.currentUser.fname = " ";
    this.currentUser.id = -1;
    this.currentUser.lname = " ";
    this.currentUser.password = " ";
    this.currentUser.portfolio.length = 0;
    this.currentUser.email = "";
  }
  public isLoggedIn () {
    if (this.currentUser.fname !== "") {
      return true;
    }
    return false;
  }

  public login () {
    this._UserSrv.login("yossi@yossi.com", "123")
      .subscribe((data: User) => 
      {
        this.currentUser = data;
      });
  }
}
