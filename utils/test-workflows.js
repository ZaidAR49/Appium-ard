
// import { Authentication } from "../pages/on-boarding.js";
// import { Welcome } from "../pages/welcome.js";
// import { Location } from "../pages/location.js";
// import { Notification } from "../pages/notification.js";

// /**
//  * Executes the full signup flow including onboarding steps.
//  * This helper function encapsulates the common setup required for tests that need a logged-in user.
//  *
//  * @param {WebdriverIO.Browser} driver - The driver instance
//  * @param {string} signupEmail - The email to use for signup
//  * @param {string} locationName - The location name to select (default: "Irbid")
//  */
// export async function completeSignupFlow(driver, signupEmail, locationName = "Irbid") {
//     // Initialize Page Objects
//     // We create new instances here to ensure fresh state, or they can be passed in if preferred.
//     // For simplicity in the helper, we instantiate them here.
//     const auth = new Authentication({ name: "Helper User", optional: true });
//     const welcome = new Welcome();
//     const location = new Location({ optional: true });
//     const notif = new Notification({ optional: true });

//     // 1. Sign up with Google
//     await auth.signUpWithGoogle(driver, signupEmail, "DENY");

//     // 2. Skip Welcome Screen
//     await welcome.skipWelcomeScreen(driver);

//     // 3. Select Location
//     await location.selectLocationAutomatically(driver, locationName);

//     // 4. Allow Notifications
//     await notif.allowNotifications(driver);

//     // 5. Close Onboarding Screen
//     await auth.closeOnBoardingScreen(driver);
// }
