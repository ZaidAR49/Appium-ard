
/**
 * Waits for an element to appear and clicks it if it exists.
 * @param {WebdriverIO.Element} element - The element to click
 * @param {number} timeout - Maximum wait time in ms (default 5000)
 */

export async function waitAndClick(driver,selector, timeout = 5000) {
  try {
    const element = await driver.$(selector);
    // Wait for element to exist
    await element.waitForExist({ timeout });
    // Wait for element to be displayed
    await element.waitForDisplayed({ timeout });
    // Click the element
    await element.click();
    console.log(`Clicked element: ${selector}`);
  } catch (error) {
    console.log(`Element "${selector}" not found or not clickable within ${timeout}ms. Error: ${error.message}`);
    throw error; // Re-throw so the test can handle it appropriately
  }
}

