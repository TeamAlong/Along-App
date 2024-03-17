// export const reverseGeocode = async (latitude, longitude, setUserAddress) => {
//     const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY; 
//     const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
  
//     console.log(`Attempting to reverse geocode for coordinates: ${latitude}, ${longitude}`);
  
//     try {
//       const response = await fetch(url);
//       const data = await response.json();
//       console.log('Received response from Geocoding API:', data);
  
//       if (data.status === 'OK') {
//         // Assuming you want the formatted address from the first result
//         const address = data.results[0].formatted_address;
//         console.log(`Found address: ${address}`);
//         setUserAddress(address);
//       } else {
//         console.error('Geocoding failed:', data.status);
//         setUserAddress('Location not found');
//       }
//     } catch (error) {
//       console.error('Error during geocoding:', error);
//       setUserAddress('Error finding location');
//     }
//   };
  
  