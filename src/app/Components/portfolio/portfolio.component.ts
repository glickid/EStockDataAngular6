import { Component, OnInit } from '@angular/core';
// import { Observable } from 'rxjs';
// import { FormGroup, FormControl} from '@angular/forms';
import { Router } from "@angular/router";

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

  currentUser: User;
  input: string = "";
  stockList: any[] = [];
  stockArr: any[] = [];
  userPortfolio = [];
  stcokInfo = [{ "name": "" }];
  stockAlertInfoArr = [];
  alertStock = { "name": "", "symbol": "", "price": 0 };
  alertPrice = 0;
  alertType = "";
  errorMessage = "";

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
      try {
        let repObj: {} = await this._dataSrv.getStockInfo(
          this.userPortfolio[i].name,
          this.userPortfolio[i].symbol,
          i);

        this.stockArr = this._portfolioSrv.buildStockPortfolio(
          this.userPortfolio[repObj["index"]],
          repObj);
      }
      catch (err) {
        console.log(err);
      }
    }
  }

  searchStock(searchStr) {
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

  async addStockToPortfolio(stock) {
    // console.log(stock.symbol);
    var found = false;
    for (var i = 0; i < this.stockArr.length; i++) {
      if (this.stockArr[i].symbol === stock.symbol) {
        //stock already found in array - bail out
        found = true;
        break;
      }
    }
    if (!found) {
      try {
        let repObj: {} = await this._dataSrv.getStockInfo(
          stock.name,
          stock.symbol,
          i);

        this._portfolioSrv.addStockToPortfolio(
          stock.name,
          stock.symbol,
          repObj).then( reply => {
            this.stockArr = reply
          });
      }
      catch (err) {
        console.log(err);
      }
    }
    else {
      this.input = "Stock already found in portfolio!!!!";
    }
    this.stockList.length = 0;
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

  removeStock(stock) {
    console.log(stock.symbol);
  }

  refreshStock(stock) {
    console.log(stock.symbol);
  }

  getStockInfo(stock) {
    console.log(stock.symbol);
  }

  setAlertInfo(stock) {
    this.alertStock = {
      "name": stock.name, "symbol": stock.symbol,
      "price": stock.cprice
    };
  }

  openStockChart(stock) {
    console.log(stock.symbol);
  }

  removeAlert(alertId, stockSymbol) {
    console.log(alertId, stockSymbol);
  }

  resetAlertModal() {
    this.alertStock = { "name": "", "symbol": "", "price": 0 };
  }

  setStockAlert() {

    if (this.alertType === "") {
      this.errorMessage = "Please select Alert Type";
      return;
    }
    if (this.alertPrice === 0) {
      this.errorMessage = "Please enter price";
      return;
    }

    this._alertsSrv.setNewAlert(
      this.currentUser["id"],
      this.alertType,
      this.alertStock.symbol,
      this.alertPrice).then(response => {

        if (response["id"] >= 0) {
          this._portfolioSrv.addAlertToStock(
            response["stockSymbol"], response["id"]).then(response2 => {
              this.stockArr = response2;
              this.getAlertsInfo(this.alertStock.symbol);
            })
        }
      });

    $('#stockAlertModal').modal('hide');
    this.resetAlertModal();
    this.errorMessage = "";
  }
}
