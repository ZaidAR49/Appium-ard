import { createDriver } from "../config/capabilities.js";
import { setLocationByName } from "../utils/geo-Location.js";
import { afterSuite } from "../utils/suite-hooks.js";
//import {waitAndClick} from "../utils/wait-and-click.js";
import {Authentication} from "../pages/on-boarding.js";
import {NotificationsPremation} from "../pages/notification-permation.js";
async function runTest() {
  const driver = await createDriver();
  try {
	const auth = new Authentication();
	const notif = new NotificationsPremation();
    setLocationByName(driver, "Irbid,Jordan");
    await driver.pause(3000);
   
    //await auth.continueAsGuestClick(driver);
	await auth.signUpWithGoogle(driver,"DENY");
 await notif.allowNotifications(driver);
     
	   console.log("tests passed successfully");


    
  } finally {
    afterSuite(driver);
  }
}

runTest().catch(console.error);
