import { waitAndClick,waitAndType } from "../utils/element-actions.js";

export class Authentication {
    // Data
    
    contry= "Jordan";
    // Buttons
  continueAsGuestBtn = "accessibility id:Continue as Guest";
  login_signupBtn = "accessibility id:Login/Signup";
  continueWithGoogleBtn = "accessibility id:Continue with Google";
  accountOption ="-android uiautomator:new UiSelector().text(\"email\")";
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
//constructor
constructor(){
  console.log("Authentication");
 
}

// Methods
  async continueAsGuest(driver) {
    await waitAndClick(driver, this.continueAsGuestBtn, 5000);
  }
  async loginWithGoogle(driver,emailaddress) {
    await waitAndClick(driver, this.login_signupBtn, 5000);
    await waitAndClick(driver, this.continueWithGoogleBtn, 5000);
    await waitAndClick(driver, (this.accountOption.replace("email",emailaddress)), 5000);
  }
  async LoginWithEmail(driver) {
    await waitAndClick(driver, this.login_signupBtn, 5000);
    await waitAndClick(driver, this.emailField, 5000);
    await waitAndType(driver, this.emailField, this.loginEmail, 5000);
    await waitAndClick(driver, this.continueBtn, 5000);
    //....

  }
  async signUpWithGoogle(driver,PermissionType){
    await waitAndClick(driver, this.login_signupBtn, 5000);
    await waitAndClick(driver, this.signUpBtn, 5000);
    await waitAndClick(driver, this.continueWithGoogleBtn, 5000);
    await waitAndClick(driver, this.accountOption, 5000);
    await waitAndClick(driver, this.fullNameField, 5000);
    await  waitAndType(driver, this.fullNameField, "Zied Radiadeh", 5000);
    await waitAndClick(driver, this.locationField, 10000);
    switch(PermissionType){
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
       // need to select the country 

        break;

    }

  }
}

