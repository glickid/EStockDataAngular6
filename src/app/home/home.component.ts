import { Component, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';
// import { Observable } from 'rxjs';
import { Router } from '@angular/router';

// import { flexslider } from 'angular-flexslider';
import { NgwWowService } from 'ngx-wow';
import * as CanvasJS from '../../canvasjs-2.2/canvasjs.min.js';

import { DataService } from '../Services/Data/data.service';
import { interval, Subscription } from 'rxjs';
import { UserService } from '../Services/User/user.service'
import { User } from '../Services/User/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
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
  activeUser: User;

  constructor(private _dataService: DataService,
    private _userSrv: UserService,
    private _wowService: NgwWowService,
    private _router: Router) {
    this.activeUser = this._userSrv.getActiveUser();
  }

  ngOnInit() {
    this.innerHeight = window.innerHeight;

    if (this.innerHeight > 600)
      this.quantity = 6;

    this.getNDXinfo();
    this.getGainers();
    this.getLosers();
    this.getMostActive();
    this.getCurrencyValues();
    this.activeUser = this._userSrv.getActiveUser();

    $(".menu-toggle").click(function () {
      $(this).toggleClass("active");
      $(".main-navigation ul").toggleClass("active");
    });

    // WOW initiation
    this._wowService.init();
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
      if ((this.activeUser === null) ||
        (this.activeUser.id === -1))
        return false;
      else
        return true;
    }
    this.activeUser = this._userSrv.getActiveUser();
    return true;
  }

  login() {
    this._userSrv.login("yossi@yossi.com", "123")
      .subscribe((data: User) => {
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
        let ndxDataObj: any = data["Time Series (Daily)"];
        for (let k of Object.keys(ndxDataObj)) {
          let value = ndxDataObj[k];
          this.NDXinfo.push({ k, value });
          i++;
          if (i === this.quantity)
            break;
        }

        this.loadNdxChart(ndxDataObj);
      }
      else {
        console.log(data);
      }
    });
  }

  loadNdxChart(ndxDataObj) {

    let dataPoints: any = [];

    var chart = new CanvasJS.Chart("nasdaqChartContainer", {
      animationEnabled: true,
      theme: "light1", // "light1", "light2", "dark1", "dark2"
      exportEnabled: true,
      title: {
        text: "Nasdaq 100 Index"
      },
      subtitles: [{
        text: "Daily"
      }],
      axisX: {
        interval: 1,
        intervalType: "day",
        valueFormatString: "DD-MM-YYYY"
      },
      axisY: {
        includeZero: false,
        prefix: "$",
        title: "Price Close",
        valueFormatString: "####"
      },
      data: [{
        type: "line",
        markerSize: 12,
        xValueFormatString: "DD-MM-YYYY",
        yValueFormatString: "###.#",
        dataPoints: dataPoints
      }]
    });

    let numItems: number = 0;

    for (let key in ndxDataObj) {
      numItems++;
      let date = new Date(key);
      let price = Math.floor(ndxDataObj[key]["4. close"]);
      let obj = { "x": date, "y": price };

      dataPoints.push(obj);
      if (numItems > 11)
        break;
    }

    chart.render();
  }

  getGainers() {
    this._dataService.getGainersList().subscribe((data) => {

      let sortedArray: any = [];
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
      this.gainersList = sortedArray.slice(0, 5);
    });
  }

  getLosers() {
    this._dataService.getLosersList().subscribe((data) => {

      let sortedArray: any = [];
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
      this.loosersList = sortedArray.slice(0, 5);
    });
  }

  getMostActive() {
    this._dataService.getMostActive().subscribe((data) => {
      let sortedArray: any = [];
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
      this.mostActiveList = sortedArray.slice(0, 5);
    });
  }

  getCurrencyValues() {
    const currArr: string[] = ["USD", "EUR", "GBP", "JPY", "CAD", "HKD"];

    let C1: string = currArr[0];
    let C2: string = "";

    this.currenciesArr.length = 0;

    for (let i = 1; i < currArr.length; i++) {
      //         $timeout(getCurrencyValue.bind(null, C1, C2),
      //             (30000 + (15000 * (i - 1))))
      //     }
      // this.subscription = source.subscribe(val => {
      C2 = currArr[i];

      this._dataService.getCurrencyValue(C1, C2).subscribe((data) => {

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
          // console.log(data);
        }
      });
    }
  }

  changeRoute(route: string) {
    this._router.navigate([route]);
  }
}
