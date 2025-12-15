import { logMessage } from "./general.js";

export async function scroll(driver, direction = "down", distance = 300, duration = 500) {
  try {
    const { width, height } = await driver.getWindowSize();
    let startX, startY, endX, endY;
    startX = width / 2;
    endX = startX;
    if (direction === "down") {
      logMessage("info", "Scrolling down...");
      startY = height * 0.8;
      endY = startY - distance;
    } else if (direction === "up") {
      logMessage("info", "Scrolling up...");
      startY = height * 0.2;
      endY = startY + distance;
    } else {
      throw new Error("Invalid direction. Use 'up' or 'down'.");
    }
    
    await driver.action('pointer')
      .move({ duration: 0, x: startX, y: startY })
      .down({ button: 0 })
      .move({ duration, x: endX, y: endY })
      .up({ button: 0 })
      .perform();
    logMessage("info", `Scrolled ${direction} by ${distance} pixels.`);
  } catch (err) {
    logMessage("error", `Failed to scroll: ${err.message}`);
    throw err;
  }
}



export async function clickOnTheCorner(driver) {
  try {
    const content = await driver.$(
      'android=new UiSelector().resourceId("android:id/content")'
    );

    await content.waitForExist({ timeout: 5000 });

    const rect = await content.getRect();
    const X = rect.x + rect.width * 0.9;
    const Y = rect.y + rect.height * 0.1;

    await driver.action('pointer')
      .move({ duration: 0, x: X, y: Y })
      .down({ button: 0 })
      .up({ button: 0 })
      .perform();
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
