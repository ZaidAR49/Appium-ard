import dotenv from "dotenv";
import { MailSlurp } from "mailslurp-client";
import { logMessage } from "./general.js";
import imap from "imap-simple";
import { simpleParser } from "mailparser";
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
        const otp = extractOtp(emailMessage.body);
        logMessage("info", `Extracted OTP: ${otp}`);
        if (!otp) {
            throw new Error("OTP could not be extracted from the email body");

        }
        return otp;
    }


}

export async function getLoginOTP() {
    const emailAddress = process.env.LOGINEMAIL;
    const appPassword = process.env.GMAIL_APP_PASSWORD;
    const gmailLabel = process.env.GMAIL_LABEL;
    if (emailAddress === undefined || appPassword === undefined || gmailLabel === undefined) {
        throw new Error("Email address or app password or gmail label is not defined");
    }
    logMessage("info", emailAddress);
    logMessage("info", appPassword);
    logMessage("info", gmailLabel);
    const config = {
        imap: {
            user: emailAddress,
            password: appPassword,
            host: "imap.gmail.com",
            port: 993,
            tls: true,
            authTimeout: 3000,
            tlsOptions: { rejectUnauthorized: false }
        }
    };
    try {
        logMessage("info", "Connecting to IMAP server ...");
        const connection = await imap.connect(config);
        logMessage("success", "Connected to IMAP server");
        await connection.openBox(gmailLabel);
        // fetters
        const searchCriteria = ["UNSEEN"];
        const fetchOptions = { bodies: ["HEADER", "TEXT", ""], markSeen: true };
        const results = await connection.search(searchCriteria, fetchOptions);
        if (results.length === 0 || !results) {
            logMessage("error", "No email received");
            await connection.end();
            return null;
        }
        const latest = results.sort((a, b) => b.attributes.date - a.attributes.date)[0];
        const raw = latest.parts.find(p => p.which === "").body;
        const parsed = await simpleParser(raw);
        const emailBody = parsed.text || parsed.html || "";
        logMessage("info", emailBody);
        const otp = extractOtp(emailBody);
        if (!otp) {
            throw new Error("OTP could not be extracted from the email body");

        }
        await connection.end();
        return otp;

    }
    catch (error) {
        console.error("Error in getLoginOTP:", error);
        throw new Error("Failed to connect to IMAP server");
    }

}

function extractOtp(emailBody) {
    if (!emailBody || typeof emailBody !== "string") return null;
    const otpRegex = /\b(\d{4,8})\b/;
    const match = emailBody.match(otpRegex);
    return match ? match[1] : null;
}