// App.js
import React from 'react';
import './App.css'; // Optional: for adding styles
import Login from './login'; // Import the Login component

function App() {
  return (
      <div className="App">
        <h1>Welcome to Cannected!</h1>
        <p class="description">Talk about problem</p>
      {/* Step 4: Use the Login component */}
      <Login />
    </div>
  );
}

export default App;
