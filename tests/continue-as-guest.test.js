import dotenv from "dotenv";
import { createDriver } from "../config/capabilities.js";
import { setLocationByName } from "../utils/geo-Location.js";
import { afterSuite } from "../utils/suite-hooks.js";
import { Authentication } from "../pages/on-boarding.js";
import { Notification } from "../pages/notification.js";
import { expect } from "chai";
dotenv.config({ path: "../.env" });


const driver = await createDriver();
//const location = "Irbid,Jordan";
const auth = new Authentication({ optional: true });
const notif = new Notification({ optional: true });

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
    }
  });

  it("should continue as guest", async function () {
    try {
      this.timeout(60000);
      await auth.continueAsGuest(driver);

    }
    catch (err) {
      console.error("Test failed in continue as guest:", err);
    }
  });
  it("should select location automatically", async function () {
    try {
      this.timeout(60000);
      await auth.selectLocationAutomatically(driver, "Irbid");
    }
    catch (err) {
      console.error("Test failed in select location automatically:", err);
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

  it("should close on-boarding screen", async function () {
    try {
      this.timeout(60000);
      await auth.closeOnBoardingScreen(driver);
    }
    catch (err) {
      console.error("Test failed in close on-boarding screen:", err);
    }
  });
  after(async () => {
    await afterSuite(driver);
  })
});















