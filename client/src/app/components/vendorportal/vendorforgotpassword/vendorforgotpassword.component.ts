import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { vendorAuthService } from '../../../services/vendorauth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendorforgotpassword',
  templateUrl: './vendorforgotpassword.component.html',
  styleUrls: ['./vendorforgotpassword.component.css']
})
export class VendorforgotpasswordComponent implements OnInit {

  form;
  message;
  messageClass;
  processing = false;
  forgotemailValid;
  forgotemailMessage;

  constructor(
    private formBuilder: FormBuilder,
    private vendorauthService: vendorAuthService,
    private router: Router
  ) {
    this.createForm(); // Create Angular 2 Form when component loads
  }

  // Function to create registration form
  createForm() {
    this.form = this.formBuilder.group({
      // femail Input
      forgotemail: ['', Validators.compose([
        Validators.required, // Field is required
        Validators.minLength(5), // Minimum length is 5 characters
        Validators.maxLength(30), // Maximum length is 30 characters
        this.validateforgotEmail // Custom validation
      ])]

    });
  }

  // Function to disable the registration form
  disableForm() {
    this.form.controls['email'].disable();
  }

  // Function to enable the registration form
  enableForm() {
    this.form.controls['email'].enable();
  }

  // Function to validate e-mail is proper format
  validateforgotEmail(controls) {
    // Create a regular expression
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    // Test email against regular expression
    if (regExp.test(controls.value)) {
      return null; // Return as valid email
    } else {
      return { 'validateforgotEmail': true } // Return as invalid email
    }
  }

  onvendorForgotSubmit(){
    this.processing = true; // Used to notify HTML that form is in processing, so that it can be disabled
    //this.disableForm(); // Disable the form
    // Create user object form user's inputs
    const forgotvendor = {
      forgotemail: this.form.get('forgotemail').value // E-mail input field
    }

    // Function to send login data to API
    this.vendorauthService.forgotvendorpassword(forgotvendor).subscribe(data => {
      // Check if response was a success or error
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Set bootstrap error class
        this.message = data.message; // Set error message
        this.processing = false; // Enable submit button
        this.enableForm(); // Enable form for editting
      } else {
      console.log(data);
        this.messageClass = 'alert alert-success'; // Set bootstrap success class
        this.message = data.message; // Set success message
        // Function to store user's token in client local storage
        this.vendorauthService.storeforgotVendorData(data);

        setTimeout(() => {
          this.router.navigate(['/login']); // Redirect to login view
        }, 2000);

      }
    });
  }


  // Function to check if e-mail is taken
  checkforgotvendorEmail() {
    // Function from authentication file to check if e-mail is taken
    this.vendorauthService.checkforgotvendorEmail(this.form.get('forgotemail').value).subscribe(data => {
      // Check if success true or false was returned from API
      if (!data.success) {
        this.forgotemailValid = false; // Return email as invalid
        this.forgotemailMessage = data.message; // Return error message
      } else {
        this.forgotemailValid = true; // Return email as valid
        this.forgotemailMessage = data.message; // Return success message
      }
    });
  }


  ngOnInit() {
  }

}
