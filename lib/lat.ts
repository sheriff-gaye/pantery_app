export function getUserLocation() {
  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude:any = position.coords.latitude;
          const longitude:any = position.coords.longitude;
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


