import { Component, OnInit } from '@angular/core';
// import { Observable } from 'rxjs/Rx';
//mport { Observable } from 'rxjs';
//import { interval } from 'rxjs/observable/interval';
// import 'rxjs/add/observable/interval';
import { interval } from 'rxjs';
import * as $ from 'jquery';
//import { UserComponent } from '../user/user.component';
// import { portfolio } from '../../Services/Portfolio/Portfolio';
// import { UserComponent } from '../user/user.component'
import { UserService } from '../../Services/User/user.service';
import { User } from '../../Services/User/User'

@Component({
  // providers:[UserComponent ],
  selector: 'app-nav-bar-comp',
  templateUrl: './nav-bar-comp.component.html',
  styleUrls: ['./nav-bar-comp.component.css']
})

export class NavBarCompComponent implements OnInit {

  public activeUser: User;
  public alertNum: Number = 0;
  public userManageAlertsArr: String[] = [];

  constructor(private _userSrv: UserService) { 
    // this.currentUser.fname = "";
    // this.currentUser.lname = "";
    // this.currentUser.password = "";
    // this.currentUser.email = "";
    // this.currentUser.portfolio = "";
  
    // this.activeUser = null;
    // this.alertNum = 0;
    // this.userManageAlertsArr = [];
    this.activeUser = this._userSrv.getActiveUser();

    interval(4000).subscribe(() => {
        // $interval(function () {
          this.alertNum = 0 ;
          // if (userSrv.isLoggedIn()) {
          //     this.activeUser = userSrv.getActiveUser();

          //     for (var i=0; i<this.activeUser.portfolio.length; i++)
          //     {
          //         this.alertNum +=this.activeUser.portfolio[i].alertsArr.length;
          //     }
          // }
          // else {
          //     this.alertNum = 0;
          // }
      });
  }

  ngOnInit() {
  }

  isUserLoggedIn () {
      return this._userSrv.isLoggedIn();
      // return false;
  }

  login () {
      this._userSrv.login("yossi@yossi.com", "123")
      // .subscribe((data: User) => console.log(data) );
      .subscribe((data: User) => 
      {
        this.activeUser = data;
      });
  }

  logout () {
    this._userSrv.logout();
      // portfolioSrv.logout();
      // $location.path("/");
  }
   
  getUserAlertsInfo () {
    this.activeUser = this._userSrv.getActiveUser();
    this.userManageAlertsArr.length = 0;
    
    if (this.activeUser !== null) {

      // for (var i=0; i<this.activeUser.portfolio.length; i++) {
      //   for(var j=0; j<this.activeUser.portfolio[i].alertsArr.length; j++) {

          // alertsSrv.getAlertInfo(this.activeUser.portfolio[i].alertsArr[j]["alertId"])
          // .then(function (response) {
          //     userManageAlertsArr.push(response);
          //  }, function (err) {
          //      console.log("failed to get alert info");
          //  });
        // }
      // }
    }
  }

  resetAlertsModal () {
    this.userManageAlertsArr.length = 0;
  }

  removeAlert (alert) {
    // alertsSrv.removeAlert(alert["id"]).then(function (response) {
    //     portfolioSrv.removeAlertFromStock(alert["id"], alert["stockSymbol"]).then(function (response1) {
    //         var index = this.userManageAlertsArr.indexOf(alert);
    //         this.userManageAlertsArr.splice(index, 1);
    //         if (this.userManageAlertsArr.length === 0) {
    //             $('#alertsModal').modal('hide');
    //             resetAlertsModal();
    //         }
    //     }, function (err) {
    //         console.log(err)
    //     })
    // }, function (err) {
    //     console.log(err);
    // });
  }
  
  closeNavbar () {
    $('.navbar-toggler').click();
  }
}

