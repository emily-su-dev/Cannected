import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

function Collections() {
    const [users, setUsers] = useState([]);
    const [userLocation, setUserLocation] = useState(null);  // Store current user location
    const [addressRevealed, setAddressRevealed] = useState({}); // To track which user's address is revealed
    const [distances, setDistances] = useState({}); // Store distances for each user based on their id
    const [closestUser, setClosestUser] = useState(null);  // Store the closest user
    const [showMapFlag, setShowMapFlag] = useState(false);  // Flag to display map
    const [showDoneButton, setShowDoneButton] = useState(false); // Track if Done button is visible
    const [claimButtonVisible, setClaimButtonVisible] = useState(true); // Track if claim button is visible

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
                const loggedUser = JSON.parse(localStorage.getItem('user'));  // Get logged-in user from localStorage

                const response = await fetch('/api/users/postings', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: loggedUser.email }),  // Send logged-in user's email in the body
                });

                const data = await response.json();
                setUsers(data.users);

                let closestDistance = Infinity; // To store the smallest distance
                let closestUser = null;  // To store the user with the smallest distance

                // Loop through all users to calculate the distance and find the closest one
                for (let user of data.users) {
                    const donationAddress = user.address;
                    if (donationAddress) {
                        try {
                            // Get latitude and longitude for the donation address
                            const destinationCoords = await getCoordinatesFromAddress(donationAddress);
                            const userLatLng = { lat: userLocation.latitude, lng: userLocation.longitude };

                            calculateDistance(userLatLng, destinationCoords)
                                .then(({ distance, duration }) => {
                                    setDistances((prevDistances) => ({
                                        ...prevDistances,
                                        [user._id]: { distance, duration },
                                    }));
                                })
                                .catch((error) => console.error(error));

                            // Calculate the distance between the current user's location and the destination
                            const { distance } = await calculateDistance(userLatLng, destinationCoords);

                            // Compare to find the closest distance
                            const numericalDistance = parseFloat(distance.replace(' km', ''));  // Parse the distance to a number
                            if (numericalDistance < closestDistance) {
                                closestDistance = numericalDistance;  // Update the closest distance
                                closestUser = user;  // Update the closest user
                            }
                        } catch (error) {
                            console.error('Error getting coordinates from address:', error);
                        }
                    }
                }

                // Set the closest user to the state
                setClosestUser(closestUser);  // This will store the closest user
            }

            fetchUsers();  // Call fetchUsers when userLocation is available
        } else {
            console.log("Waiting for user location...");
        }
    }, [userLocation]);  // Depend on userLocation to ensure we have the location


    // Function to show the map with closest user's address
    const showMap = async (address) => {
        const geocoder = new google.maps.Geocoder();
        try {
            const latLng = await new Promise((resolve, reject) => {
                geocoder.geocode({ address: address }, (results, status) => {
                    if (status === "OK") {
                        resolve(results[0].geometry.location);
                    } else {
                        reject("Could not find location");
                    }
                });
            });

            const { Map } = await google.maps.importLibrary("maps");
            const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

            const map = new Map(document.getElementById("map"), {
                center: latLng,
                zoom: 16,
                mapId: "MAP1",
            });

            const marker = new AdvancedMarkerElement({
                map,
                position: latLng,
            });
        } catch (error) {
            console.error(error);
        }
    };

    const handleClaimClick = async () => {
        if (closestUser) {
            // Update the user's numberOfCans to 0 in the backend
            try {
                const response = await fetch(`/api/users/${closestUser._id}/update-cans`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ numberOfCans: 0 }),  // Set the numberOfCans to 0
                });

                if (!response.ok) {
                    throw new Error('Failed to update number of cans');
                }

                // Update state
                setAddressRevealed(prevState => ({
                    ...prevState,
                    [closestUser._id]: !prevState[closestUser._id]
                }));
                setShowMapFlag(true); // Show the map after claiming
                setShowDoneButton(true); // Show the Done button after claiming
                setClaimButtonVisible(false); // Hide claim button after clicking it

                // Call the function to show the map
                showMap(closestUser.address);
            } catch (error) {
                console.error('Error updating numberOfCans:', error);
            }
        }
    };

    const navigate = useNavigate();

    const handleDoneClick = () => {
        navigate('/profile');  // Navigate to the profile page when Done is clicked
    };

    return (
        <div>
            <h1>Closest Available Donation</h1>
            {closestUser ? (
                <div>
                    <h2>From {closestUser.username}: {closestUser.numberOfCans} cans available</h2>
                    <p>Distance: {distances[closestUser._id].distance} - Walk Time: {distances[closestUser._id].duration}</p>
                    {/* Only show Claim button if it's visible */}
                    {claimButtonVisible && (
                        <button onClick={handleClaimClick}>
                            Claim
                        </button>
                    )}

                    {addressRevealed[closestUser._id] && <p>Address: {closestUser.address}</p>}

                    {/* Display the map below */}

                    {showMapFlag && <gmp-map center="44.233334, -76.500000" zoom="14" map-id="MAP1" style="height: 400px"></gmp-map> && <div id="map" style={{ height: '400px', width: '100%' }}></div>}

                    {/* Show Done button after claiming */}
                    {showDoneButton && (
                        <button onClick={handleDoneClick}>Done</button>
                    )}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );

}

export default Collections;
