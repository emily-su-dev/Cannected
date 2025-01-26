import React, { useEffect, useState } from 'react';

function Profile() {
    const [user, setUser] = useState(null);

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

    return (
        <div>
            <h1>Welcome, {user ? user.username : 'Loading...'}!</h1>
            {/* You can also display other user details here if needed */}
        </div>
    );
}

export default Profile;
