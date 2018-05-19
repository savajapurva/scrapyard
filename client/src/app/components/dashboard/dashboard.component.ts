import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';

import * as moment from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
alluserorders: any[];
  constructor(private orderservice:OrderService,private authservice:AuthService) { }


  ngOnInit() {
    this.getuserorder();
  }

  getuserorder(){
    var userid=this.authservice.user.data._id;
    this.orderservice.getuserorder('orderdata/userorder/'+userid)
    .then(res => {
    this.alluserorders=res['order'];
      console.log('userorder',res);
      for(let i=0;i<this.alluserorders.length;i++){
        this.alluserorders[i].date = moment(this.alluserorders[i].date).format('MMMM Do YYYY, h:mm:ss a');
      }
    }).catch(err => {
      console.log('userorder err',err);
    });
  }

}
