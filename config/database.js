const crypto = require('crypto').randomBytes(256).toString('hex'); // Provides cryptographic functionality (OpenSSL's hash, HMAC, cipher, decipher, sign and verify functions)

// Export config object
module.exports = {

  uri: 'mongodb://localhost:27017/' + this.db, // Databse URI and database name //Development

  //uri: 'mongodb://savajapurva:a9033380108@ds251197.mlab.com:51197/angular-2-app', //Production
  secret: crypto, // Cryto-created secret
  db: 'angular-2-app' // Database name
}
