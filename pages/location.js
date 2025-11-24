import { waitAndClick,waitAndType,elementExists } from "../utils/element-actions.js";

export class Location {
  // #region attributes

  //#region Buttons
  /* When we coming to the location permission we have two dialog first one the The runtime dialog which include three options
     and we have also the symbol dialog which only have a llow and deny */
  runTimeLocationPermissionBtn = {
    WHILE:
      "id:com.android.permissioncontroller:id/permission_allow_foreground_only_button",
    ONE_TIME:
      "id:com.android.permissioncontroller:id/permission_allow_one_time_button",
    DENY: "id:com.android.permissioncontroller:id/permission_deny_button",
  };

  simpleLocationPermissionBtn = {
    ALLOW: "id:com.android.packageinstaller:id/permission_allow_button",
    DENY: "id:com.android.packageinstaller:id/permission_deny_button",
  };
  allowAutomaticallyBtn = "accessibility id:Allow automatically";
 searchLocationField = "class name:android.widget.EditText";
 searchCountryField = "class name:android.widget.EditText";
 // #endregion
  //data
  optional = false;
  country=null;
   //constructor
  constructor(optional,country="Jordan") {
    console.log("LocationPermission");
    this.optional = optional;
    this.country=country;
    console.log("optional param llll-->", this.optional);
  }
  // #region Methods
async selectLocationAutomatically(driver,location=this.country) {
   if (elementExists(driver, this.allowAutomaticallyBtn, 5000)) {

          await waitAndClick(driver, this.allowAutomaticallyBtn, 10000, true);
          // deny or allow__: deny will ask again
          await this.grantRunTimeLocationPermission(
            driver,
            "WHILE"
          );
          // await this.LocationPermission.grantSimpleLocationPermission(
          //   driver,
          //   "ALLOW"
          // );
          // allow --> location search --> search and click
          await waitAndClick(driver, this.searchLocationField, 15000);
          await waitAndType(
            driver,
            this.searchLocationField,
            location,
            5000
          );
          await waitAndClick(
            driver,
            `-android uiautomator:new UiSelector().descriptionContains("${location}")`,
            10000
          );

        }
}

  async grantRunTimeLocationPermission(driver, PermissionType,country=this.country) {
    switch (PermissionType) {
      case "WHILE":
        await waitAndClick(
          driver,
          this.runTimeLocationPermissionBtn.WHILE,
          5000,
          this.optional
        );
        break;
      case "ONE_TIME":
        await waitAndClick(
          driver,
          this.runTimeLocationPermissionBtn.ONE_TIME,
          5000,
          this.optional
        );
        break;
      case "DENY":
        await waitAndClick(
          driver,
          this.runTimeLocationPermissionBtn.DENY,
          5000,
          this.optional
        );
        await waitAndClick(driver, this.searchCountryField, 10000);
        await waitAndType(driver, this.searchCountryField, country, 10000); //
        // need to select the country -->jordan
        await waitAndClick(
          driver,
          `-android uiautomator:new UiSelector().descriptionContains("${country}")`,
          5000
        );

        break;
    }
  }
  async grantSimpleLocationPermission(driver, PermissionType) {
    switch (PermissionType) {
      case "ALLOW":
        await waitAndClick(
          driver,
          this.simpleLocationPermissionBtn.ALLOW,
          5000,
          this.optional
        );
        break;
      case "DENY":
        await waitAndClick(
          driver,
          this.simpleLocationPermissionBtn.DENY,
          5000,
          this.optional
        );
        break;
    }
  }
    // #endregion
}
