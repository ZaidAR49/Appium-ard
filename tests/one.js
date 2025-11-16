import { createDriver } from "../config/capabilities.js";
import { setLocationByName } from "../utils/geo-Location.js";
import { afterSuite } from "../utils/suite-hooks.js";
import {waitAndClick} from "../utils/wait-and-click.js";
async function runTest() {
  const driver = await createDriver();
  try {
    setLocationByName(driver, "Irbid,Jordan");
    await driver.pause(3000);
   //////////////////////////////////////////////
   await waitAndClick(driver,'accessibility id:Continue as Guest',5000);
     await waitAndClick(driver,'accessibility id:Allow',5000);
	  await waitAndClick(driver,'id:com.android.permissioncontroller:id/permission_allow_button',5000);
	   console.log("tests passed successfully");


    
  } finally {
    afterSuite(driver);
  }
}

runTest().catch(console.error);
