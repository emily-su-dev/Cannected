// App.js
import React from 'react';
import './App.css'; // Optional: for adding styles
import SignUp from './signup'; // Import the Login component
import Login from './login'; // Import the Login component

function App() {
  return (
    <div className="App">
      {/* Step 3: Title */}
      <h1>Welcome to Cannected!</h1>

      {/* Step 4: Use the Login component */}
      <SignUp />

      <Login />
    </div>
  );
}

export default App;
