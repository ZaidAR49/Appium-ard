import { getLoginOTP } from "../utils/email-helper.js";
import { logMessage } from "../utils/general.js";

getLoginOTP().then(otp => logMessage("success", otp)).catch(error => logMessage("error", error));
