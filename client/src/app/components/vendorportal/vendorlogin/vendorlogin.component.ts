import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { vendorAuthService } from '../../../services/vendorauth.service';
import { Router } from '@angular/router';
import { AuthGuard } from '../../../guards/auth.guard';
import { VendorauthGuard } from '../../../guards/vendorauth.guard';
import { OrderService } from '../../../services/order.service';


@Component({
  selector: 'app-vendorlogin',
  templateUrl: './vendorlogin.component.html',
  styleUrls: ['./vendorlogin.component.css']
})

export class VendorloginComponent implements OnInit {
  messageClass;
  message;
  processing = false;
  form;
  previousUrl;
  vendorid:any;

  constructor(
    private formBuilder: FormBuilder,
    private vendorauthService: vendorAuthService,
    private router: Router,
    private authGuard: AuthGuard,
    private vendorauthGuard: VendorauthGuard,
    private orderservice:OrderService
  ) {
    this.createForm(); // Create Login Form when component is constructed
  }

  // Function to create login form
  createForm() {
    this.form = this.formBuilder.group({
      vendorname: ['', Validators.required], // Username field
      password: ['', Validators.required] // Password field
    });
  }

  // Function to disable form
  disableForm() {
    this.form.controls['vendorname'].disable(); // Disable username field
    this.form.controls['password'].disable(); // Disable password field
  }

  // Function to enable form
  enableForm() {
    this.form.controls['vendorname'].enable(); // Enable username field
    this.form.controls['password'].enable(); // Enable password field
  }

  // Functiont to submit form and login user
  onLoginSubmit() {
    this.processing = true; // Used to submit button while is being processed
    this.disableForm(); // Disable form while being process
    // Create user object from user's input
    this.vendorid=this.form.get('vendorname').value;
     this.orderservice.getvendorid(this.vendorid);
    //console.log(this.vendorid);
    const vendor = {
      vendorname: this.form.get('vendorname').value, // Username input field
      password: this.form.get('password').value // Password input field
    }

    // Function to send login data to API
    this.vendorauthService.vendorlogin(vendor).subscribe(data => {
      // Check if response was a success or error
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Set bootstrap error class
        this.message = data.message; // Set error message
        this.processing = false; // Enable submit button
        this.enableForm(); // Enable form for editting
      } else {
        this.messageClass = 'alert alert-success'; // Set bootstrap success class
        this.message = data.message; // Set success message
        // Function to store user's token in client local storage
        console.log('data.vendor',data.vendor.vendorname);
        localStorage.setItem('vendorid',data.vendor.vendorname._id);
        this.vendorauthService.storeVendorData(data.vendor);
        // After 2 seconds, redirect to dashboard page

          this.vendorauthService.vendorloginvalid().subscribe(() => {

          if (this.vendorauthService.isLoggedIn) {
            let redirect = this.vendorauthService.redirectUrl ? this.vendorauthService.redirectUrl : '/vendordashboard/allorders';
                console.log("apurva");
            this.router.navigate([redirect]);
          }
        });
        // setTimeout(() => {
        //   if(!this.message){
        //     this.router.navigate([this.previousUrl]);
        //   }else{
        //     this.router.navigate(['/vendordashboard']); // Navigate to dashboard view
        //   }
        // }, 1000);
      }
    });
  }

  ngOnInit() {
    if(this.vendorauthGuard.redirectUrl){
      this.messageClass="alert alert-danger",
      this.message="You must be logged in to view that page",
      this.previousUrl=this.vendorauthGuard.redirectUrl;
      this.vendorauthGuard.redirectUrl=undefined;
    }
  }

}
