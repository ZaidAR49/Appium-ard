import { waitAndClick,waitAndType } from "../utils/element-actions.js";
export class LocationPermission{
    /* When we coming to the location permission we have two dialog first one the The runtime dialog which include three options
     and we have also the symbol dialog which only have a llow and deny */
      runTimeLocationPermissionBtn = {
  WHILE: "id:com.android.permissioncontroller:id/permission_allow_foreground_only_button",
  ONE_TIME: "id:com.android.permissioncontroller:id/permission_allow_one_time_button",
  DENY: "id:com.android.permissioncontroller:id/permission_deny_button"
};

simpleLocationPermissionBtn={
    ALLOW:"id:com.android.packageinstaller:id/permission_allow_button",
    DENY:"id:com.android.packageinstaller:id/permission_deny_button"
};
//data
optional=false;

//constructor
constructor(optional){
  console.log("LocationPermission");
  this.optional=optional;
  console.log("optional param llll-->",this.optional);
}
// Methods
    async grantRunTimeLocationPermission(driver,PermissionType){

switch(PermissionType){
        case 'WHILE':
        await waitAndClick(driver, this.runTimeLocationPermissionBtn.WHILE, 5000,this.optional);
        break;
        case 'ONE_TIME':
        await waitAndClick(driver, this.runTimeLocationPermissionBtn.ONE_TIME, 5000,this.optional);
        break;
        case 'DENY':
        await waitAndClick(driver, this.runTimeLocationPermissionBtn.DENY, 5000,this.optional);
        break;
}
    }
    async grantSimpleLocationPermission(driver,PermissionType){
switch(PermissionType){
        case 'ALLOW':
        await waitAndClick(driver, this.simpleLocationPermissionBtn.ALLOW, 5000,this.optional);
        break;
        case 'DENY':
        await waitAndClick(driver, this.simpleLocationPermissionBtn.DENY, 5000,this.optional);
        break;
}
    }

}