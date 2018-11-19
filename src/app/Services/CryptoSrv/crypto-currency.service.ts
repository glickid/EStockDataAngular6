import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CryptoCurrencyService {

  constructor(private http: HttpClient) { }

  getBtcData(coin, market, frequency) {
    const stockInfoApiKey = "0ME2BHQ21RW7FMKX";

    let promise = new Promise((resolve, reject) => {
      var theUrl = "https://www.alphavantage.co/query?function=" + frequency +
        "&symbol=" + coin + "&market=" + market + "&apikey=" + stockInfoApiKey;

      this.http.get(theUrl).toPromise().then(response => {
        resolve(response); 
      }, (err => {
        console.error(err);
        reject("failed to get BTC info " + frequency + market);
      }));
    });

    return (promise);
  }
}
