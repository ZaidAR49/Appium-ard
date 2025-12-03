import dotenv from "dotenv";
import { MailSlurp } from "mailslurp-client";
import { logMessage } from "./general.js";
dotenv.config({ path: "../.env" });

export class FakeEmail {


    constructor() {
        this.mailSlurp = new MailSlurp({ apiKey: process.env.MailSlurpAPIKey });
    }
    async getInbox() {
        return await this.mailSlurp.createInbox();
    }
    async getOTP(inboxID) {
        const emailMessage = await this.mailSlurp.waitForLatestEmail(inboxID, 30_000);
        if (!emailMessage) {
            throw new Error("No email received within the timeout period");
        }
        logMessage("info", emailMessage);
        const otp = this.extractOtp(emailMessage.body);
        logMessage("info", `Extracted OTP: ${otp}`);
        if (!otp) {
            throw new Error("OTP could not be extracted from the email body");

        }
        return otp;
    }

    extractOtp(emailBody) {
        if (!emailBody || typeof emailBody !== "string") return null;
        const otpRegex = /\b(\d{4,8})\b/;
        const match = emailBody.match(otpRegex);
        return match ? match[1] : null;
    }


}

export function getOTP() {

}