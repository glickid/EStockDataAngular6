import { Component, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';
import { Observable } from 'rxjs';

import { DataService } from '../Services/Data/data.service';
import { interval, Subscription } from 'rxjs';
import { UserService } from '../Services/User/user.service'
import { User } from '../Services/User/user';


@Component({
  // providers:[UserComponent ],
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

@HostListener('window:resize', ['$event'])

export class HomeComponent implements OnInit {

  quantity: number = 3;
  NDXinfo = [];
  gainersList = [];
  loosersList = [];
  mostActiveList = [];
  currenciesArr = [];
  public innerHeight: any;
  subscription: Subscription;
  activeUser : User;
  //  = {id:-1,fname:"",lname:"",email:"",password:"",
  //                     portfolio:[]}


  constructor(private _dataService: DataService,
              private _userSrv: UserService ) { 
                this.activeUser = this._userSrv.getActiveUser();
              }

  ngOnInit() {
    this.innerHeight = window.innerHeight;
    console.log(this.innerHeight);
    if (this.innerHeight > 600)
      this.quantity = 6;

    
    this.getNDXinfo();
    this.getGainers();
    this.getLosers();
    this.getMostActive();
    this.getCurrencyValues();
    this.activeUser = this._userSrv.getActiveUser();
  }
  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }

  onResize(event) {
    this.innerHeight = window.innerHeight;
    console.log(this.innerHeight);
    if (this.innerHeight > 600)
      this.quantity = 6;
    else
      this.quantity = 3;

    this.getNDXinfo();
  }

  isUserLoggedIn() {
    if (!this._userSrv.isLoggedIn()) {
      this.activeUser = this._userSrv.getActiveUser();
      if (( this.activeUser === null) ||
          (this.activeUser.id === -1) )
        return false;
      else
          return true;
    }
    this.activeUser = this._userSrv.getActiveUser();
    return true;
  }

  login() {
    this._userSrv.login("yossi@yossi.com", "123")
      // .subscribe((data: User) => console.log(data) );
      .subscribe((data: User) => 
      {
        this.activeUser = this._userSrv.getActiveUser();
      });
  }

  updateNdxLength(newValue) {
    this.quantity = newValue;
    this.getNDXinfo();
  }

  getNDXinfo() {
    this.NDXinfo.length = 0;
    this._dataService.getNDX().subscribe((data) => {
      let i: number = 0;
      if (data.hasOwnProperty("Time Series (Daily)")) {
        let obj: any = data["Time Series (Daily)"];
        //this.NDXinfo.push(obj); //Object.keys(obj).push({key, obj[key]});
        for (let k of Object.keys(obj)) {
          let value = obj[k];
          this.NDXinfo.push({ k, value });
          // console.log(obj[k]);
          i++;
          if (i === this.quantity)
            break;
        }
      }
      else {
        console.log(data);
      }
    });
  }


  getGainers()
  {
    this._dataService.getGainersList().subscribe((data) => {
     
      let sortedArray : any = [];
      this.gainersList.length = 0;
      
      sortedArray = data.sort((obj1, obj2) => {
        if (obj1.changePercent < obj2.changePercent) {
            return 1;
        }
    
        if (obj1.changePercent > obj2.changePercent) {
            return -1;
        }
    
        return 0;
      });
      this.gainersList = sortedArray.slice(0,5);
    });
  }

  getLosers() {
    this._dataService.getLosersList().subscribe((data) => {
      
      let sortedArray : any = [];
      this.loosersList.length = 0;

      sortedArray = data.sort((obj1, obj2) => {
        if (obj1.changePercent > obj2.changePercent) {
          return 1;
        }
    
        if (obj1.changePercent < obj2.changePercent) {
            return -1;
        }
    
        return 0;
      });
      this.loosersList = sortedArray.slice(0,5);
    });
  }

  getMostActive() {
    this._dataService.getMostActive().subscribe((data) => {
      let sortedArray : any = [];
      this.mostActiveList.length = 0;

      sortedArray = data.sort((obj1, obj2) => {
        if (obj1.latestVolume < obj2.latestVolume) {
            return 1;
        }
    
        if (obj1.latestVolume > obj2.latestVolume) {
            return -1;
        }
    
        return 0;
      });
      this.mostActiveList = sortedArray.slice(0,5);
    // }, function (err) {
    //   console.log(err);
    // })
    });
  }

  getCurrencyValues() {
    const currArr: string[] = ["USD", "EUR", "GBP", "JPY", "CAD", "HKD"];

    let C1: string = currArr[0];
    let C2: string = "";
    // const source = interval(22000); //22 secomds

    this.currenciesArr.length = 0;

    for (let i = 1; i < currArr.length; i++) {
//         $timeout(getCurrencyValue.bind(null, C1, C2),
//             (30000 + (15000 * (i - 1))))
//     }
    // this.subscription = source.subscribe(val => {
      C2 = currArr[i];

      this._dataService.getCurrencyValue(C1,C2).subscribe((data) => {

        if (data.hasOwnProperty("Realtime Currency Exchange Rate")) {
          let currencyObject = {};

          currencyObject["name"] =
            data["Realtime Currency Exchange Rate"]["4. To_Currency Name"];
          currencyObject["value"] =
            data["Realtime Currency Exchange Rate"]["5. Exchange Rate"];
          
          this.currenciesArr.push(currencyObject);
        }
        else {
          console.log("failed to parse Currency response ");
          console.log(data);
        }
      });
    // });
    // if (i=== (currArr.length-1))
      // this.subscription.unsubscribe();
    }
  }
}
