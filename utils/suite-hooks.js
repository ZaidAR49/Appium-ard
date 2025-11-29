import { app } from "../config/capabilities.js";

export async function afterSuite(driver) {
  console.log("Test completed,Bye!");
  console.log("Ending session, closing app ...");
  // await driver.terminateApp(app);
  // await driver.deleteSession();
}
export function logMessage(type, message) {
  const colors = {
    error: "\x1b[31m",    // red
    warning: "\x1b[33m",  // yellow
    success: "\x1b[32m",  // green
    reset: "\x1b[0m",     // reset color
    info: "\x1b[34m"      // blue
  };

  const color = colors[type] || colors.reset;

  console.log(color + ("My log: " + message) + colors.reset);
}
