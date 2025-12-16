import dotenv from "dotenv";
import { createDriver } from "../config/capabilities.js";
import { setLocationByName, enableLocation } from "../utils/geo-Location.js";
import { afterSuite } from "../utils/suite-hooks.js";
import { Authentication } from "../pages/on-boarding.js";
import { Notification } from "../pages/notification.js";
dotenv.config({ path: "../.env" });

const driver = await createDriver();
const loginEmail = process.env.LOGINEMAIL;
const auth = new Authentication({ optional: true });
const notif = new Notification({ optional: true });
describe("Sign in with Google Test", async () => {
  let testPassed = false;
  it(" strat the app and setting location", async function () {
    try {
      this.timeout(60000);
      await setLocationByName("Irbid,Jordan");
      await enableLocation();
      await driver.pause(10000);
      testPassed = true;
      expect(testPassed).to.be.true;

    } catch (err) {
      console.error("Test failed in strat the app and setting location:", err);
    }
  });

  it("should Sign in with Google account", async function () {
    try {
      this.timeout(60000);
      await auth.loginWithGoogle(driver, loginEmail);

    }
    catch (err) {
      console.error("Test failed in Sign in with Google account and fill user information:", err);
    }
  });

  it("should allow notifications", async function () {
    try {
      this.timeout(60000);
      await notif.allowNotifications(driver);
    }
    catch (err) {
      console.error("Test failed in allow notifications:", err);
    }
  });

  // it("should close on-boarding screen", async function () {
  //   try {
  //     this.timeout(60000);
  //     await auth.closeOnBoardingScreen(driver);
  //   }
  //   catch (err) {
  //     console.error("Test failed in close on-boarding screen:", err);
  //   }
  // });
  after(async () => {
    await afterSuite(driver);
  })
});












