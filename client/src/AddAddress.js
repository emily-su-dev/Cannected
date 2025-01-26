import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for routing

function AddAddress() {
    useEffect(() => {
        // Load Google Maps JavaScript API dynamically
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAPHGXRODOE33zFmbI2l6OSgnkB9jhf8sQ&libraries=places`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);

        // Initialize the autocomplete when the script is loaded
        script.onload = () => {
            if (window.google) {
                const input = document.getElementById('address');
                // Define the center for Kingston
                const center = { lat: 44.233334, lng: -76.500000 };
                const defaultBounds = {
                    north: center.lat + 0.1,   // North boundary
                    south: center.lat - 0.1,   // South boundary
                    east: center.lng + 0.1,    // East boundary
                    west: center.lng - 0.1,    // West boundary
                };

                // Apply the autocomplete functionality with bounds and address type
                const autocomplete = new window.google.maps.places.Autocomplete(input, {
                    bounds: defaultBounds,   // Restrict autocomplete to the defined bounds
                    types: ['address'],      // Restrict to address type only
                    componentRestrictions: { country: 'CA' }, // Optional: restrict to a specific country (Canada in this case)
                });

                // Listen for when a user selects an address
                autocomplete.addListener('place_changed', () => {
                    const place = autocomplete.getPlace();
                    if (place && place.formatted_address) {
                        setAddress(place.formatted_address);  // Update React state with selected address
                    }
                });
            }
        };

        return () => {
            // Clean up by removing the script tag when the component is unmounted
            document.head.removeChild(script);
        };
    }, []);

    const [address, setAddress] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Assume the user data is in localStorage
        const loggedUser = JSON.parse(localStorage.getItem('user'));

        if (loggedUser) {
            try {
                // Send a PUT request to the backend to update the user's address
                const response = await fetch(`/api/users/${loggedUser._id}/address`, {  // Ensure to send the user ID
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ address }),  // Sending the address to the backend
                });

                const data = await response.json();

                if (response.status === 200) {
                    // Successfully updated the address
                    loggedUser.address = address; // Update localStorage with the new address
                    localStorage.setItem('user', JSON.stringify(loggedUser));

                    alert('Address added successfully!');
                    navigate('/donate');  // Redirect to the donate page
                } else {
                    alert(data.message || 'Failed to update address');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Failed to update address');
            }
        } else {
            alert('User not found');
        }
    };

    return (
        <div>
            <h1>Add Your Address - This is the address that will be used when you choose to donate your cans</h1>
            <form onSubmit={handleSubmit}>
                <input
                    id="address"
                    type="text"
                    placeholder="Enter your address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default AddAddress;
