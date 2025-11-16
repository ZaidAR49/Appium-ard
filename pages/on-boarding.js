import { waitAndClick,waitAndType } from "../utils/element-actions.js";

export class Authentication {
    // Data
    emailAdress= " next step" ;
contry= "Jordan";
    // Buttons
  continueAsGuestBtn = "accessibility id:Continue as Guest";
  login_signupBtn = "accessibility id:Login/Signup";
  continueWithGoogleBtn = "accessibility id:Continue with Google";
  firstAccountBtn =`-android uiautomator:new UiSelector()
  .resourceId("com.google.android.gms:id/container").instance(0)`;
  continueBtn="accessibility id:Continue";
  signUpBtn="accessibility id:Sign Up";
// Fields
  emailField="class name:android.widget.EditText";
  fullNameField="class name:android.widget.EditText";
  searchCountryField="class name:android.widget.EditText";
  locationField=`-android uiautomator:new UiSelector().className(\"android.view.View\").instance(8)`;
// Permission Buttons
  LocationPermissionBtn = {
  WHILE: "id:com.android.permissioncontroller:id/permission_allow_foreground_only_button",
  ONE_TIME: "id:com.android.permissioncontroller:id/permission_allow_one_time_button",
  DENY: "id:com.android.permissioncontroller:id/permission_deny_button"
};
  async continueAsGuest(driver) {
    await waitAndClick(driver, this.continueAsGuestBtn, 5000);
  }
  async loginWithGoogle(driver) {
    await waitAndClick(driver, this.login_signupBtn, 5000);
    await waitAndClick(driver, this.continueWithGoogleBtn, 5000);
    await waitAndClick(driver, this.firstAccountBtn, 5000);
  }
  async LoginWithEmail(driver) {
    await waitAndClick(driver, this.login_signupBtn, 5000);
    await waitAndClick(driver, this.emailfield, 5000);
    await waitAndType(driver, this.emailfield, this.emailAdress, 5000);
    await waitAndClick(driver, this.continueBtn, 5000);

  }
  async signUpWithGoogle(driver,type){
    await waitAndClick(driver, this.login_signupBtn, 5000);
    await waitAndClick(driver, this.signUpBtn, 5000);
    await waitAndClick(driver, this.continueWithGoogleBtn, 5000);
    await waitAndClick(driver, this.firstAccountBtn, 5000);
    await waitAndClick(driver, this.fullNameField, 5000);
    await  waitAndType(driver, this.fullNameField, "Zied Radiadeh", 5000);
    await waitAndClick(driver, this.locationField, 10000);
    switch(type){
        case 'WHILE':
        await waitAndClick(driver, this.LocationPermissionBtn.WHILE, 5000);
        //bug
        break;
        case 'ONE_TIME':
        await waitAndClick(driver, this.LocationPermissionBtn.ONE_TIME, 5000);
        //bug
        break;
        case 'DENY':
        await waitAndClick(driver, this.LocationPermissionBtn.DENY, 5000);
        await waitAndClick(driver, this.searchCountryField, 5000);
        await waitAndType(driver, this.searchCountryField, this.contry, 5000);
       // need to select the county 

        break;

    }

  }
}

