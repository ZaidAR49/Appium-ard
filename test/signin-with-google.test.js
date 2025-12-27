import dotenv from "dotenv";
import { createDriver } from "../config/capabilities.js";
import {enableLocation } from "../utils/geo-Location.js";
import { afterSuite,beforeSuite } from "../utils/suite-hooks.js";
import { Authentication } from "../pages/on-boarding.js";
import { Notification } from "../pages/notification.js";
import { takeScreenshot } from "../utils/general.js";
dotenv.config({ path: "../.env" });

let driver =null ;
const loginEmail = process.env.LOGINEMAIL;
const auth = new Authentication({ optional: true });
const notif = new Notification({ optional: true });
describe("Sign in with Google Test", async () => {
  let testPassed = false;
  before(async () => {
    await beforeSuite();
    driver = await createDriver();
    enableLocation();

  });

  it("should Sign in with Google account", async function () {
    try {
      this.timeout(60000);
      await auth.loginWithGoogle(driver, loginEmail);

    }
    catch (err) {
      takeScreenshot(driver, "signin-with-google-error.png");
      console.error("Test failed in Sign in with Google account and fill user information:", err);
    }
  });

  it("should allow notifications", async function () {
    try {
      this.timeout(60000);
      await notif.allowNotifications(driver);
    }
    catch (err) {
      takeScreenshot(driver, "allow-notifications-error.png");
      console.error("Test failed in allow notifications:", err);
    }
  });

  // it("should close on-boarding screen", async function () {
  //   try {
  //     this.timeout(60000);
  //     await auth.closeOnBoardingScreen(driver);
  //   }
  //   catch (err) {
  //     takeScreenshot(driver, "close-on-boarding-screen-error.png");
  //     console.error("Test failed in close on-boarding screen:", err);
  //   }
  // });
  after(async () => {
    await afterSuite(driver);
  })
});












