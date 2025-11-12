import NodeGeocoder from 'node-geocoder';

const geocoder = NodeGeocoder({ provider: 'openstreetmap' }); // free 


export async function setLocationByName(driver, placeName) {
  const res = await geocoder.geocode(placeName);
  if (!res || res.length === 0) {
    throw new Error(`Location not found: ${placeName}`);
  }

  const { latitude, longitude } = res[0];
  await driver.setGeoLocation({ latitude, longitude, altitude: 0 });
  console.log(`Location set to ${placeName} (${latitude}, ${longitude})`);
}
