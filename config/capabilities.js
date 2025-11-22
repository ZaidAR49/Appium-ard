import dotenv from 'dotenv';
import { remote } from 'webdriverio';
dotenv.config({ path: '../.env' });
export const app ='./resources/app-file/aw-prod-6.0.12(768).apk';
export const capabilities = {
	platformName: 'Android',
	'appium:automationName': 'UiAutomator2',
	'appium:deviceName': process.env.DEVICENAME,
	'appium:app': app,
	//'appium:autoGrantPermissions': true,
	'appium:settings[ignoreUnimportantViews]':true,
	'appium:noReset':false,
	"appium:fullReset": true,
	'appium:newCommandTimeout': 500,
    'appium:logLevel': "info",
    'appium:reporter': "junit", // or "json", "html", "spec", etc.
   'appium:reportDir': "./reports" // where the report will be saved
    


};

export const wdOpts = {
	hostname: process.env.APPIUM_HOST || 'localhost',
	port: 4723,
	logLevel: 'info',
	capabilities
};


export async function createDriver(overrides = {}) {
  // shallow-merge overrides into wdOpts; you can customize merge logic
  const opts = {
    ...wdOpts,
    capabilities: { ...wdOpts.capabilities, ...(overrides.capabilities || {}) },
  };
  return remote(opts);
}