/* ===================
   Import Node Modules
=================== */
const mongoose = require('mongoose'); // Node Tool for MongoDB
mongoose.Promise = global.Promise; // Configure Mongoose Promises
const Schema = mongoose.Schema; // Import Schema from Mongoose


const acceptedorderSchema = new Schema({
vendorname:String,
orderid:String,
username:String,
email:String,
work:String,
address:String,
date:String
});


module.exports = mongoose.model('Acceptedorders', acceptedorderSchema);
