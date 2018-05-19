import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { vendorAuthService } from '../../../services/vendorauth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendorregister',
  templateUrl: './vendorregister.component.html',
  styleUrls: ['./vendorregister.component.css']
})

export class VendorregisterComponent implements OnInit {

  form;
  message;
  messageClass;
  processing = false;
  emailValid;
  emailMessage;
  vendornameValid;
  vendornameMessage;

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
      // Email Input
      email: ['', Validators.compose([
        Validators.required, // Field is required
        Validators.minLength(5), // Minimum length is 5 characters
        Validators.maxLength(30), // Maximum length is 30 characters
        this.validateEmail // Custom validation
      ])],
      // vendorname Input
      vendorname: ['', Validators.compose([
        Validators.required, // Field is required
        Validators.minLength(3), // Minimum length is 3 characters
        Validators.maxLength(15), // Maximum length is 15 characters
        this.validateVendorname // Custom validation
      ])],

      // Address Input
      street: ['', Validators.compose([
        Validators.required, // Field is required
        Validators.minLength(8), // Minimum length is 8 characters
        Validators.maxLength(50), // Maximum length is 35 characters
        this.validateStreet // Custom validation
      ])],

      city: ['', Validators.compose([
        Validators.required, // Field is required
        Validators.minLength(3), // Minimum length is 8 characters
        Validators.maxLength(15), // Maximum length is 35 characters
        this.validateCity // Custom validation
      ])],

      state: ['', Validators.compose([
        Validators.required, // Field is required
        Validators.minLength(3), // Minimum length is 8 characters
        Validators.maxLength(15), // Maximum length is 35 characters
        this.validateState // Custom validation
      ])],

      pincode: ['', Validators.compose([
        Validators.required, // Field is required
        Validators.minLength(4), // Minimum length is 8 characters
        Validators.maxLength(8), // Maximum length is 35 characters
        this.validatePincode // Custom validation
      ])],

      //Mobile Input
      mobile: ['', Validators.compose([
        Validators.required, // Field is required
        Validators.minLength(3), // Minimum length is 8 characters
        Validators.maxLength(10), // Maximum length is 35 characters
        this.validateMobile // Custom validation
      ])],

      // Password Input
      password: ['', Validators.compose([
        Validators.required, // Field is required
        Validators.minLength(8), // Minimum length is 8 characters
        Validators.maxLength(35), // Maximum length is 35 characters
        this.validatePassword // Custom validation
      ])],
      // Confirm Password Input
      confirm: ['', Validators.required] // Field is required
    }, { validator: this.matchingPasswords('password', 'confirm') }); // Add custom validator to form for matching passwords
  }

  // Function to disable the registration form
  disableForm() {
    this.form.controls['email'].disable();
    this.form.controls['vendorname'].disable();
    this.form.controls['street'].disable();
    this.form.controls['city'].disable();
    this.form.controls['state'].disable();
    this.form.controls['pincode'].disable();
    this.form.controls['mobile'].disable();
    this.form.controls['password'].disable();
    this.form.controls['confirm'].disable();
  }

  // Function to enable the registration form
  enableForm() {
    this.form.controls['email'].enable();
    this.form.controls['vendorname'].enable();
    this.form.controls['street'].enable();
    this.form.controls['city'].enable();
    this.form.controls['state'].enable();
    this.form.controls['pincode'].enable();
    this.form.controls['mobile'].enable();
    this.form.controls['password'].enable();
    this.form.controls['confirm'].enable();
  }

  // Function to validate e-mail is proper format
  validateEmail(controls) {
    // Create a regular expression
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    // Test email against regular expression
    if (regExp.test(controls.value)) {
      return null; // Return as valid email
    } else {
      return { 'validateEmail': true } // Return as invalid email
    }
  }

  // Function to validate vendorname is proper format
  validateVendorname(controls) {
    // Create a regular expression
    const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
    // Test vendorname against regular expression
    if (regExp.test(controls.value)) {
      return null; // Return as valid vendorname
    } else {
      return { 'validateVendorname': true } // Return as invalid vendorname
    }
  }

  // Function to validate street
  validateStreet(controls) {
    // Create a regular expression
    const regExp = new RegExp(/^[a-zA-Z0-9\s,'-]*$/);
    // Test password against regular expression
    if (regExp.test(controls.value)) {
      return null; // Return as valid password
    } else {
      return { 'validateStreet': true } // Return as invalid password
    }
  }

  // Function to validate City
  validateCity(controls) {
    // Create a regular expression
    const regExp = new RegExp(/^[A-Za-z . ,'-]+$/);
    // Test password against regular expression
    if (regExp.test(controls.value)) {
      return null; // Return as valid password
    } else {
      return { 'validateCity': true } // Return as invalid password
    }
  }

  // Function to validate State
  validateState(controls) {
    // Create a regular expression
    const regExp = new RegExp(/^[A-Za-z . ,'-]+$/);
    // Test password against regular expression
    if (regExp.test(controls.value)) {
      return null; // Return as valid password
    } else {
      return { 'validateState': true } // Return as invalid password
    }
  }

  // Function to validate Pincode
  validatePincode(controls) {
    // Create a regular expression
    const regExp = new RegExp(/^[1-9][0-9]{5}$/);
    // Test password against regular expression
    if (regExp.test(controls.value)) {
      return null; // Return as valid password
    } else {
      return { 'validatePincode': true } // Return as invalid password
    }
  }

  // Function to validate Mobile
  validateMobile(controls) {
    // Create a regular expression
    const regExp = new RegExp(/^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$/);
    // Test password against regular expression
    if (regExp.test(controls.value)) {
      return null; // Return as valid password
    } else {
      return { 'validateMobile': true } // Return as invalid password
    }
  }

  // Function to validate password
  validatePassword(controls) {
    // Create a regular expression
    const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);
    // Test password against regular expression
    if (regExp.test(controls.value)) {
      return null; // Return as valid password
    } else {
      return { 'validatePassword': true } // Return as invalid password
    }
  }

  // Funciton to ensure passwords match
  matchingPasswords(password, confirm) {
    return (group: FormGroup) => {
      // Check if both fields are the same
      if (group.controls[password].value === group.controls[confirm].value) {
        return null; // Return as a match
      } else {
        return { 'matchingPasswords': true } // Return as error: do not match
      }
    }
  }

  // Function to submit form
  onRegisterSubmit() {
    this.processing = true; // Used to notify HTML that form is in processing, so that it can be disabled
    this.disableForm(); // Disable the form
    // Create vendor object form vendor's inputs
    const vendor = {
      email: this.form.get('email').value, // E-mail input field
      vendorname: this.form.get('vendorname').value, // vendorname input field
      password: this.form.get('password').value, // Password input field
      street: this.form.get('street').value, // Password input field
      city: this.form.get('city').value, // Password input field
      state: this.form.get('state').value, // Password input field
      pincode: this.form.get('pincode').value,
      mobile: this.form.get('mobile').value // Password input field
    }

    // Function from authentication service to register vendor
    this.vendorauthService.registerVendor(vendor).subscribe(data => {
      // Resposne from registration attempt
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Set an error class
        this.message = data.message; // Set an error message
        this.processing = false; // Re-enable submit button
        this.enableForm(); // Re-enable form
      } else {
        this.messageClass = 'alert alert-success'; // Set a success class
        this.message = data.message; // Set a success message
        // After 2 second timeout, navigate to the login page
        setTimeout(() => {
          this.router.navigate(['/vendorlogin']); // Redirect to login view
        }, 2000);
      }
    });

  }

  // Function to check if e-mail is taken
  checkVendorEmail() {
    // Function from authentication file to check if e-mail is taken
    this.vendorauthService.checkVendorEmail(this.form.get('email').value).subscribe(data => {
      // Check if success true or false was returned from API
      if (!data.success) {
        this.emailValid = false; // Return email as invalid
        this.emailMessage = data.message; // Return error message
      } else {
        this.emailValid = true; // Return email as valid
        this.emailMessage = data.message; // Return success message
      }
    });
  }

  // Function to check if vendorname is available
  checkVendorName() {
    // Function from authentication file to check if vendorname is taken
    this.vendorauthService.checkVendorName(this.form.get('vendorname').value).subscribe(data => {
      // Check if success true or success false was returned from API
      if (!data.success) {
        this.vendornameValid = false; // Return vendorname as invalid
        this.vendornameMessage = data.message; // Return error message
      } else {
        this.vendornameValid = true; // Return vendorname as valid
        this.vendornameMessage = data.message; // Return success message
      }
    });
  }

  ngOnInit() {
  }

}
