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

export default Login;

