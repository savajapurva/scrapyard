import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { vendorAuthService } from '../../services/vendorauth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public vendorauthService: vendorAuthService,
    private router: Router,
    private flashMessagesService: FlashMessagesService
  ) { }

  // Function to logout user
  onLogoutClick() {
    localStorage.clear();
    this.authService.logoutvalid();
    this.vendorauthService.vendorlogoutvalid(); // Logout user
    this.flashMessagesService.show('You are logged out', { cssClass: 'alert-info' }); // Set custom flash message
    this.router.navigate(['/home']); // Navigate back to home page
  }

  ngOnInit() {
  }

}
