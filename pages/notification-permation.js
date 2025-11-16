import { waitAndClick } from "../utils/element-actions.js";
export class NotificationsPremation {
  allowBtn = "accessibility id:Allow";
  enableLaterBtn = "accessibility id:Enable Later";
  acceptBtn = "id:com.android.permissioncontroller:id/permission_allow_button";
  denyBtn = "id:com.android.permissioncontroller:id/permission_deny_button";

  async allowNotifications(driver) {

    await waitAndClick(driver, this.allowBtn, 5000);
    await waitAndClick(driver, this.acceptBtn, 5000);
  }
async denyNotifications(driver) {

    await waitAndClick(driver, this.allowBtn, 5000);
    await waitAndClick(driver, this.denyBtn, 5000);
  }
  async enableLaterNotifications(driver) {
    await waitAndClick(driver, this.enableLaterBtn, 5000);
  }

}
