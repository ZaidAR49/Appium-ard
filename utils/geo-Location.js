import NodeGeocoder from "node-geocoder";
import { exec } from "child_process";
import { promisify } from "util";
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
const execAsync = promisify(exec);

export async function setLocationByName(
  driver,
  placeName,
) {
  try {
    console.log("the api key is :",process.env.LOCATIONIQAPI);
    await driver.updateSettings({
      allowInvisibleElements: true,
    });

const geocoder = NodeGeocoder({
  provider: 'locationiq',
  apiKey: process.env.LOCATIONIQAPI, // free 
});

const res = await geocoder.geocode("Irbid, Jordan");
// res[0].latitude, res[0].longitude


    const cmd = `adb shell am broadcast -a io.appium.settings.location -e longitude ${res.longitude} -e latitude ${res.latitude} -e altitude ${res.altitude}`;
    await execAsync(cmd);
    console.log(`Successfully set location to ${placeName}`);
  } catch (err) {
    console.error("Failed to set location:", err.message);
    throw err;
  }
}

export function getDeviceLocation() {
  return new Promise((resolve, reject) => {
    exec("adb shell dumpsys location", (err, stdout) => {
      if (err) return reject(err);

      const match = stdout.match(
        /gps\[.*?([0-9]+\.[0-9]+),\s*([0-9]+\.[0-9]+)/
      );
      if (!match) return reject("No location found");

      resolve({
        latitude: parseFloat(match[1]),
        longitude: parseFloat(match[2]),
      });
    });
  });
}
