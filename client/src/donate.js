import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // To navigate after submission

function Donate() {
  const [numberOfCans, setNumberOfCans] = useState(0);
  const navigate = useNavigate();  // For navigation

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Assume user data is stored in localStorage
    const loggedUser = JSON.parse(localStorage.getItem('user'));
    
    if (loggedUser) {
      // Check if the numberOfCans is greater than 0
      if (numberOfCans <= 0) {
        alert('You need to donate at least 1 can!');
        return;
      }

      try {
        // Send a PUT request to update the number of cans in the backend
        const response = await fetch(`/api/users/${loggedUser._id}/donate`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ numberOfCans }),  // Sending the donation info to backend
        });

        const data = await response.json();

        if (response.status === 200) {
          // On success, update the localStorage
          loggedUser.numberOfCans += numberOfCans;
          localStorage.setItem('user', JSON.stringify(loggedUser));

          alert(`You donated ${numberOfCans} cans!`);
          
          // Redirect to the profile page
          navigate('/profile');
        } else {
          alert(data.message || 'Failed to submit donation');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Failed to submit donation');
      }
    } else {
      alert('User not found');
    }
  };

  return (
    <div>
      <h1>Donate Cans</h1>
      <form onSubmit={handleSubmit}>
        <label>Number of Cans:</label>
        <input
          type="number"
          value={numberOfCans}
          onChange={(e) => setNumberOfCans(Number(e.target.value))}
          required
        />
        <button type="submit">Submit Donation</button>
      </form>
    </div>
  );
}

export default Donate;
