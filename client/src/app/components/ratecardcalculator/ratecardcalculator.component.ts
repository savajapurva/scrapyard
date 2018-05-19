import { Component, OnInit } from '@angular/core';

import { vendorAuthService } from '../../services/vendorauth.service';

@Component({
  selector: 'app-ratecardcalculator',
  templateUrl: './ratecardcalculator.component.html',
  styleUrls: ['./ratecardcalculator.component.css']
})
export class RatecardcalculatorComponent implements OnInit {
datas:any;
singledata:any;
// images:any
// allprice:any
// alltitle:any
total:any=0;
com:any=0;
quantity:number
invoice = {
    items: []
};

  constructor(private vendorAuthService: vendorAuthService) { }

  ngOnInit() {
    this.vendorAuthService.getRateCardData()
    .subscribe(res => {
      this.datas=res[0];
      this.singledata=this.datas.data;
      console.log('getRateCardData res',res);
      console.log(this.singledata);
    },err => {
      console.log('getRateCardData err',err);
    });
  }

  onSearchChange(value,price,name){

    var hello={
      "name":name,
      "qty":value,
      "price":price
    }
    for(var i=0;i<this.invoice.items.length;i++){
      if(this.invoice.items[i].name===name){
      console.log("array name"+this.invoice.items[i].name)
        this.invoice.items.splice(i,1);
      }
    }
     this.invoice.items.push(hello);
     this.total=0;
     for(var i=0;i<this.invoice.items.length;i++){
        this.total=this.total+this.invoice.items[i].qty*this.invoice.items[i].price;
     }
     }
  }
