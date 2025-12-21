import dotenv from "dotenv";
import { expect } from "chai";
import { createDriver } from "../config/capabilities.js";
import {
  
  enableLocation,

} from "../utils/geo-Location.js";
import { afterSuite,beforeSuite } from "../utils/suite-hooks.js";
import { Authentication } from "../pages/on-boarding.js";
import { Welcome } from "../pages/welcome.js";
import { Location } from "../pages/location.js";
import { Notification } from "../pages/notification.js";
import { Settings } from "../pages/setting.js";
import { logMessage } from "../utils/general.js";
dotenv.config({ path: "../.env" });

let driver =null ;
const signupEmail = process.env.SIGNUPEMAIL;

const auth = new Authentication({ optional: true });
const welcome = new Welcome();
const location = new Location({ optional: true });
const notif = new Notification({ optional: true });

describe("Signup with Google Test", async () => {


before(async () => {
    await beforeSuite();
    driver = await createDriver();
    enableLocation();

  });


  it("should Sign up with Google account and fill user information", async function () {
    try {
      this.timeout(60000);
      await auth.signUpWithGoogle(driver, signupEmail, "DENY", "Zaid Radaideh");

    }
    catch (err) {
      console.error("Test failed in Sign up with Google account and fill user information:", err);
      expect.fail("Sign up with Google account and fill user information failed");
    }
  });

  it(" should skip welcome screen", async function () {
    try {
      this.timeout(60000);
      await welcome.skipWelcomeScreen(driver);
    }
    catch (err) {
      console.error("Test failed in skip welcome screen:", err);
      expect
    }
  });
  it("selected location automatically", async function () {
    try {
      this.timeout(60000);
      await location.selectLocationAutomatically(driver, "Irbid");
    }
    catch (err) {
      console.error("Test failed in selected location automatically:", err);
      expect.fail("selected location automatically failed");
    }
  });

  it("allow notifications", async function () {
    try {
      this.timeout(60000);
      await notif.allowNotifications(driver);
    }
    catch (err) {
      console.error("Test failed in allow notifications:", err);
      expect.fail("allow notifications failed");
    }
  });

  // it("colse the on-boarding screen", async function () {
  //   try {
  //     this.timeout(60000);
  //     auth.closeOnBoardingScreen(driver);
  //   }
  //   catch (err) {
  //     console.error("Test failed in colse the on-boarding screen:", err);
  //     expect.fail("colse the on-boarding screen failed");
  //   }
  // });



  after(async () => {
    console.log("after suite");
    try {
let pass=false;
      const settings = new Settings();
      await settings.deleteAccount(driver);
      logMessage("success", "delete the created account");
      pass=true;
      expect(pass).to.be.true;
    } catch (err) {
      console.error("Test failed in delete the created account:", err);
      expect.fail("delete the created account failed");
    }
    await afterSuite(driver);
  })

});


