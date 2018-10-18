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
    // this.currentUser.fname = "";
    // this.currentUser.lname = "";
    // this.currentUser.password = "";
    // this.currentUser.email = "";
    // this.currentUser.portfolio = [];
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
      // .subscribe((data: User) => console.log(data) );
      .subscribe((data: User) => 
      {
        this.currentUser = data;
        // this.currentUser.fname = data[0]['fname'];
        // this.currentUser.lname = data[0]['lname'];
        // this.currentUser.email = data[0]['email'];
        // this.currentUser.id = data[0]['id'];
        // this.currentUser.password = data[0]['password'];
        //  for ( let i=0; i<data[0]['portfolio'].length; i++)
        //  {
        //    this.currentUser.portfolio.push(data[0]['portfolio'][i]);
        //  }
      });
  }
}
