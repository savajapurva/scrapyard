/* ===================
   Import Node Modules
=================== */
const mongoose = require('mongoose'); // Node Tool for MongoDB
mongoose.Promise = global.Promise; // Configure Mongoose Promises
const Schema = mongoose.Schema; // Import Schema from Mongoose


const orderSchema = new Schema({
  date:Date,
  username:String,
  userid:String,
  email:String,
  work:String,
  address:String,
  mobile:String,
  cityzip:String
});


module.exports = mongoose.model('Order', orderSchema);
