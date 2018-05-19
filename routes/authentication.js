const User = require('../models/user'); // Import User Model Schema
const Vendor = require('../models/vendor'); // Import User Model Schema
const Fuser = require('../models/fuser'); // Import FeedbackUser Model Schema
const Forgotuser = require('../models/forgotuser'); // Import User Model Schema
const nodemailer = require('nodemailer');
//const jwt = require('jsonwebtoken'); // Compact, URL-safe means of representing claims to be transferred between two parties.
const config = require('../config/database'); // Import database configuration

module.exports = (router) => {
  /* ==============
     Register Route
  ============== */
  router.post('/register', (req, res) => {
    console.log('register==>',req.body);
    // Check if email was provided
    if (!req.body.email) {
      res.json({ success: false, message: 'You must provide an e-mail' }); // Return error
    } else {
      // Check if username was provided
      if (!req.body.username) {
        res.json({ success: false, message: 'You must provide a username' }); // Return error
      } else {
        // Check if password was provided
        if (!req.body.password) {
          res.json({ success: false, message: 'You must provide a password' }); // Return error
        } else {
          // Create new user object and apply user input
          let user = new User({
            email: req.body.email,
            username: req.body.username,
            femail: req.body.femail,
            fusername: req.body.fusername,
            password: req.body.password,
            street:req.body.street,
            city:req.body.city,
            state:req.body.state,
            pincode:req.body.pincode,
            mobile:req.body.mobile
          });
          // Save user to database
          user.save((err) => {
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
                    // Check if validation error is in the username field
                    if (err.errors.username) {
                      res.json({ success: false, message: err.errors.username.message }); // Return error
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
                  res.json({ success: false, message: 'Could not save user. Error: ', err }); // Return error if not related to validation
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
     ContactUs Route
  ============== */

  router.post('/contactus', ( req, res )=> {
    console.log('contactus==>',req.body);
    // Check if email was provided
    if (!req.body.femail) {
      res.json({ success: false, message: 'You must provide an e-mail' }); // Return error
    } else {
      // Check if username was provided
      if (!req.body.fusername) {
        res.json({ success: false, message: 'You must provide a username' }); // Return error
      } else {
        // Check if password was provided
        if (!req.body.ftext) {
          res.json({ success: false, message: 'You must provide a message' }); // Return error
        } else {

              let fuser = new Fuser({

                femail: req.body.femail.toLowerCase(),
                fusername: req.body.fusername.toLowerCase(),
                ftext: req.body.ftext.toLowerCase()

              });

              // Save user to database
              fuser.save((err) => {
                // Check if error occured
                if (err) {
                  // Check if error is an error indicating duplicate account
                  if (err.code === 11000) {
                    res.json({ success: false, message: 'Username or e-mail already exists' }); // Return error
                  } else {
                    // Check if error is a validation rror
                    if (err.errors) {
                      // Check if validation error is in the email field
                      if (err.errors.femail) {
                        res.json({ success: false, message: err.errors.femail.message }); // Return error
                      } else {
                        // Check if validation error is in the username field
                        if (err.errors.fusername) {
                          res.json({ success: false, message: err.errors.fusername.message }); // Return error
                        } else {
                          // Check if validation error is in the password field
                          if (err.errors.ftext) {
                            res.json({ success: false, message: err.errors.ftext.message }); // Return error
                          } else {
                            res.json({ success: false, message: err }); // Return any other error not already covered
                          }
                        }
                      }
                    } else {
                      res.json({ success: false, message: 'Could not save feedback user. Error: ', err }); // Return error if not related to validation
                    }
                  }
                } else {
                  res.json({ success: true, message: 'Message Received. We will get back to you soon!' }); // Return success
                }
              });


              }
            }
          }

  });

  /* ==============
     Forgot Password Route
  ============== */

  router.post('/forgotpassword',(req,res)=>{
    console.log('forgot',req.body.forgotemail);
    if (!req.body.forgotemail) {
      res.json({ success: false, message: 'You must provide an e-mail' }); // Return error
    } else {

      User.findOne({ email: req.body.forgotemail }, (err, user) => {
        console.log('user',user);
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
            subject: 'ScrapYard: Recover your Password',
            text: 'Your password is ==> '+user.password
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

      // let forgotuser = new Forgotuser({
      //
      //   forgotemail: req.body.forgotemail.toLowerCase(),
      // });
      //
      // forgotuser.save((err)=>{
      //
      //   if(err){
      //     res.json({ success: false, message: err });
      //   }
      //   else{
      //     res.json({ success: true, message: 'Please check your E-Mail' });
      //   }
      // });

    }

  });



  /* ============================================================
     Route to check if user's email is available for registration
  ============================================================ */
  router.get('/checkforgotEmail/:forgotemail', (req, res) => {
    // Check if email was provided in paramaters
    if (!req.params.forgotemail) {
      res.json({ success: false, message: 'E-mail was not provided' }); // Return error
    } else {
      // Search for user's e-mail in database;
      User.findOne({ email: req.params.forgotemail }, (err, User) => {
        if (err) {
          res.json({ success: false, message: err }); // Return connection error
        } else {
          // Check if user's e-mail is taken
          if (User) {
            res.json({ success: true, message: 'E-mail is correct' }); // Return as taken e-mail
          } else {
            res.json({ success: false, message: 'Please enter registered E-mail' }); // Return as available e-mail
          }
        }
      });

    }
  });



  /* ============================================================
     Route to check if user's email is available for registration
  ============================================================ */
  router.get('/checkEmail/:email', (req, res) => {
    // Check if email was provided in paramaters
    if (!req.params.email) {
      res.json({ success: false, message: 'E-mail was not provided' }); // Return error
    } else {
      // Search for user's e-mail in database;
      User.findOne({ email: req.params.email }, (err, user) => {
        if (err) {
          res.json({ success: false, message: err }); // Return connection error
        } else {
          // Check if user's e-mail is taken
          if (user) {
            res.json({ success: false, message: 'E-mail is already taken' }); // Return as taken e-mail
          } else {
            res.json({ success: true, message: 'E-mail is available' }); // Return as available e-mail
          }
        }
      });
    }
  });

  /* ===============================================================
     Route to check if user's username is available for registration
  =============================================================== */
  router.get('/checkUsername/:username', (req, res) => {
    // Check if username was provided in paramaters
    if (!req.params.username) {
      res.json({ success: false, message: 'Username was not provided' }); // Return error
    } else {
      // Look for username in database
      User.findOne({ username: req.params.username }, (err, user) => { // Check if connection error was found
        if (err) {
          res.json({ success: false, message: err }); // Return connection error
        } else {
          // Check if user's username was found
          if (user) {
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
  router.post('/login', (req, res) => {
    // Check if username was provided
    if (!req.body.username) {
      res.json({ success: false, message: 'No username was provided' }); // Return error
    } else {
      // Check if password was provided
      if (!req.body.password) {
        res.json({ success: false, message: 'No password was provided.' }); // Return error
      } else {
        // Check if username exists in database
        User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
          console.log('user',user);
          // Check if error was found
          if (err) {
            res.json({ success: false, message: err }); // Return error
          } else {
            // Check if username was found
            if (!user) {
              res.json({ success: false, message: 'Username not found.' }); // Return error
            } else {
              //const validPassword = user.comparePassword(req.body.password); // Compare password provided to password in database
              // Check if password is a match
              if (req.body.password != user.password) {
                res.json({ success: false, message: 'Password invalid' }); // Return error
              } else {
                //const token = jwt.sign({ userId: user._id }, config.secret, { expiresIn: '24h' }); // Create a token for clientz
                res.json({
                  success: true,
                  message: 'Success!',
                  //token: token,
                  data: user
                }); // Return success and token to frontend
              }
            }
          }
        });
      }
    }
  });

  /* ================================================
  MIDDLEWARE - Used to grab user's token from headers
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
     Route to get user's profile data
  =============================================================== */
  router.get('/profile', (req, res) => {
    // Search for user in database
    User.findOne({ _id: id }).select('username email').exec((err, user) => {
      // Check if error connecting
      if (err) {
        res.json({ success: false, message: err }); // Return error
      } else {
        // Check if user was found in database
        if (!user) {
          res.json({ success: false, message: 'User not found' }); // Return error, user was not found in db
        } else {
          res.json({ success: true, user: user }); // Return success, send user object to frontend for profile
        }
      }
    });
  });

  /* ===============================================================
     Route to get user's public profile data
  =============================================================== */
  router.get('/publicProfile/:username', (req, res) => {
    // Check if username was passed in the parameters
    if (!req.params.username) {
      res.json({ success: false, message: 'No username was provided' }); // Return error message
    } else {
      // Check the database for username
      User.findOne({ username: req.params.username }).select('username email').exec((err, user) => {
        // Check if error was found
        if (err) {
          res.json({ success: false, message: 'Something went wrong.' }); // Return error message
        } else {
          // Check if user was found in the database
          if (!user) {
            res.json({ success: false, message: 'Username not found.' }); // Return error message
          } else {
            res.json({ success: true, user: user }); // Return the public user's profile data
          }
        }
      });
    }
  });

  return router; // Return router object to main index.js
}
