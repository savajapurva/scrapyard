import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import {Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
//import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {

  domain = "http://localhost:8080/"; // Development Domain - Not Needed in Production
  //domain="";

  authToken;
  user;
  forgotuser;
  options;
  fuser;

  constructor(
    private http: Http,
    private router:Router
  ) { }

  isLoggedIn = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  //login function
  loginvalid(): Observable<boolean>
  {
    return Observable.of(true).delay(50).do(val => this.isLoggedIn = true);
  }

  logoutvalid(): void
  {
    this.isLoggedIn = false;
    localStorage.clear(); // Clear local storage
    this.user = null; // Set user to null
  }

  // Function to create headers, add token, to be used in HTTP requests
  createAuthenticationHeaders() {
    //this.loadToken(); // Get token so it can be attached to headers
    // Headers configuration options
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json', // Format set to JSON
        //'authorization': this.authToken // Attach token
      })
    });
  }

  // Function to get token from client local storage
  loadToken() {
    this.authToken = localStorage.getItem('token'); // Get token and asssign to variable to be used elsewhere
  }

  // Function to register user accounts
  registerUser(user) {
    return this.http.post(this.domain + 'authentication/register', user).map(res => res.json());
  }

  onfillupSubmit(fuser) {
    return this.http.post(this.domain + 'authentication/contactus', fuser).map(res => res.json());
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
  checkUsername(username) {
    return this.http.get(this.domain + 'authentication/checkUsername/' + username).map(res => res.json());
  }

  // Function to check if e-mail is taken
  checkEmail(email) {
    return this.http.get(this.domain + 'authentication/checkEmail/' + email).map(res => res.json());
  }

  // Function to check if e-mail is taken
  checkforgotEmail(forgotemail) {
    return this.http.get(this.domain + 'authentication/checkforgotEmail/' + forgotemail).map(res => res.json());
  }

  // Function to login user
  login(user) {
    return this.http.post(this.domain + 'authentication/login', user).map(res => res.json());
  }

  forgotpassword(forgotuser){
    return this.http.post(this.domain + 'authentication/forgotpassword', forgotuser).map(res => res.json());
  }


  // Function to logout
  logout() {
    this.authToken = null; // Set token to null
    this.user = null; // Set user to null
    localStorage.clear(); // Clear local storage

  }

  // Function to store user's data in client local storage
  storeUserData(user) {
    //localStorage.setItem('token', token); // Set token in local storage
    localStorage.setItem('user', JSON.stringify(user)); // Set user in local storage as string
    //this.authToken = token; // Assign token to be used elsewhere
    this.user = user; // Set user to be used elsewhere
  }

  // Function to store user's data in client local storage
  storeforgotUserData(forgotuser) {
    //localStorage.setItem('token', token); // Set token in local storage
    localStorage.setItem('forgotuser', JSON.stringify(forgotuser)); // Set user in local storage as string
    //this.authToken = token; // Assign token to be used elsewhere
    this.forgotuser = forgotuser; // Set user to be used elsewhere
  }


  // Function to get user's profile data
  getProfile() {
    this.createAuthenticationHeaders(); // Create headers before sending to API
    return this.http.get(this.domain + 'authentication/profile', this.options).map(res => res.json());
  }

  // Function to get public profile data
  getPublicProfile(username) {
    this.createAuthenticationHeaders(); // Create headers before sending to API
    return this.http.get(this.domain + 'authentication/publicProfile/' + username, this.options).map(res => res.json());
  }

  // Function to check if user is logged in
  // loggedIn() {
  //   return tokenNotExpired();
  // }

}
