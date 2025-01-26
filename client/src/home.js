import React from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';
import LoginButton from './auth0Login';

function Home() {
    const navigate = useNavigate(); 
    const handleNavigateToLogin = () => {
        navigate("/login");
      };

    return (
        <div className="App">
            <h1>Welcome to Cannected!</h1>
            <p class="description">Talk about problem</p>

            <button onClick={handleNavigateToLogin}>Log In</button>
        </div>
    )
}

export default Home;
