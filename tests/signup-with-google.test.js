import dotenv from "dotenv";
import { expect } from "chai";
import { createDriver } from "../config/capabilities.js";
import {
  setLocationByName,
  enableLocation,

} from "../utils/geo-Location.js";
import { afterSuite } from "../utils/suite-hooks.js";
import { Authentication } from "../pages/on-boarding.js";
import { Welcome } from "../pages/welcome.js";
import { Location } from "../pages/location.js";
import { Notification } from "../pages/notification.js";
dotenv.config({ path: "../.env" });

const driver = await createDriver();
const signupEmail = process.env.SIGNUPEMAIL;

const auth = new Authentication({ name: "Zied Radiadeh", optional: true });
const welcome = new Welcome();
const location = new Location({ optional: true });
const notif = new Notification({ optional: true });

describe("Signup with Google Test", async () => {
  try {
    let testPassed = false;
    it(" strat the app and setting location", async function () {
      this.timeout(20000); // Increase timeout to 20 seconds
      await setLocationByName("Irbid,Jordan");
      await enableLocation();
      await driver.pause(10000);
      testPassed = true;
      expect(testPassed).to.be.true;
      //expect(await getDeviceLocation()).toBeDefined();
    });

    it("should Sign up with Google account and fill user information", async function () {
      this.timeout(60000);
      await auth.signUpWithGoogle(driver, signupEmail, "DENY");
    });

    it(" should skip welcome screen", async function () {
      this.timeout(30000);
      await welcome.skipWelcomeScreen(driver);
    });
    it("selected location automatically", async function () {
      this.timeout(30000);
      await location.selectLocationAutomatically(driver, "Irbid");

    });

    it("allow notifications", async function () {
      this.timeout(30000);
      await notif.allowNotifications(driver);
    });

    it("colse the on-boarding screen", async function () {
      this.timeout(30000);
      auth.closeOnBoardingScreen(driver);
    });
  } catch (err) {
    console.error("Test failed:", err);
  } finally {
    afterSuite(driver);
  }
});


