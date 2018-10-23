import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  stocksArr: any[] = [];


  constructor(private http: HttpClient) { 
    if (this.stocksArr.length === 0) {
        this.getStockSymboles().subscribe(response => {
          this.stocksArr = response;
        });
    }
  }

  getStockSymboles() : Observable<any[]> {
    var theUrl = "https://api.iextrading.com/1.0/ref-data/symbols";

    return this.http.get<any[]>(theUrl).pipe(
      catchError(this.handleError('Could not get Active info', [])));

    // return this.http.get(theUrl).pipe(function (response) {
    //     for (var i = 0; i < response.data.length; i++) {
    //         if (response.data[i].isEnabled === true) {
    //             stocksArr.push(response.data[i]);
    //         }
    //     }
    //     async.resolve(stocksArr);
    // }, function (err) {
    //     $log.error(err);
    //     async.reject("failed to get symbol list");
    // });

    // return async.promise;
  }

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

getCurrencyValue(C1, C2) : Observable<object | any[]> {
//     //var key = configSrv.getStockInfoApiKey();
  const key = "0ME2BHQ21RW7FMKX";

    let theUrl = "https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=" +
        C1 + "&to_currency=" + C2 + "&apikey=" + key;

    return this.http.get(theUrl).pipe(
      catchError(this.handleError('Could not get NDX info', [])));
}
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

  getNDX() : Observable<object | any[]> {
//     var key = configSrv.getStockInfoApiKey();
    const stockInfoApiKey = "0ME2BHQ21RW7FMKX";

    var theUrl = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=NDX&outputsize=compact&apikey=" 
    + stockInfoApiKey;

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

  getGainersList() : Observable<any[]> {
    var theUrl = "https://api.iextrading.com/1.0/stock/market/list/gainers";

    return this.http.get<any[]>(theUrl).pipe(
      catchError(this.handleError('Could not get Gainers info', [])));
  }

  getLosersList() : Observable<any[]> {
    var theUrl = "https://api.iextrading.com/1.0/stock/market/list/losers";

    return this.http.get<any[]>(theUrl).pipe(
      catchError(this.handleError('Could not get Losers info', [])));
  }

  getMostActive() : Observable<any[]> {
    var theUrl = "https://api.iextrading.com/1.0/stock/market/list/mostactive";

    return this.http.get<any[]>(theUrl).pipe(
      catchError(this.handleError('Could not get Active info', [])));
  }

 searchStock(searchStr) {
    var stockList = []
   
    var lowerName = "";
    var lowerSym = "";
    var lowerStr = searchStr.toLowerCase();

    for (var i = 0; i < this.stocksArr.length; i++) {
        lowerName = this.stocksArr[i].name.toLowerCase();
        lowerSym = this.stocksArr[i].symbol.toLowerCase();

        if ((lowerName.includes(lowerStr)) ||
            (lowerSym.includes(lowerStr))) {
            stockList.push ( {"name" : this.stocksArr[i].name, 
                              "symbol" : this.stocksArr[i].symbol});
        }
    }

    return stockList;
  }
}
