import { Component, OnInit } from '@angular/core';
// import { Alert } from '../../Services/Alerts/Alert'
import { Observable } from 'rxjs';
import { FormGroup, FormControl} from '@angular/forms';
import {Router} from "@angular/router";

import { UserService } from '../../Services/User/user.service';
import { User } from '../../Services/User/user';
import { DataService } from '../../Services/Data/data.service'
import { PortfolioService } from '../../Services/Portfolio/portfolio.service';
import { AlertsService } from 'src/app/Services/Alerts/alerts.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})


export class PortfolioComponent implements OnInit {

  // searchStockForm : FormGroup;
  currentUser : User;
  input : string = "";
  stockList: any[] = [];
  stockArr: any[] = [];
  userPortfolio = [];
  stcokInfo = [{"name" : ""}];
  stockAlertInfoArr = [];

  constructor(private _userSrv: UserService,
              private _dataSrv: DataService,
              private _route: Router,
              private _portfolioSrv: PortfolioService,
              private _alertsSrv: AlertsService) {  

    this.currentUser = _userSrv.getActiveUser();
  }

  ngOnInit() {

    var activerUser = this._userSrv.getActiveUser();

    if (activerUser === null) {
      this._route.navigate(['/home']);
    } else {
        this.userPortfolio = activerUser["portfolio"];
        this.buildStockArray();
    }
  }

  async buildStockArray() {
    this.stockArr.length = 0;

    for (var i = 0; i < this.userPortfolio.length; i++) {
          // .subscribe((data: {}) => 
      try {
          let repObj : {} = await this._dataSrv.getStockInfo(
            this.userPortfolio[i].name,
            this.userPortfolio[i].symbol, 
            i);

          // let last = repObj[Object.keys(repObj)[Object.keys(repObj).length-1]];
          // let stockObj = {};
          // stockObj["currentPrice"] = last["close"];
          // stockObj["openPrice"] = last["open"];
          // stockObj["dayVolume"] = last["volume"];
          // stockObj["changePercent"] = last["changePercent"];
          // stockObj["name"] = this.userPortfolio[repObj["index"]].name;
          // stockObj["symbol"] = this.userPortfolio[repObj["index"]].symbol;
          // stockObj["dchange"] =
          // stockObj["overallP"] =
          this.stockArr = this._portfolioSrv.buildStockPortfolio(
                              this.userPortfolio[repObj["index"]],
                              repObj);
        }
        catch (err) {
          console.log(err);
        }
        // console.log(this.userPortfolio[i].symbol);
    }
  }

  searchStock (searchStr) {
    if (searchStr.length > 1) {
        this.stockList = this._dataSrv.searchStock(searchStr);
        // .then(function (response) {
        //     this.stockList = response;
        // }, function (err) {
        //     console.log(err);
        //     this.stockList.length = 0;
        // })
    }
    else {
      this.stockList.length = 0;
    }
  }

  addStockToPortfolio(stock) {
    console.log(stock.symbol);
  }

  getAlertsInfo(symbol) {
    if (symbol) {
      var alertsArr = this._portfolioSrv.getStockAlertsArr(symbol);

      if ($('#' + symbol).hasClass('show')) {
          $('#' + symbol).collapse('hide');
          this.stockAlertInfoArr.length = 0;
      }
      else {
          for (var j = 0; j < alertsArr.length; j++) {
              this._alertsSrv.getAlertInfo(alertsArr[j].alertId)
                  .subscribe((response) => {
                      var alertInfo = response;
                      if (alertInfo !== null) {
                          this.stockAlertInfoArr.push(alertInfo);
                      }
                  });
          }
      }
    }
  }

  removeStock (stock) {
    console.log(stock.symbol);
  }

  refreshStock (stock) {
    console.log(stock.symbol);
  }

  getStockInfo(stock) {
    console.log(stock.symbol);
  }

  setAlertInfo(stock) {
    console.log(stock.symbol);
  }
 
  openStockChart(stock) {
    console.log(stock.symbol);
  }

  removeAlert(alertId, stockSymbol) {
    console.log(alertId, stockSymbol);
  }

  resetAlertModal() {
    console.log("resetAlertModal");
  }

  setStockAlert() {
    console.log("setStockAlert");
  }

}
