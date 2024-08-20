


// export async function getUserLocation() {


//   const apiKey = '83b56bdedc8447f5819b507ac831a2c1';
//   const geocodingEndpoint = `https://api.geoapify.com/v1/geocode/reverse&apiKey=${apiKey}`;

//   try {
//     const response = await fetch(geocodingEndpoint);
//     const data = await response.json();
//     const city = data.features[0].properties.city;
//     const country = data.features[0].properties.country;
    
//     console.log(city);

//   } catch (error) {
//     console.error(`Error fetching location data: ${error instanceof Error ? error.message : 'Unknown error'}`);
//     return null; // Return null on error
//   }
// }


// getUserLocation()