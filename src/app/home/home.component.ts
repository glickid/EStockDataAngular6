import { Component, OnInit } from '@angular/core';
import { DataService } from '../Services/Data/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  quantity: number = 3;
  NDXinfo = [];
  gainersList = [];
  loosersList = [];
  mostActiveList = [];
  public innerWidth: any;

  constructor(private _dataService: DataService) { }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth > 1200)
      this.quantity = 6;

    @HostListener('window:resize', ['$event']);
    this.getNDXinfo();
    this.getGainers();
    this.getLosers();
    this.getMostActive();
  }

  onResize(event) {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth > 1200)
      this.quantity = 6;
    else
      this.quantity = 3;

    this.getNDXinfo();
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
      // for (var i = 0; i < data.length; i++) {
        // this.gainersList = data; //.slice(0);;
      // }
      let sortedArray : any = [];
      this.gainersList.length = 0;
      // for (let k of Object.keys(data)) {
      //   let value = data[k];
      //   unsortedArray.push(value);
      // }

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
    }, function (err) {
      console.log(err);
    })
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
    }, function (err) {
      console.log(err);
    })
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
    }, function (err) {
      console.log(err);
    })
  }
}
