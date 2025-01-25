const mongoose = require('mongoose');

// Define a schema for the User
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  userType: { type: String, required: true },
  placeID: { type: String, required: true },
  numberOfCans: { type: Number, required: true }
});

// Create a model from the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
