import { expect } from "chai";
import { createDriver } from "../config/capabilities.js";
import { afterSuite } from "../utils/suite-hooks.js";
import { Authentication } from "../pages/on-boarding.js";
import { elementExists, waitAndClick, waitAndType } from "../utils/element-actions.js";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
const driver = await createDriver();
const auth = new Authentication({ optional: true });

describe("Name length test", async () => {

    it("start the app and setting location", async function () {
        try {
            let testPassed = false;
            this.timeout(20000); // Increase timeout to 20 seconds
            await driver.pause(10000);
            testPassed = true;
            expect(testPassed).to.be.true;

        } catch (err) {
            console.error("Test failed in strat the app and setting location:", err);
            expect.fail("strat the app and setting location failed");
        }
    });

    it("Sign up with google abd fill user data", async function () {
        try {
            this.timeout(60000);
            if (!process.env.SIGNUPEMAIL) {
                expect.fail("SIGNUPEMAIL is not defined");
            }

            await auth.signUpWithGoogle(driver, process.env.SIGNUPEMAIL, "DENY", "zi");
            driver.pause(5000);


        } catch (err) {
            console.error("Test failed in sign up with email:", err);
            expect.fail("sign up with email failed");
        }
    });
    it("sould not allow to sign up with name length less than 3", async function () {
        try {
            this.timeout(30000);
            const flag = await elementExists(driver, auth.continueBtn);
            expect(flag).to.be.true;


        } catch (err) {

            expect.fail(" Something went wrong and in 'sould not allow to sign up with name length less than 3' test");
        }
    })

    it("sould not allow to sign up with name length more than 20", async function () {
        try {
            await waitAndClick(driver, auth.fullNameField);
            await waitAndType(driver, auth.fullNameField, "name are more than 20 chars");
            await driver.pause(2000);
            await auth.clickOnCountueBtn(driver);
            await driver.pause(5000);
            const flag = await elementExists(driver, auth.continueBtn);
            expect(flag).to.be.true;


        } catch (err) {

            expect.fail(" Something went wrong and in 'sould not allow to sign up with name length more than 20' test");
        }
    })
    after(async () => {
        await afterSuite(driver);
    })
})