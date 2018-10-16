import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getRTperformance() {
    // var key = configSrv.getStockInfoApiKey();
    const key = "0ME2BHQ21RW7FMKX";

    let theUrl: string = 
      "https://www.alphavantage.co/query?function=SECTOR&apikey=" + key;
    let reply = {};

    this.http.get(theUrl)
      .subscribe((data) =>
      {
        if (data.hasOwnProperty("Rank A: Real-Time Performance")) {
            var RTperformance = data["Rank A: Real-Time Performance"];
            reply = { "data": RTperformance };
        }
      });
        
    return reply;
  }

// getCurrencyValue(C1, C2) {
//     //var key = configSrv.getStockInfoApiKey();
//     const key = "0ME2BHQ21RW7FMKX";

//     let theUrl = "https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=" +
//         C1 + "&to_currency=" + C2 + "&apikey=" + key;

//     let currencyObject = {};

//     this.http.get(theUrl)
//       .subscribe((data) =>
//       {        
//         if (data.hasOwnProperty("Realtime Currency Exchange Rate")) {
//             currencyObject[data["Realtime Currency Exchange Rate"]["4. To_Currency Name"]] =
//                 data["Realtime Currency Exchange Rate"]["5. Exchange Rate"];
//         }
//         else {
//             console.log("failed to parse Currency response ");
//             console.log(data);
//         }
//       });
//     // , function (err) {
//     //     $log.error(err);
//     //     async.reject("failed to get a currency value");
//     // })

//     return (currencyObject);
// }

// getCurrencies() {
//     // var async = $q.defer();
//     // var currArr = configSrv.getCurrencyArr();
//     const currArr = ["USD", "EUR", "GBP", "JPY", "CAD", "HKD"];

//     var C1 = currArr[0];
//     var C2 = "";

//     for (var i = 1; i < currArr.length; i++) {
//         C2 = currArr[i];
//         $timeout(getCurrencyValue.bind(null, C1, C2),
//             (30000 + (15000 * (i - 1))))
//     }

//     $q.all(premises).then(function (response) {
//         $localStorage.currencyObject = currencyObject;
//         async.resolve(currencyObject);
//     }, function (error) {
//         $log.log(error);
//         async.reject("failed to currency values")
//     });

//     return (async.promise);
// }

//getNDX() : {} {
  getNDX() : Observable<{}> {
//     var key = configSrv.getStockInfoApiKey();
    const stockInfoApiKey = "0ME2BHQ21RW7FMKX";

    var theUrl = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=NDX&outputsize=compact&apikey=" 
    + stockInfoApiKey;
    let reply = {};
    // let myObservable : Observable<{}> = Observable(reply);

    return this.http.get(theUrl);
      // .subscribe((data) =>
      // {
      //   console.log(data);
      //   if (data.hasOwnProperty("Time Series (Daily)")) {
      //     reply = data["Time Series (Daily)"];
      //     return myObservable;
      // }
//         async.resolve(Ndxinfo);
//     }, function (err) {
//         $log.error(err);
//         async.reject("failed to get NDX info");
    // })

//     premises.push(async.promise);
//     return async.promise;
    // return myObservable;
   }
}
