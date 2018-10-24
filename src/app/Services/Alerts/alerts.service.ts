import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor(private http:HttpClient) { }

  getAlertInfo(alertId: number) {
    var url="https://estockdata.herokuapp.com/alerts/" + alertId;

    return this.http.get<any[]>(url).pipe(
      catchError(this.handleError('Could not get Active info', [])));
  }
  
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      console.error(error);

      return of(result as T);
    };
  }
}
