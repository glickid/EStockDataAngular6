import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from './user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor (private http: HttpClient) {};

  login(email:string, password:string) : Observable<User> {

    let loginURL:string = "https://estockdata.herokuapp.com/users?email=" + email;


    return this.http.get<User>(loginURL);
                        // ...and calling .json() on the response to return data
                        //  .map((res:Response) => res.json())
                         //...errors if any
                        //  .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
        
     }
    // $http.get(loginURL).then(function (response) {
    //     //we assume ther would be only one user with this email!!
    //     if (response.data.length === 0)
    //     {
    //         async.reject("Invalid user");
    //     }
    //     else if(response.data[0].password === password)
    //     {
    //         activeUser = response.data[0];
    //         async.resolve(activeUser);
    //     }
    //     else
    //     {
    //         async.reject("Invalid password");
    //     }
    // }, function (err) {
    //     async.reject(err);
    // });

    // return async.promise;
  }
