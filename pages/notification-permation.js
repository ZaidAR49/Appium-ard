import { waitAndClick } from "../utils/element-actions.js";
export class NotificationsPremation {
  // Buttons
  allowBtn = "accessibility id:Allow";
  enableLaterBtn = "accessibility id:Enable Later";
  acceptBtn = "id:com.android.permissioncontroller:id/permission_allow_button";
  denyBtn = "id:com.android.permissioncontroller:id/permission_deny_button";
  // data
  optional=false;
  //constructor
constructor({optional = false} = {}){
  console.log("NotificationsPremation");
  this.optional=optional;
  console.log("optional param-->",this.optional);
}
  async allowNotifications(driver) {

    await waitAndClick(driver, this.allowBtn, 50000,this.optional);
    await waitAndClick(driver, this.acceptBtn, 10000,this.optional);
  }
async denyNotifications(driver) {

    await waitAndClick(driver, this.allowBtn, 5000,this.optional);
    await waitAndClick(driver, this.denyBtn, 5000,this.optional);
  }
  async enableLaterNotifications(driver) {
    await waitAndClick(driver, this.enableLaterBtn, 5000,this.optional);
  }

}
