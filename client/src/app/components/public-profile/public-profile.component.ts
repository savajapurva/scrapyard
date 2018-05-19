import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { vendorAuthService } from '../../services/vendorauth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile.component.html',
  styleUrls: ['./public-profile.component.css']
})
export class PublicProfileComponent implements OnInit {
  currentUrl;
  username;
  email;
  foundProfile = false;
  messageClass;
  message;
  vendorname;

  constructor(
    private authService: AuthService,
    private vendorauthService:vendorAuthService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.currentUrl = this.activatedRoute.snapshot.params; // Get URL parameters on page load
    // Service to get the public profile data
    this.authService.getPublicProfile(this.currentUrl.username).subscribe(data => {
      // Check if user was found in database
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Return bootstrap error class
        this.message = data.message; // Return error message
      } else {
        this.username = data.user.username; // Save the username for use in HTML
        this.email = data.user.email; // Save the email for use in HTML
      }
    });

    // Service to get the public and vendor profile data
    this.vendorauthService.getPublicProfile(this.currentUrl.vendorname).subscribe(data => {
      // Check if user was found in database
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Return bootstrap error class
        this.message = data.message; // Return error message
      } else {
        this.vendorname = data.vendor.vendorname; // Save the username for use in HTML
        this.email = data.vendor.email; // Save the email for use in HTML
      }
    });
  }

}
