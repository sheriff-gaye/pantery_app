
export function getUserLocation(): Promise<{ latitude: number; longitude: number }> {
    return new Promise((resolve, reject) => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude: number = position.coords.latitude;
                    const longitude: number = position.coords.longitude;
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



export async function getCity(): Promise<{ city: string; country: string } | null> {
    try {
        const { latitude, longitude } = await getUserLocation();

        const apiKey = '83b56bdedc8447f5819b507ac831a2c1';
        const geocodingEndpoint = `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=${apiKey}`;

        const response = await fetch(geocodingEndpoint);
        const data = await response.json();

        if (data.features && data.features.length > 0) {
            const country = data.features[0].properties.country || "Unknown country";

            return country;
        } else {
            throw new Error("Location data not found");
        }
    } catch (error) {
        console.error(`Error fetching location data: ${error instanceof Error ? error.message : 'Unknown error'}`);
        return null;
    }
}

getCity()