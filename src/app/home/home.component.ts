import { Component, OnInit } from '@angular/core';
import { DataService } from '../Services/Data/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  quantity:number = 3;
  NDXinfo = [];
  public innerWidth: any;

  constructor(private _dataService: DataService) { }
  
  ngOnInit() {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth > 1200)
          this.quantity = 6;

    @HostListener('window:resize', ['$event']);
    this.getNDXinfo();
  }

  onResize(event) {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth > 1200)
      this.quantity = 6;
    else
    this.quantity = 3;
    this.getNDXinfo();
  }

  getNDXinfo()
    {
      this.NDXinfo.length = 0;
      this._dataService.getNDX().subscribe((data) => {
        let i:number=0;
        if (data.hasOwnProperty("Time Series (Daily)")) {
          let obj : any = data["Time Series (Daily)"];
          //this.NDXinfo.push(obj); //Object.keys(obj).push({key, obj[key]});
          for (let k of Object.keys(obj)) {
            let value = obj[k];
            this.NDXinfo.push({k, value});
            // console.log(obj[k]);
            i++;
            if (i===this.quantity)
              break;
          }
      });
      
                     
        // }, function(err){
        //     console.log(egetNDXinforr)
        // })
    }
}
