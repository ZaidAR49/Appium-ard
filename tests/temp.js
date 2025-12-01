import { createDriver } from "../config/capabilities.js";
import { afterSuite } from "../utils/suite-hooks.js";
import { Authentication } from "../pages/on-boarding.js";
import { logMessage } from "../utils/general.js";

async function runTest() {
  const driver = await createDriver();

  try {
    const auth = new Authentication({ optional: true });
    await driver.pause(10000);
    await auth.signUpWithEmail(driver, "DENY");
logMessage("info", "Test completed successfully");
  } finally {
    afterSuite(driver);
  }
}
runTest().catch(console.error);
