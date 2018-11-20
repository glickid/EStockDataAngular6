import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { HostListener } from '@angular/core';
// import { setTimeout } from 'timers';

import * as CanvasJS from '../../../canvasjs-2.2/canvasjs.min.js';

import { UserService } from '../../Services/User/user.service';
import { User } from '../../Services/User/user';
import { DataService } from '../../Services/Data/data.service';
import { CryptoCurrencyService } from '../../Services/CryptoSrv/crypto-currency.service';


@Component({
  selector: 'app-crypto-currencies',
  templateUrl: './crypto-currencies.component.html',
  styleUrls: ['./crypto-currencies.component.css']
})

@HostListener('window:resize', ['$event'])

export class CryptoCurrenciesComponent implements OnInit {


  dataArrObj = [];
  noData: boolean = false;
  information = {};
  dataPoints = [];
  errorMessage: string = "";
  graphType: string = "";
  dataErrorMessage: string = "";
  activerUser : User = {id:-1, fname:"", lname:"", email:"", password:"",portfolio:[]};
  public innerWidth: any;

  constructor(private _userSrv: UserService,
    private _route: Router,
    private _dataSrv: DataService,
    private _cryptoCurSrv:CryptoCurrencyService) { 

    this.activerUser = this._userSrv.getActiveUser();

  }

  ngOnInit() {
    this.innerWidth = window.innerWidth;

    if (this.activerUser === null) {
      this._route.navigate(['/home']);
    } 

  }
  
  informationSize  () {
      if (Object.keys(this.information).length === 0)
          return false;
      else
          return true;
  }

  getDigitalCurrencyInfo (coin, market) {
      // var dataObj = {};
      var text = "";
      if (this.graphType === "") {
          this.errorMessage = "Please, select graph Type";
          return;
      }
      this.errorMessage = "";

      this._cryptoCurSrv.getBtcData(coin, market, this.graphType)
          .then( response => {
              if (!response.hasOwnProperty("Meta Data")) {
                  this.noData = true;
                  this.dataErrorMessage = "Sorry Server return empty message";
                  this.dataArrObj = [];
                  return;
              }
              this.noData = false;
              this.dataErrorMessage = "";
              this.information = response["Meta Data"];
              let tempObj = {};

              if (this.graphType === "DIGITAL_CURRENCY_DAILY") {
                tempObj = response["Time Series (Digital Currency Daily)"];   
              }
              else if (this.graphType === "DIGITAL_CURRENCY_WEEKLY") {
                tempObj = response["Time Series (Digital Currency Weekly)"];
              }
              else if (this.graphType === "DIGITAL_CURRENCY_MONTHLY") {
                tempObj =  response["Time Series (Digital Currency Monthly)"];
              }

              this.dataArrObj = Object.keys(tempObj).
                    map(key => ({"key": key, "value": Object.keys(tempObj[key]).
                    map(vkey => ({"key": vkey, "value": tempObj[key][vkey]}))}));

              text = "" + this.information["2. Digital Currency Code"] + " (" +
                  this.information["3. Digital Currency Name"] + ") - " +
                  this.information["4. Market Code"] + " (" +
                  this.information["5. Market Name"] + ")";

              this.loadChart(coin, market, text);
          }, function (err) {
              console.log(err);
          });
  }

  loadChart(coin, market, text) {
      var interval = "";

      this.buildDataPoints(market);

      if (this.graphType === "DIGITAL_CURRENCY_DAILY")
          interval = "day";
      else if (this.graphType === "DIGITAL_CURRENCY_WEEKLY")
          interval = "week";
      else if (this.graphType === "DIGITAL_CURRENCY_MONTHLY")
          interval = "month";

      var chart = new CanvasJS.Chart("chartContainer", {
          theme: "light1", // "light1", "light2", "dark1", "dark2"
          animationEnabled: true,
          maintainAspectRatio: false,
          title: {
              text: text
          },
          axisX: {
              interval: 1,
              intervalType: interval,
              valueFormatString: "DD-MM-YYYY"
          },
          axisY: {
              title: "Price (in " + market + ")",
              valueFormatString: "####"
          },
          data: [{
              type: "line",
              markerSize: 12,
              xValueFormatString: "DD-MM-YYYY",
              yValueFormatString: "###.#",
              dataPoints: this.dataPoints
          }]
      });

      // needed to solve problem with chart appearence 
      setTimeout(() => {
        //  chart.resize(); 
         chart.render();      
        }, 0);
  }

  buildDataPoints(market) {
      var days = 0;
      var index = 0;
      var date = new Date;
      var strFloat = "";
      var price = 0;
      var obj = {};
      var priceField = "";

      this.innerWidth = window.innerWidth;

      this.dataPoints.length = 0;

      if (this.graphType === "DIGITAL_CURRENCY_DAILY")
          days = 45;
      else if (this.graphType === "DIGITAL_CURRENCY_WEEKLY")
          days = 36;
      else if (this.graphType === "DIGITAL_CURRENCY_MONTHLY")
          days = 24;

      if (this.innerWidth < 600)
          days = Math.round(days / 3);
      else if (this.innerWidth < 769)
          days = Math.round(days / 2);

        for (let i=0; i<this.dataArrObj.length && i<days; i++) {
          if (market === "USD")
              priceField = "4b. close (USD)";
          else
              priceField = "4a. close (" + market + ")";

          date = new Date(this.dataArrObj[i]["key"]);
          for (let j=0; j<this.dataArrObj[i].value.length; j++) {
            if (this.dataArrObj[i]["value"][j].key === priceField) {
              strFloat = this.dataArrObj[i]["value"][j].value;
              break;
            }
          }
          price = parseFloat(parseFloat(strFloat).toFixed(2));

          obj = { "x": date, "y": price };

          this.dataPoints.push(obj);
      }

      for (var i = this.dataPoints.length - 1; i > 0; i--) {
          if (this.dataPoints[i]["y"] < this.dataPoints[i - 1]["y"]) {
              this.dataPoints[i - 1]["indexLabel"] = "gain";
              this.dataPoints[i - 1]["markerType"] = "triangle";
              this.dataPoints[i - 1]["markerColor"] = "#6B8E23";
          } else {
              this.dataPoints[i - 1]["indexLabel"] = "loss";
              this.dataPoints[i - 1]["markerType"] = "cross";
              this.dataPoints[i - 1]["markerColor"] = "tomato";
          }
      }
  }
}
