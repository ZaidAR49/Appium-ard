import { app } from "../config/capabilities.js";

export async function afterSuite(driver) {
  console.log("Test completed,Bye!");
  console.log("Ending session, closing app ...");
  console.log(`test ended at: ${new Date().toISOString()}`);
  try {
    //await driver.deleteSession();
  } catch (err) {
    console.error("Error closing driver:", err);
  }
}

