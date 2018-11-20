import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs/';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  static user: User = {id:-1,fname:"",lname:"",email:"",password:"", portfolio:[]}
  static singletonInstance: UserService;

  constructor(private http: HttpClient) {
    if (!UserService.singletonInstance) {
      // construct object
      UserService.singletonInstance = this;
    }
    if (!UserService.user) {
      UserService.user = {
        id: -1, fname: "", lname: "", email: "", password: "",
        portfolio: []
      }
    }

    return UserService.singletonInstance;
  }


  login(email: string, password: string): Observable<User> {

    let loginURL: string = "https://estockdata.herokuapp.com/users?email=" + email;

    return this.http.get(loginURL)
      .pipe(map(element => {
        UserService.user = {
          id: element[0]['id'],
          fname: element[0]['fname'],
          lname: element[0]['lname'],
          email: element[0]['email'],
          password: element[0]['password'],
          portfolio: []
        }
        for (let i = 0; i < element[0]['portfolio'].length; i++) {
          UserService.user.portfolio.push(element[0]['portfolio'][i]);
        }
        return UserService.user; //.asObservable();
      }));
  }

  logout(): void {
    UserService.user.fname = "";
    UserService.user.id = -1;
    UserService.user.lname = "";
    UserService.user.password = "";
    UserService.user.portfolio.length = 0;
    UserService.user.email = "";
  }

  isLoggedIn(): boolean {
    if (UserService.user.id !== -1) {
      return true;
    }
    return false;
  }

  getActiveUser(): User {
    if (UserService.user.id !== -1)
      return UserService.user;//.getValue();
    else
      return null;
  }

  signInNewUser(newUser: {}): Observable<boolean> {

    const loginURL = "https://estockdata.herokuapp.com/users/";

    let user: User = {
      id: undefined, fname: newUser['fname'],
      lname: newUser['lname'], email: newUser['email'],
      password: newUser['password'], portfolio: []
    }

    return this.http.post(loginURL, user)
      .pipe(map(element => {
        UserService.user.id = element['id'];
        UserService.user.fname = element['fname'];
        UserService.user.lname = element['lname'];
        UserService.user.password = element['password'];
        UserService.user.email = element['email'];
        UserService.user.portfolio = [];
        return true;
      }));
  }

  updateActiveUser() : Observable<User> {

    var loginURL = "https://estockdata.herokuapp.com/users/" + 
                    UserService.user.id;

    return this.http.get(loginURL).
      pipe(map( response => {
        UserService.user.id = response["id"];
        UserService.user.fname = response["fname"];
        UserService.user.lname = response["lname"];
        UserService.user.email = response["email"];
        UserService.user.password = response["password"];
        UserService.user.portfolio = response["portfolio"];
        return UserService.user;
    }));
  }
}
