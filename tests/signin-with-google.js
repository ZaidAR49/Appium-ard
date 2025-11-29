import dotenv from "dotenv";
import { createDriver } from "../config/capabilities.js";
import { setLocationByName } from "../utils/geo-Location.js";
import { afterSuite } from "../utils/suite-hooks.js";
import { Authentication } from "../pages/on-boarding.js";
import { Notification } from "../pages/notification.js";
dotenv.config({ path: "../.env" });
async function runTest() {
  const driver = await createDriver();
  const loginEmail = process.env.LOGINEMAIL;
  const location = "Irbid,Jordan";
  console.log("loginEmail:", loginEmail);
  try {
    const auth = new Authentication({ optional: true });
    const notif = new Notification({ optional: true });
    await setLocationByName(location);
    await driver.pause(10000);

    await auth.loginWithGoogle(driver, loginEmail);

    notif.allowNotifications(driver);
    auth.closeOnBoardingScreen(driver);
    //console.log("tests passed successfully");
  } finally {
    afterSuite(driver);
  }
}

runTest().catch(console.error);
