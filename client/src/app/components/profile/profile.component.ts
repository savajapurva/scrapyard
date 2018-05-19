import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { vendorAuthService } from '../../services/vendorauth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  username = '';
  email = '';
  vendorname = '';

  constructor(
    private authService: AuthService,
    private vendorauthService:vendorAuthService
  ) { }

  ngOnInit() {
    // Once component loads, get user's data to display on profile
    // this.authService.getProfile().subscribe(profile => {
    //   this.username = profile.user.username; // Set username
    //   this.email = profile.user.email; // Set e-mail
    // });
    //
    // // Once component loads, get vendor's data to display on profile
    // this.vendorauthService.getProfile().subscribe(profile => {
    //   this.vendorname = profile.vendor.vendorname; // Set username
    //   this.email = profile.vendor.email; // Set e-mail
    // });

    let profileData = JSON.parse(localStorage.getItem('user'));
    console.log('profiledata',profileData);
    this.username = profileData['data'].username;
    this.email = profileData['data'].email;
  }

}
