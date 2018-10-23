import { Component, OnInit } from '@angular/core';
// import { Alert } from '../../Services/Alerts/Alert'
import { Observable } from 'rxjs';
import { FormGroup, FormControl} from '@angular/forms';
import {Router} from "@angular/router";

import { UserService } from '../../Services/User/user.service';
import { User } from '../../Services/User/user';
import { DataService } from '../../Services/Data/data.service'

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})


export class PortfolioComponent implements OnInit {

  // searchStockForm : FormGroup;
  currentUser : User;
  input : string = "";
  stockList: any[] = [];

  constructor(private _userSrv: UserService,
              private _dataSrv: DataService,
              private _route: Router) { 
    this.currentUser = _userSrv.getActiveUser();
  }

  ngOnInit() {
    // this.searchStockForm = new FormGroup({
    //   email: new FormControl(),
    //   password : new FormControl()
    // });
  }

  searchStock (searchStr) {
    if (searchStr.length > 1) {
        this.stockList = this._dataSrv.searchStock(searchStr);
        // .then(function (response) {
        //     this.stockList = response;
        // }, function (err) {
        //     console.log(err);
        //     this.stockList.length = 0;
        // })
    }
    else {
      this.stockList.length = 0;
    }
  }

  addStockToPortfolio(stock) {
    console.log(stock.symbol);
  }
}
