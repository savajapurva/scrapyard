/* ===================
   Import Node Modules
=================== */
const mongoose = require('mongoose'); // Node Tool for MongoDB
mongoose.Promise = global.Promise; // Configure Mongoose Promises
const Schema = mongoose.Schema; // Import Schema from Mongoose

//Demo Feedback Form---------------------------------------------------------------------
// Validate Function to check e-mail length
let forgotemailLengthChecker = (forgotemail) => {
  // Check if e-mail exists
  if (!forgotemail) {
    return false; // Return error
  } else {
    // Check the length of e-mail string
    if (forgotemail.length < 5 || forgotemail.length > 30) {
      return false; // Return error if not within proper length
    } else {
      return true; // Return as valid e-mail
    }
  }
};

// Validate Function to check if valid e-mail format
let validforgotEmailChecker = (forgotemail) => {
  // Check if e-mail exists
  if (!forgotemail) {
    return false; // Return error
  } else {
    // Regular expression to test for a valid e-mail
    const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return regExp.test(forgotemail); // Return regular expression test results (true or false)
  }
};

// Array of Email Validators
const forgotemailValidators = [
  // First Email Validator
  {
    validator: forgotemailLengthChecker,
    message: 'E-mail must be at least 5 characters but no more than 30'
  },
  // Second Email Validator
  {
    validator: validforgotEmailChecker,
    message: 'Must be a valid e-mail'
  }
];


//End of Demo Feedback



// User Model Definition
const forgotvendorSchema = new Schema({

  forgotemail: { type: String, required: true, unique: true, lowercase: true, validate: forgotemailValidators }
});


// Export Module/Schema
module.exports = mongoose.model('Forgotvendor', forgotvendorSchema);
