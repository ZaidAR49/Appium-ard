import dotenv from "dotenv";
import { createDriver } from "../config/capabilities.js";
import {
  setLocationByName,
  enableLocation,
  getDeviceLocation,
} from "../utils/geo-Location.js";
import { afterSuite } from "../utils/suite-hooks.js";
import { Authentication } from "../pages/on-boarding.js";
import { Welcome } from "../pages/welcome.js";
import { Location } from "../pages/location.js";
import { Notifications } from "../pages/notification.js";
dotenv.config({ path: "../.env" });

const driver = await createDriver();
const signupEmail = process.env.SIGNUPEMAIL;

const auth = new Authentication({ optional: true });
const welcome = new Welcome();
const location = new Location({ optional: true });
const notif = new Notifications({ optional: true });

describe("Signup with Google Test", async () => {
  try {
    it(" strat the app and setting location", async () => {
      await setLocationByName("Irbid,Jordan");
      await enableLocation();
      await driver.pause(10000);
      expect(await getDeviceLocation()).toBeDefined();
      done();
    });

    it(" should Sign up with Google account and fill user information", async () => {
      await auth.signUpWithGoogle(driver, signupEmail, "DENY");
      done();
    });

    it(" should skip welcome screen", async () => {
      await welcome.skipWelcomeScreen(driver);
      done();
    });
    it("selected location automatically", async () => {
      await location.selectLocationAutomatically(driver, "Irbid");  
      done();
    });

    it("allow notifications", async () => {
      await notif.allowNotifications(driver);
      done();
    });

    it("colse the on-boarding screen", async () => {
      auth.closeOnBoardingScreen(driver);
      done();
    });
  } catch (err) {
    console.error("Test failed:", err);
  } finally {
    afterSuite(driver);
  }
});


