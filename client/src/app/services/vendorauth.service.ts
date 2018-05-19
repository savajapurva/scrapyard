import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';
import {Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

@Injectable()
export class vendorAuthService {

  domain = "http://localhost:8080/"; // Development Domain - Not Needed in Production
  //domain="";
  vendorauthToken;
  vendor;
  forgotvendor;
  options;
  isLoggedIn = false;
  redirectUrl: string;

  constructor(
    private http: Http,
    private router:Router
  ) { }


  // store the URL so we can redirect after logging in


  vendorloginvalid(): Observable<boolean> {
    console.log("chetan")
    return Observable.of(true).delay(50).do(val => this.isLoggedIn = true);
  }
  vendorlogoutvalid(): void {
  this.isLoggedIn = false;
  }
  // Function to create headers, add token, to be used in HTTP requests
  createAuthenticationHeaders() {
    //this.loadToken(); // Get token so it can be attached to headers
    // Headers configuration options
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json', // Format set to JSON
        //'authorization': this.vendorauthToken // Attach token
      })
    });
  }

  // Function to get token from client local storage
  loadToken() {
    this.vendorauthToken = localStorage.getItem('token'); // Get token and asssign to variable to be used elsewhere
  }

  // Function to register user accounts
  registerVendor(vendor) {
    return this.http.post(this.domain + 'vendorauthentication/vendoregister', vendor).map(res => res.json());
  }

  // orderReq(orderData){
  //   console.log('orderReq',orderData);
  //   return this.http.post(this.domain + 'orderdata/ordereq', orderData)
  //   .map(res => {
  //     console.log('orderReq res',res);
  //     res.json();
  //   },err => {
  //     console.log('orderReq err',err);
  //   });
  // }

  // Function to check if username is taken
  checkVendorName(vendorname) {
    return this.http.get(this.domain + 'vendorauthentication/checkVendorname/' + vendorname).map(res => res.json());
  }

  // Function to check if e-mail is taken
  checkVendorEmail(email) {
    return this.http.get(this.domain + 'vendorauthentication/checkvendorEmail/' + email).map(res => res.json());
  }

  // Function to check if e-mail is taken
  checkforgotvendorEmail(forgotemail) {
    return this.http.get(this.domain + 'vendorauthentication/checkforgotvendorEmail/' + forgotemail).map(res => res.json());
  }

  // Function to login user
  vendorlogin(vendor) {
    return this.http.post(this.domain + 'vendorauthentication/vendorlogin', vendor).map(res => res.json());
  }

  forgotvendorpassword(forgotvendor){
    return this.http.post(this.domain + 'vendorauthentication/forgotvendorpassword', forgotvendor).map(res => res.json());
  }

  // Function to logout
  logout() {
    this.vendorauthToken = null; // Set token to null
    this.vendor = null; // Set user to null
    localStorage.clear(); // Clear local storage
  }

  // Function to store user's data in client local storage
  storeVendorData(vendor) {
    //localStorage.setItem('token', token); // Set token in local storage
    localStorage.setItem('user', JSON.stringify(vendor)); // Set vendor in local storage as string
    //this.vendorauthToken = token; // Assign token to be used elsewhere
    this.vendor = vendor; // Set vendor to be used elsewhere
  }

  // Function to store user's data in client local storage
  storeforgotVendorData(forgotvendor) {
    //localStorage.setItem('token', token); // Set token in local storage
    localStorage.setItem('forgotvendor', JSON.stringify(forgotvendor)); // Set user in local storage as string
    //this.authToken = token; // Assign token to be used elsewhere
    this.forgotvendor = forgotvendor; // Set user to be used elsewhere
  }

  // Function to get vendor's profile data
  getProfile() {
    this.createAuthenticationHeaders(); // Create headers before sending to API
    return this.http.get(this.domain + 'vendorauthentication/profile', this.options).map(res => res.json());
  }

  // Function to get public profile data
    getPublicProfile(vendorname) {
    this.createAuthenticationHeaders(); // Create headers before sending to API
    return this.http.get(this.domain + 'vendorauthentication/publicProfile/' + vendorname, this.options).map(res => res.json());
  }

  uploadImage(formData){
    return this.http.post(this.domain + 'vendorauthentication/uploadImage', formData).map(res => res.json());
  }

  loadRateCardData(data){
    return this.http.post(this.domain + 'vendorauthentication/rateCardData', data).map(res => res.json());
  }

  getRateCardData(){
    return this.http.get(this.domain + 'vendorauthentication/getRateCardData').map(res => res.json());
  }
}
