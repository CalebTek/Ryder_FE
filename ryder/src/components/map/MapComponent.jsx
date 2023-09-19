import React, { useEffect, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

function MapComponent() {
  const [map, setMap] = useState(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.REACT_APP_googleMapsKey, // Replace with your API key
      version: "weekly",
    });

    loader.load().then(() => {
      async function initMap() {
        try {
          const position = await getCurrentLocation();
          const destination = { lat: 6.27976, lng: 5.58596 };

          // Create a new Google Maps map
          const map = new window.google.maps.Map(
            document.getElementById("map"),
            {
              zoom: 8,
              center: {
                lat: (position.lat + destination.lat) / 2,
                lng: (position.lng + destination.lng) / 2,
              },
              mapId: "DEMO_MAP_ID",
            }
          );

          // Create markers for user's location and destination
          const marker = new window.google.maps.Marker({
            map: map,
            position: position,
            title: "Present Location",
          });

          const destinationMarker = new window.google.maps.Marker({
            map: map,
            position: destination,
            title: "Destination",
          });

          setMap(map);

          // Call the function to display the road route
          displayRoute(map, position, destination);
        } catch (error) {
          console.error("Error initializing map:", error);
        }
      }

      initMap();
    });
  }, []);

  // Display a road route on the map
  async function displayRoute(map, origin, destination) {
    const directionsService = new window.google.maps.DirectionsService();
    const directionsRenderer = new window.google.maps.DirectionsRenderer();

    // Set the directions renderer on the map
    directionsRenderer.setMap(map);

    // Define the route request
    const request = {
      origin: origin,
      destination: destination,
      travelMode: window.google.maps.TravelMode.DRIVING,
    };

    // Request directions and render the route
    directionsService.route(request, (result, status) => {
      if (status === window.google.maps.DirectionsStatus.OK) {
        directionsRenderer.setDirections(result);
      } else {
        console.error("Error displaying route:", status);
      }
    });
  }

  // Fetch the user's current location
  async function getCurrentLocation() {
    return new Promise((resolve) => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            resolve(userLocation);
          },
          () => {
            // Use a default location if an error occurs
            resolve({ lat: -25.344, lng: 131.031 });
          }
        );
      } else {
        // Geolocation is not available, use the default location
        resolve({ lat: -25.344, lng: 131.031 });
      }
    });
  }

  return <div id="map" style={{ width: "100%", height: "inherit" }}></div>;
}

export default MapComponent;