import { waitAndClick, waitAndType } from "../utils/element-actions.js";
import { Location } from "./location.js";
import { logMessage } from "../utils/general.js";
import  dotenv  from "dotenv";
import { MailSlurp } from "mailslurp-client";
import { extractOtp } from "../utils/otp-extractor.js";
dotenv.config({ path: "../.env" });
export class Authentication {
  // #region attributes
  //region variables
  name;
  //#region Buttons
  xbtn = '-android uiautomator:new UiSelector().descriptionContains("Close")';
  continueAsGuestBtn = "accessibility id:Continue as Guest";
  login_signupBtn = "accessibility id:Login/Signup";
  continueWithGoogleBtn = "accessibility id:Continue with Google";
  accountOption = '-android uiautomator:new UiSelector().text("email")';
  continueBtn = "accessibility id:Continue";
  signUpBtn = "accessibility id:Sign Up";
  // #endregion

  //#region Fields
  emailField = "class name:android.widget.EditText";
  fullNameField = "class name:android.widget.EditText";
  countryField = `-android uiautomator:new UiSelector().className(\"android.view.View\").instance(8)`;
  // Sign up via email
  fullNameField_2='-android uiautomator:new UiSelector().className("android.widget.EditText").instance(0)';
  emailField_2='-android uiautomator:new UiSelector().className("android.widget.EditText").instance(1)';
  countryField_2='-android uiautomator:new UiSelector().className("android.view.View").instance(9)';
  // #endregion
  // endregion
  // #region classes
  Location = null;
  //endregion
  // #endregion
  constructor(name = "Zied Radiadeh", optional = true) {
    logMessage("info", "Authentication");
    this.Location = new Location({ optional });
    this.name = name;
  }

  //#region Methods
  async continueAsGuest(driver) {
    logMessage("info", "continueAsGuest");
    await waitAndClick(driver, this.continueAsGuestBtn, 5000);
  }
  async loginWithGoogle(driver, emailaddress) {
    logMessage("info", "loginWithGoogle");
    await waitAndClick(driver, this.login_signupBtn, 5000);
    await waitAndClick(driver, this.continueWithGoogleBtn, 5000);
    await waitAndClick(
      driver,
      this.accountOption.replace("email", emailaddress),
      5000
    );
  }
  async LoginWithEmail(driver, emailaddress) {
    await waitAndClick(driver, this.login_signupBtn, 5000);
    await waitAndClick(driver, this.emailField, 5000);
    await waitAndType(driver, this.emailField, emailaddress, 5000);
    await waitAndClick(driver, this.continueBtn, 5000);
    //....
  }
  async signUpWithGoogle(driver, emailaddress, PermissionType) {
    logMessage("info", "selecting google account");
    await waitAndClick(driver, this.login_signupBtn, 10000);
    await waitAndClick(driver, this.signUpBtn, 5000);
    await waitAndClick(driver, this.continueWithGoogleBtn, 5000);
    await waitAndClick(
      driver,
      this.accountOption.replace("email", emailaddress),
      15000
    );
    await driver.pause(5000);
    logMessage("info", "filling user data ");
    await waitAndClick(driver, this.fullNameField, 15000);
    await waitAndType(driver, this.fullNameField, "Zaid", 15000);
    await waitAndClick(driver, this.countryField, 15000);
    //select country
    await this.Location.grantRunTimeLocationPermission(driver, PermissionType);
    logMessage("info", "clicking continue button");
    this.clickOnCountueBtn(driver);
  }
  async signUpWithEmail(driver,PermissionType){
    logMessage("info", "signUpWithEmail");
   
    await waitAndClick(driver, this.login_signupBtn, 10000);
    await waitAndClick(driver, this.signUpBtn, 5000);
  logMessage("info", "filling user data ");
    await waitAndClick(driver, this.fullNameField_2, 15000);
    await waitAndType(driver, this.fullNameField_2, "Zaid", 15000);
    await waitAndClick(driver, this.countryField_2, 15000);
    //select country
    await this.Location.grantRunTimeLocationPermission(driver, PermissionType);
    // wrrite email
    const api=process.env.MailSlurpAPIKey;
    if(!api){
      throw new Error("MailSlurpAPIKey is not defined in .env file");
    }
    
    const mailslurp = new MailSlurp({ apiKey: api });
    const inbox = await mailslurp.createInbox();
    logMessage("info", `Generated email address: ${inbox.emailAddress}`);
    await waitAndClick(driver, this.emailField_2, 15000);
    await waitAndType(driver, this.emailField_2, inbox.emailAddress, 15000);
    logMessage("info", "clicking continue button");
    this.clickOnCountueBtn(driver);
     const emailMessage = await mailslurp.waitForLatestEmail(inbox.id, 30_000);
      if (!emailMessage) {
        throw new Error("No email received within the timeout period");
      }
      logMessage("info",emailMessage);
     const otp=extractOtp(emailMessage.body);
     logMessage("info", `Extracted OTP: ${otp}`);
      if(!otp){
        throw new Error("OTP could not be extracted from the email body");
      
      }
await driver.execute("mobile: type", {
  text: otp
});
await driver.pause(10000);

  }
    async clickOnCountueBtn(driver) {
    logMessage("info", "clicking continue button");
    await waitAndClick(driver, this.continueBtn, 5000);
  }
  async closeOnBoardingScreen(driver) {
    logMessage("info", "closeOnBoardingScreen");
    await waitAndClick(driver, this.xbtn, 10000);
  }
}
  //#endregion

