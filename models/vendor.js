/* ===================
   Import Node Modules
=================== */
const mongoose = require('mongoose'); // Node Tool for MongoDB
mongoose.Promise = global.Promise; // Configure Mongoose Promises
const Schema = mongoose.Schema; // Import Schema from Mongoose
const bcrypt = require('bcrypt-nodejs'); // A native JS bcrypt library for NodeJS

// Validate Function to check e-mail length
let emailLengthChecker = (email) => {
  // Check if e-mail exists
  if (!email) {
    return false; // Return error
  } else {
    // Check the length of e-mail string
    if (email.length < 5 || email.length > 30) {
      return false; // Return error if not within proper length
    } else {
      return true; // Return as valid e-mail
    }
  }
};

// Validate Function to check if valid e-mail format
let validEmailChecker = (email) => {
  // Check if e-mail exists
  if (!email) {
    return false; // Return error
  } else {
    // Regular expression to test for a valid e-mail
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return regExp.test(email); // Return regular expression test results (true or false)
  }
};

// Array of Email Validators
const emailValidators = [
  // First Email Validator
  {
    validator: emailLengthChecker,
    message: 'E-mail must be at least 5 characters but no more than 30'
  },
  // Second Email Validator
  {
    validator: validEmailChecker,
    message: 'Must be a valid e-mail'
  }
];

// Validate Function to check Vendorname length
let vendornameLengthChecker = (vendorname) => {
  // Check if vendorname exists
  if (!vendorname) {
    return false; // Return error
  } else {
    // Check length of vendorname string
    if (vendorname.length < 3 || vendorname.length > 15) {
      return false; // Return error if does not meet length requirement
    } else {
      return true; // Return as valid vendorname
    }
  }
};

// Validate Function to check if valid vendorname format
let validVendorname = (vendorname) => {
  // Check if vendorname exists
  if (!vendorname) {
    return false; // Return error
  } else {
    // Regular expression to test if vendorname format is valid
    const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
    return regExp.test(vendorname); // Return regular expression test result (true or false)
  }
};

// Array of Vsername validators
const vendornameValidators = [
  // First Vendorname validator
  {
    validator: vendornameLengthChecker,
    message: 'Vendorname must be at least 3 characters but no more than 15'
  },
  // Second vendorname validator
  {
    validator: validVendorname,
    message: 'Vendorname must not have any special characters'
  }
];

// Validate Function to check password length
let passwordLengthChecker = (password) => {
  // Check if password exists
  if (!password) {
    return false; // Return error
  } else {
    // Check password length
    if (password.length < 8 || password.length > 35) {
      return false; // Return error if passord length requirement is not met
    } else {
      return true; // Return password as valid
    }
  }
};

// Validate Function to check if valid password format
let validPassword = (password) => {
  // Check if password exists
  if (!password) {
    return false; // Return error
  } else {
    // Regular Expression to test if password is valid format
    const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);
    return regExp.test(password); // Return regular expression test result (true or false)
  }
};

// Array of Password validators
const passwordValidators = [
  // First password validator
  {
    validator: passwordLengthChecker,
    message: 'Password must be at least 8 characters but no more than 35'
  },
  // Second password validator
  {
    validator: validPassword,
    message: 'Must have at least one uppercase, lowercase, special character, and number'
  }
];


////////////Address and Mobile No validators

// Validate Function to check street length
let streetLengthChecker = (street) => {
  // Check if password exists
  if (!street) {
    return false; // Return error
  } else {
    // Check password length
    if (street.length < 8 || street.length > 50) {
      return false; // Return error if passord length requirement is not met
    } else {
      return true; // Return password as valid
    }
  }
};

// Validate Function to check if valid password format
let validStreet = (street) => {
  // Check if password exists
  if (!street) {
    return false; // Return error
  } else {
    // Regular Expression to test if password is valid format
    const regExp = new RegExp(/^[a-zA-Z0-9\s,'-]*$/);
    return regExp.test(street); // Return regular expression test result (true or false)
  }
};

// Array of Password validators
const streetValidators = [
  // First password validator
  {
    validator: streetLengthChecker,
    message: 'street must be at least 8 characters but no more than 50'
  },
  // Second password validator
  {
    validator: validStreet,
    message: 'Street must be in valid Format'
  }
];

// Validate Function to check city length
let cityLengthChecker = (city) => {
  // Check if city exists
  if (!city) {
    return false; // Return error
  } else {
    // Check city length
    if (city.length < 3 || city.length > 15) {
      return false; // Return error if city length requirement is not met
    } else {
      return true; // Return city as valid
    }
  }
};

// Validate Function to check if valid city format
let validCity = (city) => {
  // Check if city exists
  if (!city) {
    return false; // Return error
  } else {
    // Regular Expression to test if city is valid format
    const regExp = new RegExp(/^[A-Za-z . ,'-]+$/);
    return regExp.test(city); // Return regular expression test result (true or false)
  }
};

// Array of City validators
const cityValidators = [
  // First city validator
  {
    validator: cityLengthChecker,
    message: 'street must be at least 3 characters but no more than 15'
  },
  // Second city validator
  {
    validator: validCity,
    message: 'City must be in valid Format'
  }
];


// Validate Function to check state length
let stateLengthChecker = (state) => {
  // Check if state exists
  if (!state) {
    return false; // Return error
  } else {
    // Check state length
    if (state.length < 3 || state.length > 15) {
      return false; // Return error if state length requirement is not met
    } else {
      return true; // Return state as valid
    }
  }
};

// Validate Function to check if valid state format
let validState = (state) => {
  // Check if state exists
  if (!state) {
    return false; // Return error
  } else {
    // Regular Expression to test if state is valid format
    const regExp = new RegExp(/^[A-Za-z . ,'-]+$/);
    return regExp.test(state); // Return regular expression test result (true or false)
  }
};

// Array of state validators
const stateValidators = [
  // First state validator
  {
    validator: stateLengthChecker,
    message: 'street must be at least 3 characters but no more than 15'
  },
  // Second state validator
  {
    validator: validState,
    message: 'State must be in valid Format'
  }
];


// Validate Function to check pincode length
let pincodeLengthChecker = (pincode) => {
  // Check if pincode exists
  if (!pincode) {
    return false; // Return error
  } else {
    // Check pincode length
    if (pincode.length < 4 || pincode.length > 8) {
      return false; // Return error if pincode length requirement is not met
    } else {
      return true; // Return pincode as valid
    }
  }
};

// Validate Function to check if valid pincode format
let validPincode = (pincode) => {
  // Check if pincode exists
  if (!pincode) {
    return false; // Return error
  } else {
    // Regular Expression to test if pincode is valid format
    const regExp = new RegExp(/^[1-9][0-9]{5}$/);
    return regExp.test(pincode); // Return regular expression test result (true or false)
  }
};

// Array of pincode validators
const pincodeValidators = [
  // First pincode validator
  {
    validator: pincodeLengthChecker,
    message: 'pincode must be at least 4 characters but no more than 8'
  },
  // Second pincode validator
  {
    validator: validPincode,
    message: 'Pincode must be in valid Format'
  }
];


// Validate Function to check mobile length
let mobileLengthChecker = (mobile) => {
  // Check if mobile exists
  if (!mobile) {
    return false; // Return error
  } else {
    // Check mobile length
    if (mobile.length < 3 || mobile.length > 10) {
      return false; // Return error if mobile length requirement is not met
    } else {
      return true; // Return mobile as valid
    }
  }
};

// Validate Function to check if valid mobile format
let validMobile = (mobile) => {
  // Check if mobile exists
  if (!mobile) {
    return false; // Return error
  } else {
    // Regular Expression to test if mobile is valid format
    const regExp = new RegExp(/^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$/);
    return regExp.test(mobile); // Return regular expression test result (true or false)
  }
};

// Array of mobile validators
const mobileValidators = [
  // First pincode validator
  {
    validator: mobileLengthChecker,
    message: 'mobile must be at least 3 characters but no more than 10'
  },
  // Second mobile validator
  {
    validator: validMobile,
    message: 'mobile must be in valid Format'
  }
];



// Vendor Model Definition
const vendorSchema = new Schema({
  email: { type: String, required: true, unique: true, lowercase: true, validate: emailValidators },
  vendorname: { type: String, required: true, unique: true, lowercase: true, validate: vendornameValidators },
  password: { type: String, required: true, validate: passwordValidators },
  street: { type: String, required: true, validate: streetValidators },
  city: { type: String, required: true, validate: cityValidators },
  state: { type: String, required: true, validate: stateValidators },
  pincode: { type: Number, required: true, validate: pincodeValidators },
  mobile: { type: Number, required: true, validate: mobileValidators }
});

// Schema Middleware to Encrypt Password
// vendorSchema.pre('save', function(next) {
//   // Ensure password is new or modified before applying encryption
//   if (!this.isModified('password'))
//     return next();
//
//   // Apply encryption
//   bcrypt.hash(this.password, null, null, (err, hash) => {
//     if (err) return next(err); // Ensure no errors
//     this.password = hash; // Apply encryption to password
//     next(); // Exit middleware
//   });
// });
//
// // Methods to compare password to encrypted password upon login
// vendorSchema.methods.comparePassword = function(password) {
//   return bcrypt.compareSync(password, this.password); // Return comparison of login password to password in database (true or false)
// };

// Export Module/Schema
module.exports = mongoose.model('Vendor', vendorSchema);
