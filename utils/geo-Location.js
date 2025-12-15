import NodeGeocoder from "node-geocoder";
import { exec } from "child_process";
import { promisify } from "util";
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
const execAsync = promisify(exec);

export async function setLocationByName(placeName) {
  try {
    //console.log("API Key:", process.env.LOCATIONIQAPI);

    const geocoder = NodeGeocoder({
      provider: 'locationiq',
      apiKey: process.env.LOCATIONIQAPI,
    });

    const results = await geocoder.geocode(placeName);
    if (!results || results.length === 0) {
      throw new Error("Place not found: " + placeName);
    }

    const { latitude, longitude, altitude = 0 } = results[0];

    const cmd = `adb shell am broadcast -a io.appium.settings.location -e latitude ${latitude} -e longitude ${longitude} -e altitude ${altitude}`;
    await execAsync(cmd);

    console.log(`Successfully set location to ${placeName} (${latitude}, ${longitude})`);
  } catch (err) {
    console.error("Failed to set location:", err.message);
    throw err;
  }
}

// export function getDeviceLocation() {
//   return new Promise((resolve, reject) => {
//     exec("adb shell dumpsys location", (err, stdout) => {
//       if (err) return reject(err);

//       const match = stdout.match(
//         /gps\[.*?([0-9]+\.[0-9]+),\s*([0-9]+\.[0-9]+)/
//       );
//       if (!match) return reject("No location found");

//       resolve({
//         latitude: parseFloat(match[1]),
//         longitude: parseFloat(match[2]),
//       });
//     });
//   });
// }


export async function enableLocation() {
  try {
    await execAsync("adb shell cmd location set-location-enabled true");
    console.log("Location service enabled.");
  } catch (err) {
    console.error("Failed to enable location:", err.message);
    throw err;
  }
}


export async function disableLocation() {
  try {
    await execAsync("adb shell cmd location set-location-enabled false");
    console.log("Location service disabled.");
  } catch (err) {
    console.error("Failed to disable location:", err.message);
    throw err;
  }
}

