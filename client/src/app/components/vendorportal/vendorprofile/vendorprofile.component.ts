import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { vendorAuthService } from '../../../services/vendorauth.service';

@Component({
  selector: 'app-vendorprofile',
  templateUrl: './vendorprofile.component.html',
  styleUrls: ['./vendorprofile.component.css']
})
export class VendorprofileComponent implements OnInit {

  username = '';
  email = '';
  vendorname = '';

  constructor(
    private authService: AuthService,
    private vendorauthService:vendorAuthService
  ) { }

  ngOnInit() {

    let profileData = JSON.parse(localStorage.getItem('user'));
    console.log('profiledata',profileData);
    this.vendorname = profileData['vendorname'].vendorname;
    this.email = profileData['vendorname'].email;

  }

}
