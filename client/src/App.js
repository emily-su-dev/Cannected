// App.js
import React from 'react';
import './App.css'; // Optional: for adding styles
import Login from './login'; // Import the Login component

function App() {
  return (
    <div className="App">
      {/* Step 3: Title */}
      <h1>Welcome to Cannected!</h1>

      {/* Step 4: Use the Login component */}
      <Login />

    <body>
      <header>
        <t>CANnected</t>
      </header>
      <header>
        <a href="!Login.html">
          <button style="background-color: navy; color: white; border: none; padding: 10px 20px; border-radius: 10px; font-size: 15px; text-align: center; display: inline;">
            Login
          </button>
        </a>
    </header>

      <section>
        <h2>About Us</h2>
        <p>CANnected connects can donators with can collectors </p> 
        <p>to ease the return and recycling of alcoholic cans in </p>
        <p> Kingston.</p>
      </section>
      <footer>
        <p>&copy; 2025 My First Website</p>
      </footer>
    </body>
    </div>
    );
}

export default App;
