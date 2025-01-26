import React from 'react';
import './home.css';
import { useNavigate } from 'react-router-dom';
import logo from './assets/cannected_logo_final.png';

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
            <div className="logo-container">
                <img src={logo} alt="Logo" className="logo" />
            </div>
            <h1 className="home-title">Welcome to Cannected!</h1>
            <div className="home-buttons-container">
                <button className="home-button" onClick={handleNavigateToLogin}>Log In</button>
                <button className="home-button" onClick={handleNavigateToSignUp}>Sign Up</button>
            </div>
            <p className="home-description">CANnected provides a platform for those with excess cans who do not or cannot recycle them properly to post cans for pick-up. Can collectors can check for posted can pick-ups within their area to help centralize and ease their search.
            </p>
        
        </div>

    )
}

export default Home;
