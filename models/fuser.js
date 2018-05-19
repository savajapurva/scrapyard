/* ===================
   Import Node Modules
=================== */
const mongoose = require('mongoose'); // Node Tool for MongoDB
mongoose.Promise = global.Promise; // Configure Mongoose Promises
const Schema = mongoose.Schema; // Import Schema from Mongoose

//Demo Feedback Form---------------------------------------------------------------------
// Validate Function to check e-mail length
let femailLengthChecker = (femail) => {
  // Check if e-mail exists
  if (!femail) {
    return false; // Return error
  } else {
    // Check the length of e-mail string
    if (femail.length < 5 || femail.length > 30) {
      return false; // Return error if not within proper length
    } else {
      return true; // Return as valid e-mail
    }
  }
};

// Validate Function to check if valid e-mail format
let validfEmailChecker = (femail) => {
  // Check if e-mail exists
  if (!femail) {
    return false; // Return error
  } else {
    // Regular expression to test for a valid e-mail
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return regExp.test(femail); // Return regular expression test results (true or false)
  }
};

// Array of Email Validators
const femailValidators = [
  // First Email Validator
  {
    validator: femailLengthChecker,
    message: 'E-mail must be at least 5 characters but no more than 30'
  },
  // Second Email Validator
  {
    validator: validfEmailChecker,
    message: 'Must be a valid e-mail'
  }
];

// Validate Function to check username length
let fusernameLengthChecker = (fusername) => {
  // Check if username exists
  if (!fusername) {
    return false; // Return error
  } else {
    // Check length of username string
    if (fusername.length < 3 || fusername.length > 15) {
      return false; // Return error if does not meet length requirement
    } else {
      return true; // Return as valid username
    }
  }
};

// Validate Function to check if valid username format
let validfUsername = (fusername) => {
  // Check if username exists
  if (!fusername) {
    return false; // Return error
  } else {
    // Regular expression to test if username format is valid
    const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
    return regExp.test(fusername); // Return regular expression test result (true or false)
  }
};

// Array of Username validators
const fusernameValidators = [
  // First Username validator
  {
    validator: fusernameLengthChecker,
    message: 'Username must be at least 3 characters but no more than 15'
  },
  // Second username validator
  {
    validator: validfUsername,
    message: 'Username must not have any special characters'
  }
];

//End of Demo Feedback



// User Model Definition
const fuserSchema = new Schema({

  femail: { type: String, required: true, unique: true, lowercase: true, validate: femailValidators },
  fusername: { type: String, required: true, unique: true, lowercase: true, validate: fusernameValidators },
  ftext: { type: String, required: true, unique: true, lowercase: true }

});


// Export Module/Schema
module.exports = mongoose.model('Fuser', fuserSchema);
