import { createDriver, app } from "../config/capabilities.js";

const driver = await createDriver();

export async function afterSuite() {
  console.log("Test completed,Bye!");
  console.log("Ending session, closing app ...");
  await driver.terminateApp(app);
  await driver.deleteSession();
}
