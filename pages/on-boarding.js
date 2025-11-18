import { waitAndClick, waitAndType } from "../utils/element-actions.js";
import { LocationPermission } from "./location-permition.js";
import { Welcome } from "./welcome-page.js";

export class Authentication {
  // Data
  contry = "Jordan";
  location = "Irbid";
  // Buttons
  allowAutomaticallyBtn = "accessibility id:Allow Automatically";
  continueAsGuestBtn = "accessibility id:Continue as Guest";
  login_signupBtn = "accessibility id:Login/Signup";
  continueWithGoogleBtn = "accessibility id:Continue with Google";
  accountOption = '-android uiautomator:new UiSelector().text("email")';
  continueBtn = "accessibility id:Continue";
  signUpBtn = "accessibility id:Sign Up";
  // Fields
  emailField = "class name:android.widget.EditText";
  fullNameField = "class name:android.widget.EditText";
  searchCountryField = "class name:android.widget.EditText";
  locationField = `-android uiautomator:new UiSelector().className(\"android.view.View\").instance(8)`;
  // classes
  LocationPermission = null;
  Welcome = null;

  //constructor
  constructor(opional) {
    console.log("Authentication");
    this.LocationPermission = new LocationPermission(opional);
    this.Welcome = new Welcome();
  }

  // Methods
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
      5000
    );
    await waitAndClick(driver, this.fullNameField, 5000);
    await waitAndType(driver, this.fullNameField, "Zied Radiadeh", 5000);
    await waitAndClick(driver, this.locationField, 10000);
    switch (PermissionType) {
      case "ALLOW":
        console.log("ALLOW flow");
        await this.LocationPermission.grantSimpleLocationPermission(
          driver,
          "ALLOW"
        );
        //bug
        break;
      case "DENY":
        console.log("DENY flow");
        await this.LocationPermission.grantSimpleLocationPermission(
          driver,
          "DENY"
        );
        await waitAndClick(driver, this.searchCountryField, 5000);
        await waitAndType(driver, this.searchCountryField, this.contry, 5000);
        // need to select the country -->jordan
        await waitAndClick(
          driver,
          `-android uiautomator:new UiSelector().descriptionContains("${this.contry}")`,
          5000
        );

        //continue
        await waitAndClick(driver, this.continueBtn, 5000);
        // skip for later --> welcome screen
        await this.Welcome.skipWelcomeScreen(driver);
        // location permission --> allow automatically
        await waitAndClick(driver, this.allowAutomaticallyBtn, 5000);
        // deny or allow__: deny will ask again
        await this.LocationPermission.grantSimpleLocationPermission(
          driver,
          "ALLOW"
        );
        // allow --> location search --> search and click
        await waitAndClick(driver, this.searchCountryField, 5000);
        await waitAndType(driver, this.searchCountryField, this.location, 5000);
        await waitAndClick(
          driver,
          `-android uiautomator:new UiSelector().descriptionContains(${this.location})`,
          5000
        );
        break;
    }
  }
}
