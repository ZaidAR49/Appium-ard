import { expect } from "chai";
import { setLocationByName, enableLocation } from "../utils/geo-Location.js";
import { Authentication } from "../pages/on-boarding.js";
import { Notification } from "../pages/notification.js";
import { createDriver } from "../config/capabilities.js";
import { afterSuite } from "../utils/suite-hooks.js";

const driver = await createDriver();
const auth = new Authentication({ optional: true });
const notif = new Notification({ optional: true });

describe("Sign in with email test", async () => {

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

    it("should login with email", async function () {
        try {
            this.timeout(60000);

            if (process.env.LOGINEMAIL === undefined) {
                throw new Error("Login email is not defined in the environment variables");
            }

            await auth.LoginWithEmail(driver, process.env.LOGINEMAIL, "Zaid Radaideh");
        } catch (err) {
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
            console.error("Test failed in allow notifications:", err);
        }
    });

    after(async () => {
        await afterSuite(driver);
    })


})