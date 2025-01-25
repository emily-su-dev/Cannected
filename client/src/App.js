import React, { useState } from 'react';
import './App.css'; // Optional: for adding styles

function App() {
  // Step 1: Define the state for the button click
  const [loggedIn, setLoggedIn] = useState(false);

  // Step 2: Create the login function
  const handleLogin = () => {
    setLoggedIn(true); // Change the state when the button is clicked
  };

  return (
    <div className="App">
      {/* Step 3: Title */}
      <h1>Welcome to Cannected!</h1>

      {/* Step 4: Conditional rendering based on login state */}
      {!loggedIn ? (
        <button onClick={handleLogin}>Login</button> // Button for login
      ) : (
        <p>You are logged in!</p> // Message after login
      )}
    </div>
  );
}

export default App;
