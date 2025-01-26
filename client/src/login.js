// Login.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './login.css';
import SignUp from './signup';

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
        
            <div class="login-container">
                <h1>Log in</h1>
                <div class="divider">
                </div>
                
                <div class="body">            
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Email </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Password </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <button class="submit" type="submit">Log In</button>
                    </div>
                </form>
                </div>
                {message && <p>{message}</p>}

                <div class="create-account">
                    <p>No account?
                    <Link to='/signup'> Create one </Link>
                    </p>
                </div>
            </div>
    
        </div>
    );
}

export default Login;
