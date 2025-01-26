// Signup.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUp() {
    // Step 1: Define the state for form inputs
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); 

    // Step 2: Create the submit function
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page refresh on form submit

        // Create a user object to send to the backend
        const newUser = {
            username,
            email,
            password,
            placeID: null,
            numberOfCans: 0, // Default numberOfCans is 0
        };

        try {
            // Send the user data to the backend using POST request
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            });

            const data = await response.json();
            if (response.status === 201) {
                setMessage('Account created successfully!');
                navigate('/login');
            } else {
                setMessage(`Error: ${data.message}`);
            }
        } catch (error) {
            setMessage('Error: Could not connect to server');
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Create Account</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Sign Up</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default SignUp;
