import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { Alert } from './Alert';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  static alertsArr: any[] = [];
  static singletonInstance: AlertsService;

  constructor(private http: HttpClient) { }

  getAlertInfo(alertId: number) {
    var url = "https://estockdata.herokuapp.com/alerts/" + alertId;

    return this.http.get<any[]>(url).pipe(
      catchError(this.handleError('Could not get Active info', [])));
  }

  private handleError<T>(oAlertsServiceperation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    };
  }

  async setNewAlert(userId: number, alertType: string,
    stockSymbol: string, price: number) {
    var found = false;

    for (var i = 0; i < AlertsService.alertsArr.length; i++) {
      if ((AlertsService.alertsArr[i].stockSymbol === stockSymbol) &&
        (AlertsService.alertsArr[i].userId === userId) &&
        (AlertsService.alertsArr[i].price === price)) {
        found = true;
        break;
      }
    }

    if (!found) {
      var alert: Alert = {
        "id": undefined, "userId": userId,
        "alertType": alertType,
        "stockSymbol": stockSymbol, "price": price,
        "triggered": false
      };

      let reply = await this.http.
        post("https://estockdata.herokuapp.com/alerts", alert).toPromise();

      if (reply["id"] !== undefined) {
        alert.id = reply["id"];
        AlertsService.alertsArr.push(alert);
        return (alert);
      }
      else {
        console.log("failed to POST alert to server");
        return null;
      }
    }
    else {
      console.log("alert already added!");
      return AlertsService.alertsArr[i];
    }
  }

  async removeAlert(alertId) {
    var url = "https://estockdata.herokuapp.com/alerts/" + alertId;

    let reply = await this.http.delete(url).toPromise();

    for (var i = 0; i < AlertsService.alertsArr.length; i++) {
      if (AlertsService.alertsArr[i].id === alertId) {
        AlertsService.alertsArr.splice(i, 1);
      }
    }
  }

}