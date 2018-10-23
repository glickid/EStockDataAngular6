import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/'; 

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  static user: User;// = {id:-1,fname:"",lname:"",email:"",password:"", portfolio:[]}
  // private _user = new BehaviorSubject<User>(this.user);
  static singletonInstance: UserService;
   
  constructor (private http: HttpClient) {
    if (!UserService.singletonInstance) {
      // construct object
      UserService.singletonInstance = this;
    // let users_ = [this.user];
    // this._user.next(users_);   
    }
    if (!UserService.user) {
      UserService.user = {id:-1,fname:"",lname:"",email:"",password:"",
        portfolio:[]}
    }

    return UserService.singletonInstance;  
  }          
  

  login(email:string, password:string) : Observable<User> {

    let loginURL:string = "https://estockdata.herokuapp.com/users?email=" + email;

     return this.http.get(loginURL)
      .pipe(map( element => {
        UserService.user = {id:element[0]['id'],
                          fname:element[0]['fname'],
                          lname:element[0]['lname'],
                          email:element[0]['email'],
                          password:element[0]['password'],
                          portfolio:[]}
        // user.id = element[0]['id'];
        // user.fname = element[0]['fname'];
        // user.lname = element[0]['lname'];
        // user.password = element[0]['password'];
        // user.email = element[0]['email'];
        for ( let i=0; i<element[0]['portfolio'].length; i++)
        {
          UserService.user.portfolio.push(element[0]['portfolio'][i]);
        }
        //let users_ = [user, ...this._user.getValue()];
        // this._user.next(user);
        return UserService.user; //.asObservable();
      }));
    }

    logout() : void {
      UserService.user.fname = "";
      UserService.user.id = -1;
      UserService.user.lname = "";
      UserService.user.password = "";
      UserService.user.portfolio.length = 0;
      UserService.user.email = "";
    }

    isLoggedIn() : boolean {
      // let user  = UserService._user.getValue();

      if (UserService.user.id !== -1) {
        return true;
      }
      return false;
    }

    getActiveUser() : User {
      if (UserService.user.id !== -1)
        return UserService.user;//.getValue();
      else 
         return null;
    }

    signInNewUser(newUser: {} ) : Observable<boolean> {
      
      const loginURL = "https://estockdata.herokuapp.com/users/";

      let user : User = {id:undefined,fname:newUser['fname'],
      lname:newUser['lname'],email:newUser['email'],
      password:newUser['password'], portfolio:[]}

      return this.http.post(loginURL, user)
        .pipe(map( element => {
          UserService.user.id = element['id'];
          UserService.user.fname = element['fname'];
          UserService.user.lname = element['lname'];
          UserService.user.password = element['password'];
          UserService.user.email = element['email'];
          UserService.user.portfolio = [];
        return true;
      }));
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
