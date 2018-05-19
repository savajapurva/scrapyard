import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-vendordashboard',
  templateUrl: './vendordashboard.component.html',
  styleUrls: ['./vendordashboard.component.css']
})

export class VendordashboardComponent implements OnInit {



 constructor(public orderService:OrderService) { }
  ngOnInit() {}

}
