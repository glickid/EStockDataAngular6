import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { User } from './user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _user: User = {id:-1,fname:"",lname:"",email:"",password:"",
                        portfolio:[]}

  constructor (private http: HttpClient) {};

  login(email:string, password:string) : Observable<User> {

    let loginURL:string = "https://estockdata.herokuapp.com/users?email=" + email;

     return this.http.get(loginURL)
      .pipe(map( element => {
        this._user.id = element[0]['id'];
        this._user.fname = element[0]['fname'];
        this._user.lname = element[0]['lname'];
        this._user.password = element[0]['password'];
        this._user.email = element[0]['email'];
        for ( let i=0; i<element[0]['portfolio'].length; i++)
        {
          this._user.portfolio.push(element[0]['portfolio'][i]);
        }
        return this._user;
      }));
    }

    logout() {
      this._user.fname = "";
      this._user.id = -1;
      this._user.lname = "";
      this._user.password = "";
      this._user.portfolio.length = 0;
      this._user.email = "";
    }

    isLoggedIn() {
      if (this._user.id !== -1) {
        return true;
      }
      return false;
    }

    getActiveUser() {
      // if (this._user.id !== -1)
        return this._user;
      // else 
        // return null;
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
