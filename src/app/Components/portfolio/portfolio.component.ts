import { Component, OnInit } from '@angular/core';
// import { Observable } from 'rxjs';
// import { FormGroup, FormControl} from '@angular/forms';
import { Router } from "@angular/router";

import { UserService } from '../../Services/User/user.service';
import { User } from '../../Services/User/user';
import { DataService } from '../../Services/Data/data.service';
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

    // var activerUser = this._userSrv.getActiveUser();

    if (this.currentUser === null) {
      this._route.navigate(['/home']);
    } else {
      this.userPortfolio = this.currentUser["portfolio"];
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
    for (let i = 0; i < this.stockArr.length; i++) {
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
          -1);

        this._portfolioSrv.addStockToPortfolio(
          stock.name,
          stock.symbol,
          repObj).then(reply => {
            this.stockArr = reply
          });
      }
      catch (err) {
        console.error(err);
      }
    }
    else {
      this.input = "Stock already found in portfolio!!!!";
    }
    this.stockList.length = 0;
  }

  getAlertsInfo(symbol) {
    // this.stockAlertInfoArr.length = 0;

    if (symbol) {
      var alertsArr = this._portfolioSrv.getStockAlertsArr(symbol);

      if ($('#' + symbol).hasClass('show')) {
        $('#' + symbol).collapse('hide');
        let indexToSplice: any = [];
        for (let i = 0; i < this.stockAlertInfoArr.length; i++) {
          if (this.stockAlertInfoArr[i].stockSymbol === symbol) {
            indexToSplice.push(i);
            // break;
          }
        }

        for (let i = indexToSplice.length - 1; i >= 0; i--) {
          this.stockAlertInfoArr.splice(indexToSplice[i], 1);
        }
      }
      else {
        for (let j = 0; j < alertsArr.length; j++) {
          this._alertsSrv.getAlertInfo(alertsArr[j].alertId)
            .subscribe((response) => {
              var alertInfo = response;
              if ((alertInfo === null) || (alertInfo.length === 0)) {
                console.error("alert not found on server");
              }
              else {
                this.stockAlertInfoArr.push(alertInfo);
              }
            });
        }
      }
    }
  }

  async removeStock(stock) {
    for (var i = 0; i < stock.alertsArr.length; i++) {
      // this.removeAlert(stock.alertsArr[i]["alertId"], stock.symbol);
      this._alertsSrv.removeAlert(stock.alertsArr[i]["alertId"]).then(response => {
        //nothing to do
      }, error => {
        console.log(error);
      });
    }

    this._portfolioSrv.removeStockFromPortfolio(stock.name, stock.symbol).then(success => {
      this.stockArr = success;
    }, error => {
      console.error(error);
    });
  }

  async refreshStock(stock) {

    try {
      let repObj: {} = await this._dataSrv.getStockInfo(
        stock.name,
        stock.symbol,
        -1);

      this.stockArr = this._portfolioSrv.updateStockInPortfolio(
        stock.name,
        stock.symbol,
        repObj);
    }
    catch (err) {
      console.log(err);
    }
  }

  getStockInfo(stock) {
    console.log(stock.symbol);
  }

  setAlertInfo(stock) {
    this.alertStock = {
      "name": stock.name,
      "symbol": stock.symbol,
      "price": stock.cprice
    };
  }

  openStockChart(stock) {
    this._route.navigate(['/charts/' + stock.symbol + '/1m']);
  }

  removeAlert(alertId, stockSymbol) {
    this._alertsSrv.removeAlert(alertId).then(response => {

      this._portfolioSrv.removeAlertFromStock(alertId, stockSymbol)
        .then(response1 => {
          this.stockArr = <any[]>response1;
          this.getAlertsInfo(stockSymbol);
          for (let i = 0; i < this.stockAlertInfoArr.length; i++) {
            if (this.stockAlertInfoArr[i]["symbol"] === stockSymbol) {
              $('#' + stockSymbol).collapse('hide');
            }
          }
        },
          error => {
            console.error(error);
          });

    }, error => {
      console.error(error);
    });
  }

  resetAlertModal() {
    this.alertStock = { "name": "", "symbol": "", "price": 0 };
    this.errorMessage = "";
    this.alertType = "";
    this.alertPrice = 0;
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
              this.stockArr = response2["stockArr"];
              this.getAlertsInfo(response2["returnSymbol"]);
            });
        }

      });

    $('#stockAlertModal').modal('hide');
    this.resetAlertModal();
    this.errorMessage = "";
  }
}
