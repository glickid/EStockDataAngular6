import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as CanvasJS from '../../../canvasjs-2.2/canvasjs.min.js';

import { UserService } from '../../Services/User/user.service';
import { User } from '../../Services/User/user';
import { DataService } from '../../Services/Data/data.service'

@Component({
  selector: 'app-stock-charts',
  templateUrl: './stock-charts.component.html',
  styleUrls: ['./stock-charts.component.css']
})
export class StockChartsComponent implements OnInit {

  symbol: string = "";
  period: string = "";
  currentUser: User;
  stockList: any = [];

  constructor(private _activeRoute: ActivatedRoute,
    private _router: Router,
    private _userSrv: UserService,
    private _dataSrv: DataService) {
    this.currentUser = this._userSrv.getActiveUser();
  }

  ngOnInit() {
    this._activeRoute.params.subscribe(params => {
      this.symbol = params['symbol'];
      this.period = params['period'];

      // console.log(this.symbol, this.period);
      if (this.currentUser === null) {
        this._router.navigate(['./home']);
      } else {
        this.loadChart();
      }
    });
  }

  openStockChart(symbol, period) {
    // $location.path("/charts/"+ symbol + "/" + period );
    this._router.navigate(['./charts/' + symbol +  '/' + period ]);
  }

  goBack() {
    window.history.back()
  }

  loadChart() {

    let dataPoints: any = [];

    var chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      theme: "light1", // "light1", "light2", "dark1", "dark2"
      exportEnabled: true,
      title: {
        text: this.symbol
      },
      subtitles: [{
        text: "Daily"
      }],
      axisX: {
        interval: 1,
        valueFormatString: "D-MM-YYYY"
      },
      axisY: {
        includeZero: false,
        prefix: "$",
        title: "Price"
      },
      toolTip: {
        content: "Date: {x}<br /><strong>Price:</strong><br />Open: {y[0]}, Close: {y[3]}<br />High: {y[1]}, Low: {y[2]}"
      },
      data: [{
        type: "candlestick",
        yValueFormatString: "$####.##",
        dataPoints: dataPoints
      }]
    });

    setChartInfoForStockPeriod(this.symbol, this.period, this._dataSrv);

    function setChartInfoForStockPeriod(stockSymbol, period, dataSrv) {
      dataSrv.getStockChartInfo(stockSymbol, period).then(function (response) {
        // console.log(JSON.stringify(response.data[response.data.length-1]));
        for (var i = 0; i < response.length; i++) {

          dataPoints.push({
            x: new Date(
              response[i]["date"]
            ),
            y: [
              parseFloat(response[i]["open"]),
              parseFloat(response[i]["high"]),
              parseFloat(response[i]["low"]),
              parseFloat(response[i]["close"])
            ]
          });
        }

        chart.render();

      }, function (err) {
        console.log(err);
      });
    }
  }

  searchStock(searchStr) {
    let stockListObj: any = {};
    this.stockList.length = 0;

    if (searchStr.length > 1) {
      // this._dataSrv.searchStock(searchStr).then(function (response) {
        this.stockList = this._dataSrv.searchStock(searchStr);
        
      // }, function (err) {
      //   console.log(err);
      //   this.stockList.length = 0;
      // })
    }
    // else {
    //   this.stockList.length = 0;
    // }
  }

  showChartOfStock(name, symbol) {
    // $location.path("/charts/" + symbol + "/1m");
    this.stockList.length = 0;
    this._router.navigate(['./charts/' + symbol + '/' + '1m' ]);
  }
}
