const User = require('../models/user'); // Import User Model Schema
const Vendor = require('../models/vendor'); // Import Vendor Model Schema
const Ratecard = require('../models/ratecard');
const Forgotvendor = require('../models/forgotvendor'); // Import User Model Schema
const nodemailer = require('nodemailer');
const multer = require('multer');
//const jwt = require('jsonwebtoken'); // Compact, URL-safe means of representing claims to be transferred between two parties.
const config = require('../config/database'); // Import database configuration
const Order = require('../models/order');
const path = require('path');

module.exports = (router) => {
  /* ==============
     Register Route
  ============== */
  router.post('/vendoregister', (req, res) => {
    console.log('vendoregister==>',req.body);
    // Check if email was provided
    if (!req.body.email) {
      res.json({ success: false, message: 'You must provide an e-mail' }); // Return error
    } else {
      // Check if vendorname was provided
      if (!req.body.vendorname) {
        res.json({ success: false, message: 'You must provide a username' }); // Return error
      } else {
        // Check if password was provided
        if (!req.body.password) {
          res.json({ success: false, message: 'You must provide a password' }); // Return error
        } else {
          // Create new vendor object and apply vendor input
          let vendor = new Vendor({
            email: req.body.email.toLowerCase(),
            vendorname: req.body.vendorname.toLowerCase(),
            password: req.body.password,
            street:req.body.street,
            city:req.body.city,
            state:req.body.state,
            pincode:req.body.pincode,
            mobile:req.body.mobile
          });
          // Save vendor to database
          vendor.save((err) => {
            // Check if error occured
            if (err) {
              // Check if error is an error indicating duplicate account
              if (err.code === 11000) {
                res.json({ success: false, message: 'Username or e-mail already exists' }); // Return error
              } else {
                // Check if error is a validation rror
                if (err.errors) {
                  // Check if validation error is in the email field
                  if (err.errors.email) {
                    res.json({ success: false, message: err.errors.email.message }); // Return error
                  } else {
                    // Check if validation error is in the vendorname field
                    if (err.errors.vendorname) {
                      res.json({ success: false, message: err.errors.vendorname.message }); // Return error
                    } else {
                      // Check if validation error is in the password field
                      if (err.errors.password) {
                        res.json({ success: false, message: err.errors.password.message }); // Return error
                      } else {
                        res.json({ success: false, message: err }); // Return any other error not already covered
                      }
                    }
                  }
                } else {
                  res.json({ success: false, message: 'Could not save vendor. Error: ', err }); // Return error if not related to validation
                }
              }
            } else {
              res.json({ success: true, message: 'Acount registered!' }); // Return success
            }
          });
        }
      }
    }
  });


  /* ==============
     Forgot Password Route
  ============== */

  router.post('/forgotvendorpassword',(req,res)=>{

    if (!req.body.forgotemail) {
      res.json({ success: false, message: 'You must provide an e-mail' }); // Return error
    } else {

      Vendor.findOne({ email: req.body.forgotemail }, (err, vendor) => {
        console.log('vendor',vendor);
        // Check if error was found
        if (err) {
          res.json({ success: false, message: err }); // Return error
        } else {
          // Check if username was found
          var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'apusavaj@gmail.com',
              pass: 'a9033380108'
            }
          });

          var mailOptions = {
            from: 'apusavaj@gmail.com',
            to: req.body.forgotemail,
            subject: 'Sending Email using Node.js',
            text: 'Your password is ==> '+vendor.password
          };

          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
              res.json({ success: false, message: error });
            } else {
              console.log('Email sent: ' + info.response);
              res.json({ success: true, message: 'Please check your E-Mail' });
            }
          });

        }
      });

      // let forgotvendor = new Forgotvendor({
      //
      //   forgotemail: req.body.forgotemail.toLowerCase(),
      // });
      // console.log(forgotvendor);
      // forgotvendor.save();

    }

  });


  /* ============================================================
     Route to check if vendor's email is available for registration
  ============================================================ */
  router.get('/checkvendorEmail/:email', (req, res) => {
    // Check if email was provided in paramaters
    if (!req.params.email) {
      res.json({ success: false, message: 'E-mail was not provided' }); // Return error
    } else {
      // Search for vendor's e-mail in database;
      Vendor.findOne({ email: req.params.email }, (err, vendor) => {
        if (err) {
          res.json({ success: false, message: err }); // Return connection error
        } else {
          // Check if vendor's e-mail is taken
          if (vendor) {
            res.json({ success: false, message: 'E-mail is already taken' }); // Return as taken e-mail
          } else {
            res.json({ success: true, message: 'E-mail is available' }); // Return as available e-mail
          }
        }
      });
    }
  });



  /* ============================================================
     Route to check if user's email is available for registration
  ============================================================ */
  router.get('/checkforgotvendorEmail/:forgotemail', (req, res) => {
    // Check if email was provided in paramaters
    if (!req.params.forgotemail) {
      res.json({ success: false, message: 'E-mail was not provided' }); // Return error
    } else {
      // Search for user's e-mail in database;
      Vendor.findOne({ email: req.params.forgotemail }, (err, Vendor) => {
        if (err) {
          res.json({ success: false, message: err }); // Return connection error
        } else {
          // Check if user's e-mail is taken
          if (Vendor) {
            res.json({ success: true, message: 'E-mail is correct' }); // Return as taken e-mail
          } else {
            res.json({ success: false, message: 'Please enter registered E-mail' }); // Return as available e-mail
          }
        }
      });

    }
  });


  /* ===============================================================
     Route to check if vendor's username is available for registration
  =============================================================== */
  router.get('/checkVendorname/:vendorname', (req, res) => {
    // Check if username was provided in paramaters
    if (!req.params.vendorname) {
      res.json({ success: false, message: 'Username was not provided' }); // Return error
    } else {
      // Look for username in database
      Vendor.findOne({ vendorname: req.params.vendorname }, (err, vendor) => { // Check if connection error was found
        if (err) {
          res.json({ success: false, message: err }); // Return connection error
        } else {
          // Check if vendor's username was found
          if (vendor) {
            res.json({ success: false, message: 'Username is already taken' }); // Return as taken username
          } else {
            res.json({ success: true, message: 'Username is available' }); // Return as vailable username
          }
        }
      });
    }
  });

  /* ========
  LOGIN ROUTE
  ======== */
  router.post('/vendorlogin', (req, res) => {
    // Check if username was provided
    if (!req.body.vendorname) {
      res.json({ success: false, message: 'No username was provided' }); // Return error
    } else {
      // Check if password was provided
      if (!req.body.password) {
        res.json({ success: false, message: 'No password was provided.' }); // Return error
      } else {
        // Check if username exists in database
        Vendor.findOne({ vendorname: req.body.vendorname.toLowerCase() }, (err, vendor) => {
          // Check if error was found
          if (err) {
            res.json({ success: false, message: err }); // Return error
          } else {
            // Check if username was found
            if (!vendor) {
              res.json({ success: false, message: 'Username not found.' }); // Return error
            } else {
              //const validPassword = vendor.comparePassword(req.body.password); // Compare password provided to password in database
              // Check if password is a match
              if (req.body.password != vendor.password) {
                res.json({ success: false, message: 'Password invalid' }); // Return error
              } else {
                //const token = jwt.sign({ vendorId: vendor._id }, config.secret, { expiresIn: '24h' }); // Create a token for client

                res.json({
                  success: true,
                  message: 'Success!',
                  //token: token,
                  vendor: {
                    vendorname: vendor
                  }
                }); // Return success and token to frontend
              }
            }
          }
        });
      }
    }
  });

  /* ================================================
  MIDDLEWARE - Used to grab vendors's token from headers
  ================================================ */
  // router.use((req, res, next) => {
  //   const token = req.headers['authorization']; // Create token found in headers
  //   // Check if token was found in headers
  //   if (!token) {
  //     res.json({ success: false, message: 'No token provided' }); // Return error
  //   } else {
  //     // Verify the token is valid
  //     jwt.verify(token, config.secret, (err, decoded) => {
  //       // Check if error is expired or invalid
  //       if (err) {
  //         res.json({ success: false, message: 'Token invalid: ' + err }); // Return error for token validation
  //       } else {
  //         req.decoded = decoded; // Create global variable to use in any request beyond
  //         next(); // Exit middleware
  //       }
  //     });
  //   }
  // });

  /* ===============================================================
     Route to get vendor's profile data
  =============================================================== */
   router.get('/profile', (req, res) => {
     // Search for vendor in database
     Vendor.findOne({ _id: req.decoded.vendorId }).select('vendorname email').exec((err, vendor) => {
       // Check if error connecting
       if (err) {
         res.json({ success: false, message: err }); // Return error
       } else {
         // Check if user was found in database
         if (!vendor) {
           res.json({ success: false, message: 'Vendor not found' }); // Return error, user was not found in db
         } else {
           res.json({ success: true, vendor: vendor }); // Return success, send user object to frontend for profile
         }
       }
     });
   });

  /* ===============================================================
     Route to get user's public profile data
  =============================================================== */
  // Use when the function works of passing request from one user to vendor.At that time vendor can see the profile of
  // those user who had made request and can get his full address of delivery


  // router.get('/publicProfile/:vendorname', (req, res) => {
  //   // Check if username was passed in the parameters
  //   if (!req.params.vendorname) {
  //     res.json({ success: false, message: 'No username was provided' }); // Return error message
  //   } else {
  //     // Check the database for vendorname
  //     User.findOne({ vendorname: req.params.vendorname }).select('vendorname email').exec((err, vendor) => {
  //       // Check if error was found
  //       if (err) {
  //         res.json({ success: false, message: 'Something went wrong.' }); // Return error message
  //       } else {
  //         // Check if user was found in the database
  //         if (!vendor) {
  //           res.json({ success: false, message: 'Username not found.' }); // Return error message
  //         } else {
  //           res.json({ success: true, vendor: vendor }); // Return the public user's profile data
  //         }
  //       }
  //     });
  //   }
  // });

  var storage = multer.diskStorage({
    // destino del fichero
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    // renombrar fichero
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });

  var upload = multer({ storage: storage });

  router.post("/uploadImage", upload.array("uploads[]"), function (req, res) {
    console.log('files', req.files);
    res.send(req.files);
  });


  router.post('/rateCardData', (req, res) => {
      console.log('rateCardData req'+JSON.stringify(req.body));

      let rateCardData = req.body;

      Ratecard.update({id : '1'}, {id : '1', data : rateCardData},{ upsert : true },function(err, obj) {
         if (err) throw err;
         console.log("1 document deleted",obj);
       });
  });

  router.get('/getRateCardData', (req, res) => {
    Ratecard.find(function(err, data) {

           // if there is an error retrieving, send the error. nothing after res.send(err) will execute
           if (err)
            res.send(err)
         //console.log('order',orders);
           res.json(data); // return all reviews in JSON format
       });
  });
  router.get('/ratecardcalculator/:id', function (req, res) {
    console.log("hello chetan virani")
    var a=req.params.id;
      res.sendfile(path.resolve('./uploads/'+a));

  });


  return router; // Return router object to main index.js
}
