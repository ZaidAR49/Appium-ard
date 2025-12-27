import { takeScreenshot } from "../utils/general.js";
import { expect } from "chai";
import { createDriver } from "../config/capabilities.js";
import {enableLocation } from "../utils/geo-Location.js";
import { afterSuite,beforeSuite } from "../utils/suite-hooks.js";
import { Authentication } from "../pages/on-boarding.js";
import { Location } from "../pages/location.js";
import { Notification } from "../pages/notification.js";


//const location = "Irbid,Jordan";
const auth = new Authentication({ optional: true });
const notif = new Notification({ optional: true });
const location = new Location({ optional: true });
let driver =null ;
describe("Continue as Guest Test", async () => {
  before(async () => {
    await beforeSuite();
    driver = await createDriver();
    enableLocation();

  });

  it("should continue as guest", async function () {
    try {
      this.timeout(60000);
      await auth.continueAsGuest(driver);
    } catch (err) {
takeScreenshot(driver, "continue-as-guest-error.png");
      console.error("Test failed in continue as guest:", err);
      expect.fail("continue as guest failed");
    }
  });
  it("should select location automatically", async function () {
    try {
      this.timeout(60000);
      await location.selectLocationAutomatically(driver, "Irbid");
    } catch (err) {
      takeScreenshot(driver, "select-location-automatically-error.png");
      console.error("Test failed in select location automatically:", err);
      expect.fail("select location automatically failed");
    }
  });

  it("should allow notifications", async function () {
    try {
      this.timeout(60000);
      await notif.allowNotifications(driver);
    } catch (err) {
      takeScreenshot(driver, "allow-notifications-error.png");
      console.error("Test failed in allow notifications:", err);
      expect.fail("allow notifications failed");
    }
  });

  // it("should close on-boarding screen", async function () {
  //   try {
  //     this.timeout(60000);
  //     await auth.closeOnBoardingScreen(driver);
  //   } catch (err) {
  //     takeScreenshot(driver, "close-on-boarding-screen-error.png");
  //     console.error("Test failed in close on-boarding screen:", err);
  //     expect.fail("close on-boarding screen failed");
  //   }
  // });
  after(() => {
    afterSuite(driver);
  });
});
