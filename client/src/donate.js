import React, { useState } from 'react';

function Donate() {
  const [numberOfCans, setNumberOfCans] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Assume user data is stored in localStorage
    const loggedUser = JSON.parse(localStorage.getItem('user'));
    
    if (loggedUser) {
      // Update the user's numberOfCans
      loggedUser.numberOfCans += numberOfCans;

      // Save the updated user object to localStorage
      localStorage.setItem('user', JSON.stringify(loggedUser));

      alert(`You donated ${numberOfCans} cans!`);
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
          onChange={(e) => setNumberOfCans(e.target.value)}
          required
        />
        <button type="submit">Submit Donation</button>
      </form>
    </div>
  );
}

export default Donate;
