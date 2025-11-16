import { app } from "../config/capabilities.js";

export async function afterSuite(driver) {
  console.log("Test completed,Bye!");
  console.log("Ending session, closing app ...");
  //await driver.terminateApp(app);
  //await driver.deleteSession();
}
