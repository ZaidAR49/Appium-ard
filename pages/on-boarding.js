import { waitAndClick, waitAndType } from "../utils/element-actions.js";
import { Location } from "./location.js";
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
  // #endregion
  // endregion
  // #region classes
  Location = null;
  //endregion
  // #endregion
  constructor(name = "Zied Radiadeh", optional = true) {
    console.log("Authentication");
    this.Location = new Location({ optional });
    this.name = name;
  }

  //#region Methods
  async continueAsGuest(driver) {
    await waitAndClick(driver, this.continueAsGuestBtn, 5000);
  }
  async loginWithGoogle(driver, emailaddress) {
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
    console.log("selecting google account");
    await waitAndClick(driver, this.login_signupBtn, 10000);
    await waitAndClick(driver, this.signUpBtn, 5000);
    await waitAndClick(driver, this.continueWithGoogleBtn, 5000);
    await waitAndClick(
      driver,
      this.accountOption.replace("email", emailaddress),
      15000
    );
    await driver.pause(5000);
    console.log("filling user data ");
    await waitAndClick(driver, this.fullNameField, 15000);
    await waitAndType(driver, this.fullNameField, "Zaid", 15000);
    await waitAndClick(driver, this.countryField, 15000);
    //select country
    await this.Location.grantRunTimeLocationPermission(driver, PermissionType);
    console.log("clicking continue button");
    this.clickOnCountueBtn(driver);
  }
  //#endregion
  async clickOnCountueBtn(driver) {
    await waitAndClick(driver, this.continueBtn, 5000);
  }
  async closeOnBoardingScreen(driver) {
    await waitAndClick(driver, this.xbtn, 10000);
  }
}
