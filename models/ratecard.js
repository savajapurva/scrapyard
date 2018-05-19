const mongoose = require('mongoose'); // Node Tool for MongoDB
mongoose.Promise = global.Promise; // Configure Mongoose Promises
const Schema = mongoose.Schema; // Import Schema from Mongoose

const rateCardSchema = new Schema({
  id:String,
  data:JSON
});


module.exports = mongoose.model('Ratecard', rateCardSchema);
