import 'dotenv/config';
import { remote } from 'webdriverio';
export const app ='./resources/app-file/aw-stg-6.0.10(761).apk';
export const capabilities = {
	platformName: 'Android',
	'appium:automationName': 'UiAutomator2',
	'appium:deviceName': process.env.DEVICENAME,
	'appium:app': app,
	'appium:autoGrantPermissions': true,
	'appium:settings[ignoreUnimportantViews]':true,
	'appium:noReset':false,
	"appium:fullReset": true

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