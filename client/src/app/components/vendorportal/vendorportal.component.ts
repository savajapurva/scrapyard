import { Component, OnInit } from '@angular/core';
import { vendorAuthService } from '../../services/vendorauth.service';

@Component({
  selector: 'app-vendorportal',
  templateUrl: './vendorportal.component.html',
  styleUrls: ['./vendorportal.component.css']
})
export class VendorportalComponent implements OnInit {

  isLogin:any;

  constructor(
    public vendorauthService : vendorAuthService
  ) { }

  ngOnInit() {

    console.log('islogin',JSON.parse(localStorage.getItem('user')));

    this.isLogin = JSON.parse(localStorage.getItem('user'));

  }

}
