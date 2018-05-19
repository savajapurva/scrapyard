import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../../services/order.service';

import * as moment from 'moment';

@Component({
  selector: 'app-all-orders-details',
  templateUrl: './all-orders-details.component.html',
  styleUrls: ['./all-orders-details.component.css']
})
export class AllOrdersDetailsComponent implements OnInit {


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

    allorder:any;

    constructor(public orderService:OrderService) { }

    //Events of Data Table
   accepteddetail:any;
    onDeleteConfirm(event) {

       if (window.confirm('Are you sure you want to accept?')) {
       var vendorname=this.orderService.vendorid;
       console.log(event.data);
       var orderdata=event.data;
         this.accepteddetail={
           "id":orderdata._id,
           "vendorname": localStorage.getItem('vendorid'),
           "username":orderdata.username,
           "email":orderdata.email,
           "work":orderdata.work,
           "address":orderdata.address,
           "date":orderdata.date

         }
         console.log(this.accepteddetail);
         this.orderService.insertacceptorder(this.accepteddetail,'orderdata/acceptinsert')
         .then(res => {
            console.log('insert order res',res);
            if(res['success'] == true){
              this.orderService.deleteReq(event.data,'orderdata/deleteorder').then(res => {
                console.log('delete order res',res);
              })
            }
         }).catch(err => {
            alert('Error will accept order!');
         });
         event.confirm.resolve();
       } else {
         event.confirm.reject();
       }
     }

     onSaveConfirm(event) {
       if (window.confirm('Are you sure you want to save?')) {
         event.newData['name'] += ' + added in code';
         event.confirm.resolve(event.newData);
       } else {
         event.confirm.reject();
       }
     }

     onCreateConfirm(event) {
       if (window.confirm('Are you sure you want to create?')) {
         event.newData['name'] += ' + added in code';
         event.confirm.resolve(event.newData);
       } else {
         event.confirm.reject();
       }
     }
   // datatable events completed

     ngOnInit() {
     	this.getAllOrderData();
     }

     getAllOrderData(){
     	this.orderService.getReq('orderdata/allOrder')
     	.then(res => {
     		this.allorder=res;
     		console.log('all orders',res);
        for(let i=0;i<this.allorder.length;i++){
          this.allorder[i].date = moment(this.allorder[i].date).format('MMMM Do YYYY, h:mm:ss a');
        }
     	}).catch(err => {
     		console.log('all order err',err);
     	});
     }



   }
