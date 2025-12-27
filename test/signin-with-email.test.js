import { expect } from "chai";
import { enableLocation } from "../utils/geo-Location.js";
import { Authentication } from "../pages/on-boarding.js";
import { Notification } from "../pages/notification.js";
import { createDriver } from "../config/capabilities.js";
import { afterSuite,beforeSuite } from "../utils/suite-hooks.js";
import { takeScreenshot } from "../utils/general.js";

let driver =null ;
const auth = new Authentication({ optional: true });
const notif = new Notification({ optional: true });

describe("Sign in with email test", async () => {

    before(async () => {
    await beforeSuite();
    driver = await createDriver();
    enableLocation();

  });


    it("should login with email", async function () {
        try {
            this.timeout(60000);

            if (process.env.LOGINEMAIL === undefined) {
                throw new Error("Login email is not defined in the environment variables");
            }

            await auth.LoginWithEmail(driver, process.env.LOGINEMAIL, "Zaid Radaideh");
        } catch (err) {
            takeScreenshot(driver, "login-with-email-error.png");
            console.error(
                "Test failed in login with email:",
                err
            );
            expect.fail(
                "login with email failed"
            );
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

    after(async () => {
        await afterSuite(driver);
    })
});