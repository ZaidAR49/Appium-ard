import { waitAndClick } from "../utils/element-actions.js";
import { logMessage } from "../utils/general.js";
export class Settings {
    // #region attributes
    // #region Buttons
    settingsBtn = '/hierarchy/android.widget.FrameLayout/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.widget.ImageView[4]';
    accountMangementBtn = "accessibility id:Account Management";
    deleteAccountBtn = "accessibility id:Delete account";
    comfirmDeleteBtn = "accessibility id:Delete it";


    // #endregion
    // #endregion
    constructor() {
        logMessage("info", "Settings page object created");
    }

    async deleteAccount(driver) {
        driver.pause(5000);
        await waitAndClick(driver, this.settingsBtn, 300000);
        logMessage("info", "Settings page opened");
        driver.pause(2000);
        await waitAndClick(driver, this.accountMangementBtn, 150000);
        await waitAndClick(driver, this.deleteAccountBtn, 150000);
        await waitAndClick(driver, this.comfirmDeleteBtn, 150000);
        logMessage("success", "Account deleted successfully");
    }
}



