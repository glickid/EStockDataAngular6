import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { combineLatest } from "rxjs/operators";
import { interval } from 'rxjs';
import * as $ from 'jquery';

import { UserService } from '../../Services/User/user.service';
import { User } from '../../Services/User/User'

@Component({
  selector: 'app-nav-bar-comp',
  templateUrl: './nav-bar-comp.component.html',
  styleUrls: ['./nav-bar-comp.component.css']
})

export class NavBarCompComponent implements OnInit {

  public activeUser: User;
  public alertNum: Number = 0;
  public userManageAlertsArr: String[] = [];

  constructor(private _userSrv: UserService) { 
    this.activeUser = this._userSrv.getActiveUser();

    interval(4000).subscribe(() => {
        // TODO: implement alert modal
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
  }

  login () {
      this._userSrv.login("yossi@yossi.com", "123")
      .subscribe((data: User) => 
      {
        this.activeUser = data;
      });
  }

  logout () {
    this._userSrv.logout();
    // TODO : do we need this?
      // portfolioSrv.logout();
      // $location.path("/");
  }
   
  getUserAlertsInfo () {
    this.activeUser = this._userSrv.getActiveUser();
    this.userManageAlertsArr.length = 0;
    
    if (this.activeUser !== null) {
      // TODO: implement Alert modal from navbar
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
    //TODO: implement alert modal
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

