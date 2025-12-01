import dotenv from "dotenv";
import { expect } from "chai";
import { createDriver } from "../config/capabilities.js";
import { setLocationByName, enableLocation } from "../utils/geo-Location.js";
import { afterSuite } from "../utils/suite-hooks.js";
import { Authentication } from "../pages/on-boarding.js";
import { Location } from "../pages/location.js";
import { Notification } from "../pages/notification.js";

const driver = await createDriver();
//const location = "Irbid,Jordan";
const auth = new Authentication({ optional: true });
const notif = new Notification({ optional: true });
const location = new Location({ optional: true });

describe("Continue as Guest Test", async () => {
  it(" strat the app and setting location", async function () {
    let testPassed = false;
    try {
      this.timeout(60000);
      await setLocationByName("Irbid,Jordan");
      await enableLocation();
      await driver.pause(10000);
      testPassed = true;
      expect(testPassed).to.be.true;
    } catch (err) {
      console.error("Test failed in strat the app and setting location:", err);
      expect.fail("strat the app and setting location failed");
    }
  });

  it("should continue as guest", async function () {
    try {
      this.timeout(60000);
      await auth.continueAsGuest(driver);
    } catch (err) {
      console.error("Test failed in continue as guest:", err);
      expect.fail("continue as guest failed");
    }
  });
  it("should select location automatically", async function () {
    try {
      this.timeout(60000);
      await location.selectLocationAutomatically(driver, "Irbid");
    } catch (err) {
      console.error("Test failed in select location automatically:", err);
      expect.fail("select location automatically failed");
    }
  });

  it("should allow notifications", async function () {
    try {
      this.timeout(60000);
      await notif.allowNotifications(driver);
    } catch (err) {
      console.error("Test failed in allow notifications:", err);
      expect.fail("allow notifications failed");
    }
  });

  it("should close on-boarding screen", async function () {
    try {
      this.timeout(60000);
      await auth.closeOnBoardingScreen(driver);
    } catch (err) {
      console.error("Test failed in close on-boarding screen:", err);
      expect.fail("close on-boarding screen failed");
    }
  });
  after(() => {
    afterSuite(driver);
  });
});
