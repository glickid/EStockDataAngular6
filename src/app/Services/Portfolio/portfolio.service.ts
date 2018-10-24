import { Injectable } from '@angular/core';
import { portfolio } from './Portfolio';

import { UserService } from '../User/user.service'

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  static stockArr: portfolio[] = [];

  constructor(private _userSrv: UserService) { }

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
          this.calcOverallProfit(stockDataObj);
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

  calcOverallProfit(stock: any, pprice:number) {
    var num = (((stock.currentPrice - pprice) / pprice) * 100);
    return num.toFixed(2);
  }
}
