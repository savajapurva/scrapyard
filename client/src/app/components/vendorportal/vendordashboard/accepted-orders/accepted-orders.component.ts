import { Component, OnInit } from '@angular/core';

import { OrderService } from '../../../../services/order.service';

@Component({
  selector: 'app-accepted-orders',
  templateUrl: './accepted-orders.component.html',
  styleUrls: ['./accepted-orders.component.css']
})
export class AcceptedOrdersComponent implements OnInit {
  allacceptorder:any;
  settings = {
      delete: {
        confirmDelete: true,
      },

      columns: {
        username: {
          title: 'USERNAME',
        },
        email: {
          title: 'EMAIL',
        },
        work: {
          title: 'WEIGHT',
        },
        address: {
          title: 'ADDRESS',
        },
        date: {
          title: 'DATE',
        },

      },
    };
  constructor(private orderservice:OrderService) { }

  ngOnInit() {
     	this.getAllAcceptOrderData();
  }

       getAllAcceptOrderData(){
        let vendorid = localStorage.getItem('vendorid');
        console.log('vendorid',vendorid);
       	this.orderservice.getacceptdata('orderdata/allacceptorder/'+vendorid)
       	.then(res => {
       		this.allacceptorder=res['order'];
       		console.log('allacceptorder',res);
       	}).catch(err => {
       		console.log('all order err',err);
       	});
       }
}
