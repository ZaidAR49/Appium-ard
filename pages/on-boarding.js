import {
  waitAndClick,
  waitAndType,
  
} from "../utils/element-actions.js";
import { Location } from "./location.js";
import { Welcome } from "./welcome.js";
import { NotificationsPremation } from "./notification-permation.js";

export class Authentication {
  // #region attributes
  // #region Data
  contry=null;
  
  // #endregion

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
  fullNameField = "class name:android.widget.EditText"; //
   //
  countryField = `-android uiautomator:new UiSelector().className(\"android.view.View\").instance(8)`;
  // #endregion

  //region Classes
  Location = null;
  Welcome = null;
  notif = null;
  // endregion

  //region temp buttons for delete account
  settingsBtn =
    '-android uiautomator:new UiSelector().className("android.widget.ImageView").instance(19)';
  accountMangementBtn = "accessibility id:Account Management";
  deleteAccountBtn = "accessibility id:Delete account";
  comfirmDeleteBtn = "accessibility id:Delete it";
  // endregion

  // #endregion
  constructor(opional,contry="Jordan") {
    console.log("Authentication");
    this.contry=contry;
  this.Location=new Location(opional);
    this.Welcome = new Welcome();
    this.notif = new NotificationsPremation(opional);
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
    await waitAndClick(driver, this.login_signupBtn, 5000);
    await waitAndClick(driver, this.signUpBtn, 5000);
    await waitAndClick(driver, this.continueWithGoogleBtn, 5000);
    await waitAndClick(
      driver,
      this.accountOption.replace("email", emailaddress),
      10000
    );
    await driver.pause(5000);
    await waitAndClick(driver, this.fullNameField, 5000);
    await waitAndType(driver, this.fullNameField, "Zied Radiadeh", 5000);
    await waitAndClick(driver, this.countryField, 10000);
     //select country
    await this.Location.grantRunTimeLocationPermission(driver, PermissionType);
  
    this.clickOnCountueBtn(driver);
      
        // skip for later --> welcome screen

        await this.Welcome.skipWelcomeScreen(driver);
        console.log("Skipped welcome screen");

    this.Location.selectLocationAutomatically(driver,"Irbid");
    //end case/////////////////
    await this.notif.allowNotifications(driver);
    // somthig like ads so we skip it
    await waitAndClick(driver, this.xbtn, 5000);
    // delete the account
    await waitAndClick(driver, this.settingsBtn, 5000);
    await waitAndClick(driver, this.accountMangementBtn, 5000);
    await waitAndClick(driver, this.deleteAccountBtn, 5000);
    await waitAndClick(driver, this.comfirmDeleteBtn, 5000);
    console.log("Account deleted successfully");
  }
  //#endregion
  async clickOnCountueBtn(driver) {
    await waitAndClick(driver, this.continueBtn, 5000);
  }
}
