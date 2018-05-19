import { Component, OnInit } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {

  form;
  message;
  messageClass;
  processing = false;
  femailValid;
  femailMessage;
  fusernameValid;
  fusernameMessage;
  fuser;

  latitude = 23.039327;
  longitude = 72.663665;

  onChoseLocation(event){
    this.latitude = event.coords.lat;
    this.longitude = event.coords.lng;
  }

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.createForm(); // Create Angular 2 Form when component loads
  }

  // Function to create registration form
  createForm() {
    this.form = this.formBuilder.group({
      // femail Input
      femail: ['', Validators.compose([
        Validators.required, // Field is required
        Validators.minLength(5), // Minimum length is 5 characters
        Validators.maxLength(30), // Maximum length is 30 characters
        this.validatefemail // Custom validation
      ])],
      // ffusername Input
      fusername: ['', Validators.compose([
        Validators.required, // Field is required
        Validators.minLength(3), // Minimum length is 3 characters
        Validators.maxLength(15), // Maximum length is 15 characters
        this.validatefusername // Custom validation
      ])],

      ftext:['', Validators.required]
    });
}

  // Function to disable the registration form
  disableForm() {
    this.form.controls['femail'].disable();
    this.form.controls['fusername'].disable();
    this.form.controls['ftext'].disable();
  }

  //Function to enable the registration form
  enableForm() {
    this.form.controls['femail'].enable();
    this.form.controls['fusername'].enable();
    this.form.controls['ftext'].enable();
  }

  // Function to validate e-mail is proper format
  validatefemail(controls) {
    // Create a regular expression
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    // Test femail against regular expression
    if (regExp.test(controls.value)) {
      return null; // Return as valid femail
    } else {
      return { 'validatefemail': true } // Return as invalid femail
    }
  }

  // Function to validate fusername is proper format
  validatefusername(controls) {
    // Create a regular expression
    const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
    // Test fusername against regular expression
    if (regExp.test(controls.value)) {
      return null; // Return as valid fusername
    } else {
      return { 'validatefusername': true } // Return as invalid fusername
    }
  }

  // Function to submit form
  onfillupSubmit() {
    this.processing = true; // Used to notify HTML that form is in processing, so that it can be disabled
    this.disableForm(); // Disable the form
    // Create user object form user's inputs
    const fuser = {
      femail: this.form.get('femail').value, // E-mail input field
      fusername: this.form.get('fusername').value, // fusername input field
      ftext: this.form.get('ftext').value,
    }

    // Function from authentication service to register user
    this.authService.onfillupSubmit(fuser).subscribe(data => {
      // Resposne from registration attempt
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Set an error class
        this.message = data.message; // Set an error message
        this.processing = false; // Re-enable submit button
        this.enableForm(); // Re-enable form
      } else {
        this.messageClass = 'alert alert-success'; // Set a success class
        this.message = data.message; // Set a success message
      }
    });
}

  ngOnInit() {
  }

}
