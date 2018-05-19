import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { vendorAuthService } from '../../services/vendorauth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLogin:any;

  constructor(
    private authService: AuthService,
    private venderauthservice:vendorAuthService
  ) {}

  ngOnInit() {
    console.log('islogin',JSON.parse(localStorage.getItem('user')));

    this.isLogin = JSON.parse(localStorage.getItem('user'));
    
  }

}
