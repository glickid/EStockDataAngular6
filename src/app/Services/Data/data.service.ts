import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';


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
    // let reply = {};

    return this.http.get(theUrl).pipe(
      catchError(this.handleError('Could not get RT performance info', [])));

    // this.http.get(theUrl)
    //   .subscribe((data) =>
    //   {
    //     if (data.hasOwnProperty("Rank A: Real-Time Performance")) {
    //         var RTperformance = data["Rank A: Real-Time Performance"];
    //         reply = { "data": RTperformance };
    //     }
    //   });
        
    // return reply;
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

  getNDX() : Observable<{}> {
//     var key = configSrv.getStockInfoApiKey();
    const stockInfoApiKey = "0ME2BHQ21RW7FMKX";

    var theUrl = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=NDX&outputsize=compact&apikey=" 
    + stockInfoApiKey;
    // let reply = {};

    return this.http.get(theUrl).pipe(
      catchError(this.handleError('Could not get NDX info', [])));
   }

   /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      console.error(error); // log to console instead
  
      // this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getGainersList() : Observable<{}> {
    var theUrl = "https://api.iextrading.com/1.0/stock/market/list/gainers";
    // var async = $q.defer();

    return this.http.get(theUrl).pipe(
      catchError(this.handleError('Could not get Gainers info', [])));

    // $http.get(theUrl).then(function (response) {
    //     gainersArr.length = 0;
    //     gainersArr = response.data.slice(0);
    //     async.resolve(gainersArr);
    // }, function (err) {
    //     $log.error(err);
    //     async.reject("failed to get gainers info");
    // });

    // return async.promise;
  }

  getLosersList() : Observable<{}> {
    var theUrl = "https://api.iextrading.com/1.0/stock/market/list/losers";
    // var async = $q.defer();

    return this.http.get(theUrl).pipe(
      catchError(this.handleError('Could not get Losers info', [])));
    // $http.get(theUrl).then(function (response) {
    //     losersArr.length = 0;
    //     losersArr = response.data.slice(0);
    //     async.resolve(losersArr);
    // }, function (err) {
    //     $log.error(err);
    //     async.reject("failed to get losers info");
    // });

    // return async.promise;
  }

  getMostActive() : Observable<{}> {
    var theUrl = "https://api.iextrading.com/1.0/stock/market/list/mostactive";

    // var async = $q.defer();
    // mostActiveArr.length = 0;

    return this.http.get(theUrl).pipe(
      catchError(this.handleError('Could not get Active info', [])));
    // $http.get(theUrl).then(function (response) {
    //     mostActiveArr = response.data.slice(0);
    //     async.resolve(mostActiveArr);
    // }, function (err) {
    //     $log.error(err);
    //     async.reject("failed to get losers info");
    // });

    // return async.promise;
}
}
