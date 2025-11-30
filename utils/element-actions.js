import { logMessage } from "./general.js";
export async function clickOnTheCorner(driver) {
  try {
    const content = await driver.$(
      'android=new UiSelector().resourceId("android:id/content")'
    );

    await content.waitForExist({ timeout: 5000 });

    const rect = await content.getRect();
    const X = rect.x + rect.width * 0.9;
    const Y = rect.y + rect.height * 0.1;

    await driver.touchPerform([{ action: "tap", options: { x: X, y: Y } }]);
    await driver.pause(5000);

logMessage("info", `Tapped on corner at (${X}, ${Y})`);
    
  } catch (err) {
    logMessage("error", `Failed to tap on corner: ${err.message}`);
    //throw err;
  }
}

export async function waitAndClick(
  driver,
  selector,
  timeout = 5000,
  optinal = false
) {
  try {
    const element = await driver.$(selector);

    await element.waitForExist({ timeout });

    await element.waitForDisplayed({ timeout });

    await element.click();
    logMessage("info", `Clicked on element: ${selector}`);
  } catch (error) {
    logMessage("error", `Element "${selector}" not found or not clickable within ${timeout}ms. Error: ${error.message}`);
    if (!optinal) {
      // console.log("optinal-->", optinal);
      // console.log("This step is optional, continuing...");
      throw error;
    }
  }
}

export async function waitAndType(driver, selector, text, timeout = 5000) {
  try {
    const element = await driver.$(selector);

    await element.waitForExist({ timeout });

    await element.waitForDisplayed({ timeout });

    await element.clearValue();

    await element.addValue(text);
    logMessage("info", `Typed text into element: ${selector}`);

    //await driver.hideKeyboard(); //This is the best approach but it will not work in all devices

    await clickOnTheCorner(driver); // this is a workaround to hide the keyboard by clicking on the corner of the screen
  } catch (error) {
    logMessage("error", `Failed to type into element "${selector}" within ${timeout}ms. Error: ${error.message}`);
    throw error;
  }
}
// future use
export async function waitAndGetText(driver,selector,timeout=5000){

  
}

// i feel its useless but I will keep it for future use
export async function elementExists(driver, selector, timeout = 5000) {

  try {
    const element = await driver.$(selector);
    await element.waitForExist({ timeout });
logMessage("info", `Element "${selector}" exists.`);
    return true;
  }
  catch (error) {
   logMessage("warning", `Element "${selector}" does not exist within ${timeout}ms.`);
    return false;
  }
}
