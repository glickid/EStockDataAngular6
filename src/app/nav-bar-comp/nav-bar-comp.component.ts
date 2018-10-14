import { Component, OnInit } from '@angular/core';
// import { Observable } from 'rxjs/Rx';
//mport { Observable } from 'rxjs';
//import { interval } from 'rxjs/observable/interval';
// import 'rxjs/add/observable/interval';
import { interval } from 'rxjs';
import * as $ from 'jquery';

@Component({
  selector: 'app-nav-bar-comp',
  templateUrl: './nav-bar-comp.component.html',
  styleUrls: ['./nav-bar-comp.component.css']
})

export class NavBarCompComponent implements OnInit {

  activeUser: String;
  alertNum: Number;
  userManageAlertsArr: String[];

  constructor() { 
    this.activeUser = null;
    this.alertNum = 0;
    this.userManageAlertsArr = [];

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
      // return userSrv.isLoggedIn();
      return false;
  }

  logout () {
      // userSrv.logout();
      // portfolioSrv.logout();
      // $location.path("/");
  }
   
  getUserAlertsInfo () {
    this.activeUser = null; //userSrv.getActiveUser();
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

