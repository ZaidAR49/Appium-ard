import NodeGeocoder from 'node-geocoder';

const geocoder = NodeGeocoder({
  provider: 'openstreetmap',
  timeout: 15000, // Increased timeout to 15 seconds
});

export async function setLocationByName(driver, placeName) {
  try {
    const res = await geocoder.geocode(placeName);

    if (!res?.length) {
      throw new Error(`Location not found: ${placeName}`);
    }

    const { latitude, longitude } = res[0];

    await driver.setGeoLocation({
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      altitude: 0,
    });

    console.log(
      `Location set to: ${placeName} (${latitude.toFixed(5)}, ${longitude.toFixed(5)})`
    );
  } catch (err) {
    console.error("Failed to set location:", err.message);
    throw err;
  }
}
