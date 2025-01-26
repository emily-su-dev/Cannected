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
            address: null,
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
            <div style={styles.container}>
              <h2 style={styles.title}>Sign Up</h2>
              <form onSubmit={handleSubmit} style={styles.form}>
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
                  <label htmlFor="username" style={styles.label}>Username:</label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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
                <button type="submit" style={styles.button}>Sign Up</button>
              </form>
              {message && <p>{message}</p>}

            </div>
    );
}

const styles = {
    container: {
      padding: '50px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: '#ffffff',
      minHeight: '50vh',
      borderRadius: '10px',  // Optional: rounded corners for the border
      boxShadow: '0 4px 8px rgba(129, 141, 153, 0.3)', 
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
      width: '94%',
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

export default SignUp;
