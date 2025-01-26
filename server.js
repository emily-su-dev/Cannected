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
    .then(() => {
        console.log('Connected to MongoDB');

        // Use async/await to query the User collection
        async function getUsers() {
            try {
                const users = await User.find(); // Fetch all users
                console.log('Users in the database:', users);
            } catch (err) {
                console.error('Error fetching users:', err);
            }
        }

        getUsers(); // Call the function to fetch users
    })
    .catch((error) => console.log('Error connecting to MongoDB:', error));


app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});

// Create a new user
app.post('/api/users', async (req, res) => {
    const { username, email, password, placeID } = req.body;

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'Email already in use' });
    }

    // Create a new User document with defaults for numberOfCans
    const newUser = new User({
        username,
        email,
        password,  // You might want to hash the password before saving it
        placeID: placeID || null,
        numberOfCans: 0  // Default numberOfCans is 0
    });

    try {
        // Save the user to the database
        await newUser.save();
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        res.status(400).json({ message: 'Error creating user', error: error.message });
    }
});

// Login route
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });

        // If no user found
        if (!user) {
            return res.status(400).json({ message: 'This email is not registered as an account' });
        }

        // Compare the passwords directly (no hashing for now)
        if (user.password !== password) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        // If email and password are correct
        res.status(200).json({
            message: 'Login successful',
            user: { username: user.username, email: user.email, placeID: user.placeID }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
