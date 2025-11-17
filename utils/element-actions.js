/**
 * Waits for an element to appear and clicks it if it exists.
 * @param {WebdriverIO.Element} element - The element to click
 * @param {number} timeout - Maximum wait time in ms (default 5000)
 */

export async function waitAndClick(driver, selector, timeout = 5000,optinal=false) {
  try {
    const element = await driver.$(selector);

    await element.waitForExist({ timeout });

    await element.waitForDisplayed({ timeout });

    await element.click();
    console.log(`Clicked element: ${selector}`);
  } catch (error) {
    console.log(
      `Element "${selector}" not found or not clickable within ${timeout}ms. Error: ${error.message}`
    );
    if(!optinal){
      console.log("optinal-->",optinal)
      console.log("This step is optional, continuing...");
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

    await element.setValue(text);
    console.log(`Typed "${text}" into element: ${selector}`);
  } catch (error) {
    console.log(
      `Element "${selector}" not found or not typeable within ${timeout}ms. Error: ${error.message}`
    );
    throw error;
  }
}
