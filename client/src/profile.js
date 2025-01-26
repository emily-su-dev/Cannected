import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for routing

function Profile() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the user data from localStorage
        const loggedUser = JSON.parse(localStorage.getItem('user'));

        if (loggedUser) {
            setUser(loggedUser); // Store the user in state
        } else {
            // If no user is found in localStorage, redirect to login page
            window.location.href = '/login'; // You can also use history.push('/login') if using React Router
        }
    }, []);

    const handleDonateClick = async () => {
        if (!user?.address) {
            // If no address, prompt the user to add one
            alert('You need to provide an address before donating.');
            navigate('/add-address');
        } else {
            const response = await fetch(`/api/users/${user._id}`);
            const data = await response.json();

            if (data.numberOfCans === 0) {
                // If number of cans is 0, allow donation
                navigate('/donate');
                // Here, you can proceed to the donation process (or navigate to another page)
            } else {
                // If number of cans is not 0, display a message and stay on the page
                alert('You cannot donate until you have 0 cans.');
            }
        }
    };

    const handleCollectClick = () => {
        // You can implement collect functionality here
        alert('Collect button clicked!');
    };

    return (
        <div>
            <h1>Welcome, {user?.username}!</h1>
            <button onClick={handleDonateClick}>Donate</button>
            <button onClick={handleCollectClick}>Collect</button>
        </div>
    );
}

export default Profile;
