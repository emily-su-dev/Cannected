// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    // Step 1: Define state for form inputs
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); 

    // Step 2: Create the submit function
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page refresh on form submit

        const loginData = {
            email,
            password
        };

        try {
            // Send a POST request to the login route on the backend
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            const data = await response.json();
            if (response.status === 200) {
                // On successful login, store user data in localStorage
                localStorage.setItem('user', JSON.stringify(data.user));

                setMessage('Login successful!');
                
                // Redirect to profile page
                navigate('/profile');
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            setMessage('Error: Could not connect to server');
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Login</h1>
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
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default Login;
