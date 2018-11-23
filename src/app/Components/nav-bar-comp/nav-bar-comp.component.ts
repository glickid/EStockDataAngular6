import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { combineLatest } from "rxjs/operators";
import { interval } from 'rxjs';
import * as $ from 'jquery';

import { UserService } from '../../Services/User/user.service';
import { User } from '../../Services/User/User'
import { AlertsService } from 'src/app/Services/Alerts/alerts.service';
import { PortfolioService } from '../../Services/Portfolio/portfolio.service';

@Component({
  selector: 'app-nav-bar-comp',
  templateUrl: './nav-bar-comp.component.html',
  styleUrls: ['./nav-bar-comp.component.css']
})

export class NavBarCompComponent implements OnInit {

  public activeUser: User;
  public alertNum: number = 0;
  public userManageAlertsArr: any[] = [];

  constructor(private _userSrv: UserService,
              private _portfolioSrv: PortfolioService,
              private _alertsSrv: AlertsService) {

    this.activeUser = this._userSrv.getActiveUser();
  }

  ngOnInit() {

    interval(4000).subscribe(() => {
      this.alertNum = 0;
      if (this._userSrv.isLoggedIn()) {
        this.activeUser = this._userSrv.getActiveUser();

        for (var i = 0; i < this.activeUser.portfolio.length; i++) {
          this.alertNum += this.activeUser.portfolio[i].alertsArr.length;
        }
      }
      else {
        this.alertNum = 0;
      }
    });

  }

  isUserLoggedIn() {
    return this._userSrv.isLoggedIn();
  }

  login() {
    this._userSrv.login("yossi@yossi.com", "123")
      .subscribe((data: User) => {
        this.activeUser = data;
      });
  }

  logout() {
    this._userSrv.logout();
    // TODO : implelemnt!
    // portfolioSrv.logout();
    // $location.path("/");
  }

  getUserAlertsInfo() {
    this.activeUser = this._userSrv.getActiveUser();
    this.userManageAlertsArr.length = 0;

    if (this.activeUser !== null) {
      for (var i = 0; i < this.activeUser.portfolio.length; i++) {
        for (var j = 0; j < this.activeUser.portfolio[i].alertsArr.length; j++) {

          this._alertsSrv.getAlertInfo(this.activeUser.portfolio[i].alertsArr[j]["alertId"])
            .subscribe((response) => {
              var alertInfo = response;
              if ((alertInfo === null) || (alertInfo.length === 0)) {
                console.log("failed to get alert info");
                this.userManageAlertsArr.length = 0;
              }
              else {
                this.userManageAlertsArr.push(alertInfo);
              }
            });
          // this._alertsSrv.getAlertInfo(this.activeUser.portfolio[i].alertsArr[j]["alertId"])
          //   .then(function (response) {
          //     userManageAlertsArr.push(response);
          //   }, function (err) {
          //     console.log("failed to get alert info");
          //   });
        }
      }
    }
  }

  resetAlertsModal() {
    this.userManageAlertsArr.length = 0;
  }

  removeAlert(alert) {
    
    this._alertsSrv.removeAlert(alert["id"]).then((response) => {
        this._portfolioSrv.removeAlertFromStock(alert["id"], alert["stockSymbol"]).then((response1) => {
            var index = this.userManageAlertsArr.indexOf(alert);
            this.userManageAlertsArr.splice(index, 1);
            if (this.userManageAlertsArr.length === 0) {
                $('#alertsModal').modal('hide');
                this.resetAlertsModal();
            }
        }, function (err) {
            console.log(err)
        })
    }, function (err) {
        console.log(err);
    });
  }

  closeNavbar() {
    $('.navbar-toggler').click();
  }
}

