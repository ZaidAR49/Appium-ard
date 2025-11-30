import { waitAndClick, waitAndType } from "../utils/element-actions.js";
export class Settings {
    // #region attributes
    // #region Buttons
    settingsBtn = '//android.widget.ImageView[4]';
    accountMangementBtn = "accessibility id:Account Management";
    deleteAccountBtn = "accessibility id:Delete account";
    comfirmDeleteBtn = "accessibility id:Delete it";


    // #endregion
    // #endregion
    constructor() {
        console.log("Settings");
    }

    async deleteAccount(driver) {
        await waitAndClick(driver, this.settingsBtn, 10000);
        await waitAndClick(driver, this.accountMangementBtn, 10000);
        await waitAndClick(driver, this.deleteAccountBtn, 10000);
        await waitAndClick(driver, this.comfirmDeleteBtn, 10000);
        console.log("Account deleted successfully");
    }
}



