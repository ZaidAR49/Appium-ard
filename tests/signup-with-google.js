import dotenv from "dotenv";
import { createDriver } from "../config/capabilities.js";
import { setLocationByName } from "../utils/geo-Location.js";
import { afterSuite } from "../utils/suite-hooks.js";
//import {waitAndClick} from "../utils/wait-and-click.js";
import { Authentication } from "../pages/on-boarding.js";
import { NotificationsPremation } from "../pages/notification-permation.js";
dotenv.config({ path: "../.env" });
async function runTest() {
  const driver = await createDriver();
  const signupEmail = process.env.SIGNUPEMAIL;
  try {
    const auth = new Authentication({ optional: true });
    await setLocationByName(driver, "Irbid,Jordan");
    await driver.pause(10000);
    await auth.signUpWithGoogle(driver, signupEmail, "DENY");
    console.log("tests passed successfully");
  } finally {
    afterSuite(driver);
  }
}

runTest().catch(console.error);
