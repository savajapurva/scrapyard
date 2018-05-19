/* ===================
   Import Node Modules
=================== */
const express = require('express'); // Fast, unopinionated, minimalist web framework for node.
const app = express(); // Initiate Express Application
const router = express.Router(); // Creates a new router object.
const mongoose = require('mongoose'); // Node Tool for MongoDB
mongoose.Promise = global.Promise;
const config = require('./config/database'); // Mongoose Config
const path = require('path'); // NodeJS Package for file paths
const vendorauthentication = require('./routes/vendorauthentication')(router);
const authentication = require('./routes/authentication')(router); // Import Authentication Routes  //**
const order = require('./routes/order')(router);
const blogs = require('./routes/blog')(router); // Import Blog Routes  //***
const bodyParser = require('body-parser'); // Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
const cors = require('cors'); // CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
const port = process.env.PORT || 8080;
//mail
const flash = require('express-flash');
const sendgrid = require('sendgrid')('savajapurva','Aa@9033380108');
const sgTransport = require('nodemailer-sendgrid-transport');
const nodemailer = require('nodemailer');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const async = require('async');
const session = require('express-session');
const favicon = require('static-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');

// Database Connection
mongoose.connect(config.uri, (err) => {
  if (err) {
    console.log('Could NOT connect to database: ', err);
  } else {
    console.log('Connected to database: ' + config.db);
  }
});

// Middleware
//added
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(flash());
app.use(favicon());
app.use(cookieParser());
app.use(logger('dev'));
app.use(session({ secret: 'session secret key' }));
app.use(passport.initialize());
app.use(passport.session());
//
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(cors());
app.use(express.static(__dirname + '/public')); // Provide static directory for frontend
app.use('/authentication', authentication); // Use Authentication routes in application /**
app.use('/vendorauthentication', vendorauthentication);
app.use('/orderdata', order);
app.use('/blogs', blogs); // Use Blog routes in application //***

app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});

// Connect server to Angular 2 Index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});



// Start Server: Listen on port 8080
app.listen(port, () => {
  console.log('Listening on port 8080'+ port);
});
