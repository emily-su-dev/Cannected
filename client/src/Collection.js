import React, { useEffect, useState } from 'react';

function Collections() {
    const [users, setUsers] = useState([]);
    const [userLocation, setUserLocation] = useState(null);  // Store current user location
    const [addressRevealed, setAddressRevealed] = useState({}); // To track which user's address is revealed
    const [distances, setDistances] = useState({}); // Store distances for each user based on their id

    useEffect(() => {
        // Check if the script is already loaded
        if (!document.querySelector('#google-maps-script')) {
            const script = document.createElement('script');
            script.id = 'google-maps-script'; // Add an ID to prevent duplicate loading
            script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAPHGXRODOE33zFmbI2l6OSgnkB9jhf8sQ&libraries=places,maps`;
            script.async = true;
            script.defer = true;
            document.head.appendChild(script);

            // Initialize Google Maps API and geolocation
            script.onload = () => {
                if (window.google) {
                    getLocation(); // Proceed with the functionality after the script is loaded
                }
            };

            return () => {
                document.head.removeChild(script); // Clean up when the component unmounts
            };
        }
    }, []);

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(logPosition);
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    }

    function logPosition(position) {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude }); // Set the current location in state
    }

    function getCoordinatesFromAddress(address) {
        return new Promise((resolve, reject) => {
            if (window.google) {
                const geocoder = new google.maps.Geocoder();
                geocoder.geocode({ address: address }, (results, status) => {
                    if (status === 'OK' && results[0]) {
                        // Geocoding successful, extract lat/lng
                        const latLng = results[0].geometry.location;
                        resolve({ lat: latLng.lat(), lng: latLng.lng() });
                    } else {
                        reject('Geocode failed: ' + status);
                    }
                });
            } else {
                reject('Google maps not loaded');
            }
        });
    }


    function calculateDistance(currPos, destination) {
        console.log("Current Position (Latitude, Longitude):", currPos.lat, currPos.lng);
        console.log("Destination Position (Latitude, Longitude):", destination.lat, destination.lng);


        return new Promise((resolve, reject) => {
            if (window.google && destination && currPos) {  // Ensure google object is available and both positions are valid
                const service = new google.maps.DistanceMatrixService();
                service.getDistanceMatrix(
                    {
                        origins: [{ lat: parseFloat(currPos.lat), lng: parseFloat(currPos.lng) }], // Ensure lat/lng are numbers
                        destinations: [{ lat: parseFloat(destination.lat), lng: parseFloat(destination.lng) }], // Ensure lat/lng are numbers
                        travelMode: 'WALKING',
                        unitSystem: google.maps.UnitSystem.METRIC
                    },
                    (response, status) => {
                        if (status === 'OK') {
                            const distance = response.rows[0].elements[0].distance.text;
                            const duration = response.rows[0].elements[0].duration.text;
                            resolve({ distance, duration });
                        } else {
                            reject('Error calculating distance');
                        }
                    }
                );
            } else {
                reject('Invalid destination or google maps not loaded');
            }
        });
    }

    useEffect(() => {
        if (userLocation) {
            async function fetchUsers() {
                const loggedUser = JSON.parse(localStorage.getItem('user'));

                const response = await fetch('/api/users/postings', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: loggedUser.email }),
                });

                const data = await response.json();
                setUsers(data.users);

                // Calculate distance for each user
                data.users.forEach(async (user) => {
                    const donationAddress = user.address;

                    if (donationAddress) {
                        try {
                            // Get latitude and longitude for the donation address
                            const destinationCoords = await getCoordinatesFromAddress(donationAddress);
                            const userLatLng = { lat: userLocation.latitude, lng: userLocation.longitude };

                            // Now calculate distance
                            calculateDistance(userLatLng, destinationCoords)
                                .then(({ distance, duration }) => {
                                    setDistances((prevDistances) => ({
                                        ...prevDistances,
                                        [user._id]: { distance, duration },
                                    }));
                                })
                                .catch((error) => console.error(error));
                        } catch (error) {
                            console.error('Error getting coordinates from address:', error);
                        }
                    }
                });
            }

            fetchUsers();
        } else {
            console.log("Waiting for user location...");
        }
    }, [userLocation]);  // Depend on userLocation to ensure we have the location

    const handleClaimClick = (userId) => {
        // Toggle address visibility when "Claim" button is clicked
        setAddressRevealed(prevState => ({
            ...prevState,
            [userId]: !prevState[userId]
        }));
    };

    return (
        <div>
            <h1>Closest Available Donation</h1>
            {users.length > 0 && userLocation ? (
                <div>
                    {users
                        .filter(user => user.numberOfCans > 0 && user.email !== JSON.parse(localStorage.getItem('user')).email)
                        .map(user => {
                            const donationAddress = user.address;

                            return (
                                <div key={user._id}>
                                    <p>{user.username} - {user.numberOfCans} cans available</p>

                                    {/* Show distance */}
                                    {distances[user._id] ? (
                                        <p>Distance: {distances[user._id].distance} - Walk Time: {distances[user._id].duration}</p>
                                    ) : (
                                        <p>Calculating distance...</p>
                                    )}

                                    {/* Show address only after claiming */}
                                    <button onClick={() => handleClaimClick(user._id)}>
                                        {addressRevealed[user._id] ? 'Hide Address' : 'Claim'}
                                    </button>

                                    {addressRevealed[user._id] && <p>Address: {donationAddress}</p>}
                                </div>
                            );
                        })}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default Collections;
