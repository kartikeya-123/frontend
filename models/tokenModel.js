const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
  hashedToken: String,
  tokenExpiresAt: Date,
});

const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;
