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
            <p className="home-description">In Kingston, alcoholic cans can be returned to where they were purchased to be properly reused or recycled; however, not every alcoholic can is recycled properly by Kingston residents. This poses a significant problem to maintaining carbon emission levels and cleanliness of the city through proper recycling. Moreover, many Kingston locals collect others' excess cans from around the city as a main form of income.  
            </p>
            <p className="home-description">To bridge this gap, CANnected gives a platform for those with excess alcoholic cans who do not or cannot recycle them properly to post their cans for pick up. Can collectors can check the website and see posted can pickups within their area to help centralize and ease their search. CANnected's main purpose is for people to profit from the proper disposal of alcoholic cans and reduce improper can recycling.  
            </p>
            <p className="home-description">Sign up today to help us on our journey on the way to a greener Kingston!
            </p>
        
        </div>

    )
}

export default Home;
