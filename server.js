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

// Fetch users API endpoint
app.post('/api/users/postings', async (req, res) => {
    try {
        const { email } = req.body;  // Extract the email from the body of the request

        // Find users who have more than 0 cans and exclude the logged-in user's email
        const users = await User.find({
            numberOfCans: { $gt: 0 },  // Only users who have cans to donate
            email: { $ne: email },  // Exclude the logged-in user's email
        });

        res.status(200).json({ users });  // Send the users as a response
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
});

// Create a new user
app.post('/api/users', async (req, res) => {
    const { username, email, password, address } = req.body;

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
        address: address || null,
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

app.put('/api/users/:userId/update-cans', async (req, res) => {
    try {
        const { userId } = req.params;
        const { numberOfCans } = req.body;

        // Find the user and update the numberOfCans
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.numberOfCans = numberOfCans;  // Update numberOfCans to 0
        await user.save();  // Save changes to the database

        res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error: error.message });
    }
});

// Update the number of cans donated by a user
app.put('/api/users/:id/donate', async (req, res) => {
    const { id } = req.params;
    const { numberOfCans } = req.body;

    try {
        const user = await User.findById(id);  // Find user by ID

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.numberOfCans += numberOfCans;  // Update the number of cans
        await user.save();  // Save updated user to database

        res.status(200).json({ message: 'Donation successful', user });
    } catch (error) {
        res.status(500).json({ message: 'Error updating donation', error: error.message });
    }
});

// Update the user's address
app.put('/api/users/:id/address', async (req, res) => {
    const { id } = req.params;  // Get user ID from the URL params
    const { address } = req.body;  // Get the address from the request body

    try {
        // Find the user by ID and update the address
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update the user's address
        user.address = address;
        await user.save();  // Save the updated user back to the database

        res.status(200).json({ message: 'Address updated successfully', user });
    } catch (error) {
        console.error('Error updating address:', error);
        res.status(500).json({ message: 'Error updating address' });
    }
});

// Get user details by ID
app.get('/api/users/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        // Find the user by ID and return the relevant fields
        const user = await User.findById(userId, 'address numberOfCans');
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user data', error: error.message });
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
            user: { _id: user._id, username: user.username, email: user.email, address: user.address, numberOfCans: user.numberOfCans }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
