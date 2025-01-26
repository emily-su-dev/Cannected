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
        
        
            <div style={styles.container}>
            <h2 style={styles.title}>Log In</h2>
            
                
                <form onSubmit={handleSubmit}>

                    <div style={styles.inputGroup}>
                    <label htmlFor="email" style={styles.label}>Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={styles.input}
                        required
                    />
                    </div>

                    <div style={styles.inputGroup}>
                        <label htmlFor="password" style={styles.label}>Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={styles.input}
                            required
                        />
                    </div>
                    
                    <div>
                    <button type="submit" style={styles.button}>Log In</button>
                    </div>
                </form>
                {message && <p>{message}</p>}

                <div class="create-account">
                    <p class="create-account n">No account?</p>
                    <p><Link to='/signup'>Create one</Link></p>
                </div>
            </div>
    
        
    );
}


const styles = {
    container: {
        padding: '50px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',  // Centers vertically
        alignItems: 'center',  // Centers horizontally
        backgroundColor: '#ffffff',
        width: '60%',  // Make container 60% of the screen width
        maxWidth: '600px',  // Max width to prevent the container from getting too wide
        boxShadow: '0 4px 8px rgba(129, 141, 153, 0.3)', 
        borderRadius: '10px',  // Rounded corners
    },
    title: {
      textAlign: 'center',

      marginBottom: '40px',
      fontFamily: 'Verdana, sans-serif',
      color: '#4e854c',
      fontSize: '46px',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      width: '300px',
    },
    inputGroup: {
      marginBottom: '15px',
    },
    label: {
      display: 'block',
      marginBottom: '5px',
      fontSize: '14px',
      fontFamily: 'Verdana, sans-serif',
    },
    input: {
      width: '90%',
      padding: '8px',
      fontSize: '14px',
      borderRadius: '4px',
      border: '1px solid #ccc',
    },
    button: {
      width: '100%',
      padding: '10px',
      backgroundColor: '#00ba9b',
      color: 'white',
      fontSize: '16px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
  };
  

export default Login;
