const mongoose = require('mongoose');

// Define a schema for the User
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, default: null },
    numberOfCans: { type: Number, default: 0 }  // Default numberOfCans is 0
});

// Create a model from the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
