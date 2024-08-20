export function getUserLocation() {
  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          console.log("Latitude:", latitude, "Longitude:", longitude);
          resolve({ latitude, longitude });
        },
        (error) => {
          reject(`Geolocation error: ${error.message}`);
        }
      );
    } else {
      reject("Geolocation is not supported by this browser.");
    }
  });
}


// getUserLocation()
//   .then((coords) => {
//     console.log("User's Location:", coords);
//   })
//   .catch((error) => {
//     console.error(error);
//   });