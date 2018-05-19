import { Component, OnInit } from '@angular/core';

import { vendorAuthService } from '../../services/vendorauth.service';

@Component({
  selector: 'app-ratecard',
  templateUrl: './ratecard.component.html',
  styleUrls: ['./ratecard.component.css']
})
export class RatecardComponent implements OnInit {
  datas:any;
  singledata:any;
images:any
allprice:any
alltitle:any
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

}
