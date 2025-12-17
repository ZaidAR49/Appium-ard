//import { app } from "../config/capabilities.js";
import { promisify } from "util";
import { exec } from "child_process";
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
export async function beforeSuite() {
  console.log("Starting the test,Hello!");
  console.log(`test started at: ${new Date().toISOString()}`);
  // clrear data before starting the app
const execAsync = promisify(exec);
  try {
    await execAsync(`adb shell pm clear ${process.env.APPID}`);
    console.log("App data cleared before starting the app.");
  } catch (err) {
    console.error("Failed to clear app data:", err.message);
  }
}

export async function afterSuite(driver) {
  console.log("Test completed,Bye!");
  console.log("Ending session, closing app ...");
  console.log(`test ended at: ${new Date().toISOString()}`);
  try {
    await driver.pause(2000);
    //await driver.terminateApp(app); // It needs the package name not the actual app
    await driver.deleteSession();
  } catch (err) {
    console.error("Error closing driver:", err);
  }
}

