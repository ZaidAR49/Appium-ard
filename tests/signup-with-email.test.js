import dotenv from "dotenv";
import { expect } from "chai";
import { createDriver } from "../config/capabilities.js";
import { setLocationByName, enableLocation } from "../utils/geo-Location.js";
import { afterSuite } from "../utils/suite-hooks.js";
import { Authentication } from "../pages/on-boarding.js";
import { Welcome } from "../pages/welcome.js";
import { Location } from "../pages/location.js";
import { Notification } from "../pages/notification.js";
import { Settings } from "../pages/setting.js";
import { logMessage } from "../utils/general.js";

dotenv.config({ path: "../.env" });

const driver = await createDriver();

const auth = new Authentication({ name: "Zied Radiadeh", optional: true });
const welcome = new Welcome();
const location = new Location({ optional: true });
const notif = new Notification({ optional: true });

describe("Signup with Google Test", async () => {
  it(" strat the app and setting location", async function () {
    try {
      let testPassed = false;
      this.timeout(20000); // Increase timeout to 20 seconds
      await setLocationByName("Irbid,Jordan");
      await enableLocation();
      await driver.pause(10000);
      testPassed = true;
      expect(testPassed).to.be.true;
      //expect(await getDeviceLocation()).toBeDefined();
    } catch (err) {
      console.error("Test failed in strat the app and setting location:", err);
      expect.fail("strat the app and setting location failed");
    }
  });

  it("should Sign up with email and fill user information", async function () {
    try {
      this.timeout(60000);
      await auth.signUpWithEmail(driver, "DENY");
    } catch (err) {
      console.error(
        "Test failed in Sign up with Google account and fill user information:",
        err
      );
      expect.fail(
        "Sign up with Google account and fill user information failed"
      );
    }
  });

  it(" should skip welcome screen", async function () {
    try {
      this.timeout(60000);
      await welcome.skipWelcomeScreen(driver);
    } catch (err) {
      console.error("Test failed in skip welcome screen:", err);
      expect;
    }
  });
  it("selected location automatically", async function () {
    try {
      this.timeout(60000);
      await location.selectLocationAutomatically(driver, "Irbid");
    } catch (err) {
      console.error("Test failed in selected location automatically:", err);
      expect.fail("selected location automatically failed");
    }
  });

  it("allow notifications", async function () {
    try {
      this.timeout(60000);
      await notif.allowNotifications(driver);
    } catch (err) {
      console.error("Test failed in allow notifications:", err);
      expect.fail("allow notifications failed");
    }
  });

  it("colse the on-boarding screen", async function () {
    try {
      this.timeout(60000);
      auth.closeOnBoardingScreen(driver);
    } catch (err) {
      console.error("Test failed in colse the on-boarding screen:", err);
      expect.fail("colse the on-boarding screen failed");
    }
  });

  after(async () => {
    console.log("after suite");
    try {
      const settings = new Settings();
      await settings.deleteAccount(driver);
      logMessage("success", "delete the created account");
    } catch (err) {
      console.error("Test failed in delete the created account:", err);
      expect.fail("delete the created account failed");
    }
    await afterSuite(driver);
  });
});
