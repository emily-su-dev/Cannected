import React from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate(); 
    const handleNavigateToLogin = () => {
        navigate("/login");
      };
      const handleNavigateToSignUp = () => {
        navigate("/signup");
      };

    return (
        <div className="App">
            <h1>Welcome to Cannected!</h1>
            <p class="description">Talk about problem</p>

            <button onClick={handleNavigateToLogin}>Log In</button>
            <button onClick={handleNavigateToSignUp}>Sign Up</button>

        </div>
    )
}

export default Home;
