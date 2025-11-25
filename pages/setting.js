import { waitAndClick,waitAndType } from "../utils/element-actions.js";
export class Settings {
    // #region attributes
    // #region Buttons
settingsBtn =
    '-android uiautomator:new UiSelector().className("android.widget.ImageView").instance(19)';
  accountMangementBtn = "accessibility id:Account Management";
  deleteAccountBtn = "accessibility id:Delete account";
  comfirmDeleteBtn = "accessibility id:Delete it";

    
    // #endregion
    // #endregion
    constructor() {
        console.log("Settings");
    }

    async deleteAccount(driver) {
       await waitAndClick(driver, this.settingsBtn, 5000);
    await waitAndClick(driver, this.accountMangementBtn, 5000);
    await waitAndClick(driver, this.deleteAccountBtn, 5000);
    await waitAndClick(driver, this.comfirmDeleteBtn, 5000);
    console.log("Account deleted successfully"); 
    }
}



   