import React from 'react';
import './home.css';
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
        <div className="home-container">
            <h1 className="home-title">Welcome to Cannected!</h1>
            <p className="home-description">Talk about problem</p>
            <div className="home-buttons-container">
                <button className="home-button" onClick={handleNavigateToLogin}>Log In</button>
                <button className="home-button" onClick={handleNavigateToSignUp}>Sign Up</button>
            </div>
        </div>

    )
}

export default Home;
