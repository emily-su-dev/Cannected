const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User'); // Import the User model
const app = express();
const port = 5000;

// Middleware to parse incoming JSON data
app.use(express.json());

// MongoDB Connection
const dbURI = 'mongodb://localhost:27017/myapp';  // For local MongoDB
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.log('Error connecting to MongoDB:', error));

app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});

// Create a new user
app.post('/api/users', async (req, res) => {
    const { username, email, userType, placeID, numberOfCans } = req.body;

    // Create a new User document
    const newUser = new User({
        username,
        email,
        password,
        userType,
        placeID,
        numberOfCans
    });

    try {
        // Save the user to the database
        await newUser.save();
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        res.status(400).json({ message: 'Error creating user', error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
