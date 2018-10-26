import { Injectable } from '@angular/core';
import { portfolio } from './Portfolio';

import { UserService } from '../User/user.service'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  static singletonInstance: PortfolioService;

  static stockArr: portfolio[] = [];

  constructor(private _userSrv: UserService,
    private http: HttpClient) { }

  buildStockPortfolio(stockArrItem, stockDataObj) {
    var updated = false;

    for (var i = 0; i < PortfolioService.stockArr.length; i++) {
      if (PortfolioService.stockArr[i].symbol === stockDataObj["symbol"]) {
        PortfolioService.stockArr[i].cprice = stockDataObj["currentPrice"];
        PortfolioService.stockArr[i].dvolume = stockDataObj["dayVolume"];
        PortfolioService.stockArr[i].dopen = stockDataObj["openPrice"];
        PortfolioService.stockArr[i].alertsArr = stockArrItem.alerts;
        PortfolioService.stockArr[i].dayChange =
          this.calcDayChange(stockDataObj);
        PortfolioService.stockArr[i].overallProfit =
          this.calcOverallProfit(stockDataObj, PortfolioService.stockArr[i].pprice);
        updated = true;
        break;
      }
    }
    if (!updated) //need to add to array
    {
      var stock: portfolio =
      {
        "name": this.shorten(stockArrItem["name"], 30),
        "symbol": stockArrItem["symbol"],
        "pprice": stockArrItem["pprice"],
        "pdate": stockArrItem["pdate"],
        "cprice": stockDataObj["currentPrice"],
        "dvolume": stockDataObj["dayVolume"],
        "dopen": stockDataObj["openPrice"],
        "dayChange": this.calcDayChange(stockDataObj),
        "overallProfit": this.calcOverallProfit(stockDataObj, stockArrItem["pprice"]),
        "alertsArr": stockArrItem["alertsArr"]
      };
      PortfolioService.stockArr.push(stock);
    }

    return (PortfolioService.stockArr);
  }

  getStockAlertsArr(symbol: string) {
    let activerUser = this._userSrv.getActiveUser();

    for (var i = 0; i < activerUser.portfolio.length; i++) {
      if (activerUser.portfolio[i]["symbol"] === symbol) {
        return activerUser.portfolio[i].alertsArr;
      }
    }
  }

  shorten(str: string, maxLen: number, separator = ' ') {
    if (str.length <= maxLen)
      return str;
    return str.substr(0, str.lastIndexOf(separator, maxLen));
  }

  calcDayChange(stock: any) {
    var num = (((stock.currentPrice - stock.openPrice) / stock.openPrice) * 100);
    return num.toFixed(2);
  }

  calcOverallProfit(stock: any, pprice: number) {
    var num = (((stock.currentPrice - pprice) / pprice) * 100);
    return num.toFixed(2);
  }

  calcCurrentDate() {
    var d = new Date(),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return "" + year + "-" + month + "-" + day;
  }

  async addStockToPortfolio(stockName, stockSymbol, infoObj) {

    let stock: portfolio =
    {
      "name": this.shorten(stockName, 30),
      "symbol": stockSymbol,
      "pprice": infoObj["currentPrice"],
      "pdate": this.calcCurrentDate(),
      "cprice": infoObj["currentPrice"],
      "dvolume": infoObj["dayVolume"],
      "dopen": infoObj["openPrice"],
      "dayChange": this.calcDayChange(infoObj),
      "overallProfit": "0%",
      "alertsArr": []
    };

    var activeUser = this._userSrv.getActiveUser();

    if (activeUser.id) {
      var url = "https://estockdata.herokuapp.com/users/" + activeUser.id;

      activeUser.portfolio.push(stock);
      let reply = await this.http.put(url, activeUser).toPromise();

      let reply2 = await this._userSrv.updateActiveUser().toPromise();

      PortfolioService.stockArr.push(stock);
      return PortfolioService.stockArr;
    }
    else {
      //oops, something very wrong here!
      console.error("user does not have an id!!");
      return [];
    }
  }

  async addAlertToStock(stockSymbol, alertId) {

    var activeUser = this._userSrv.getActiveUser();

    if (activeUser.id) {
      var url = "https://estockdata.herokuapp.com/users/" + activeUser.id;

      for (var i = 0; i < activeUser.portfolio.length; i++) {
        if (activeUser.portfolio[i]["symbol"] === stockSymbol) {
          activeUser.portfolio[i].alertsArr.push({ "alertId": alertId });
          break;
        }
      }

      let reply = await this.http.put(url, activeUser).toPromise();

      let reply2 = await this._userSrv.updateActiveUser().toPromise();
        
          for (let i = 0; i < PortfolioService.stockArr.length; i++) {
            if (PortfolioService.stockArr[i].symbol === stockSymbol) {
              PortfolioService.stockArr[i].alertsArr.push({ "alertId": alertId });
              return (PortfolioService.stockArr); // "symbol" : stockSymbol});
              break;
            }
          }
    }
    else {
      //oops, something very wrong here!
      console.log("user does not have an id!!")
      return null;
    }
  }
}
