import { expect } from "chai";
import { createDriver } from "../config/capabilities.js";
import { afterSuite,beforeSuite } from "../utils/suite-hooks.js";
import { Authentication } from "../pages/on-boarding.js";
import { elementExists, waitAndClick, waitAndType } from "../utils/element-actions.js";
import { enableLocation } from "../utils/geo-Location.js";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

const auth = new Authentication({ optional: true });
let driver =null ;

describe("Name length test", async () => {

    before(async () => {
    await beforeSuite();
    driver = await createDriver();
    enableLocation();

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