// Login.js

import React, { useState } from 'react';

function Login() {
  // Step 1: Define the state for the button click
  const [loggedIn, setLoggedIn] = useState(false);

  // Step 2: Create the login function
  const handleLogin = () => {
    setLoggedIn(true); // Change the state when the button is clicked
  };

  return (
    <div>
      {/* Step 4: Conditional rendering based on login state */}
      {!loggedIn ? (
        <button onClick={handleLogin}>Login</button> // Button for login
      ) : (
        <p>You are logged in!</p> // Message after login
      )}
    </div>
  );
}  

  const NameForm = () => {
    const [name, setName] = useState('');
  
    const handleChange = (e) => {
      setName(e.target.value);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      alert(`Name submitted: ${name}`);
    };
  }  

  const EmailForm = () => {
    const [email, setEmail] = useState('');
  
    const handleChange = (e) => {
      setEmail(e.target.value);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      alert(`Email submitted: ${email}`);
    };  
  }

  const PwdForm = () => {
    const [password, setPwd] = useState('');
  
    const handleChange = (e) => {
      setPwd(e.target.value);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      alert(`Password submitted: ${password}`);
    };    
  }

  function LoginPage() {

    return (
      <div>
        <body>
          <h1>LOGIN</h1>
          <p>Enter you information below to </p>
            <p>login to your account.</p>

            <form onSubmit={handleSubmit}>
            <label htmlFor="name">Enter your name:</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={name} 
                onChange={handleChange} 
              />
            <button type="submit">Submit</button>
            </form>

            <form onSubmit={handleSubmit}>
            <label htmlFor="email">Enter your email:</label>
              <input 
                type="text" 
                id="email" 
                name="email" 
                value={email} 
                onChange={handleChange} 
              />
            <button type="submit">Submit</button>
            </form>

            <form onSubmit={handleSubmit}>
            <label htmlFor="password">Enter your password:</label>
              <input 
                type="text" 
                id="password" 
                name="password" 
                value={password} 
                onChange={handleChange} 
              />
            <button type="submit">Submit</button>
            </form>
            
            <a href = "!Midpage.html"> 
            <button>log in</button>
          </a>
            
        </body>
      </div>
    );
  }

export default Login;
