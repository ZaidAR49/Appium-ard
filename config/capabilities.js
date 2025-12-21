import dotenv from 'dotenv';
import { remote } from 'webdriverio';
dotenv.config({ path: '../.env' });
export const app = './resources/app-file/aw-prod-6.0.13(777).apk';
export const capabilities = {
	platformName: 'Android',
	'appium:automationName': 'UiAutomator2',
	'appium:deviceName': process.env.DEVICENAME,
	'appium:app': app,
	//'appium:autoGrantPermissions': true,
	'appium:settings[ignoreUnimportantViews]': true,
	'appium:noReset': false,
	"appium:fullReset": true,
	'appium:newCommandTimeout': 500,
	'appium:logLevel': "info",
	// Report generation is disabled by default
	// Enable by setting environment variable: SET GENERATE_REPORT=true
	...(process.env.GENERATE_REPORT === 'true' && {
		'appium:reporter': "junit",
		'appium:reportDir': "./reports"
	}), 



};

export const wdOpts = {
	hostname: process.env.APPIUM_HOST || 'localhost',
	port: 4723,
	logLevel: 'info',
	capabilities
};


export async function createDriver(overrides = {}) {
	
	const opts = {
		...wdOpts,
		capabilities: { ...wdOpts.capabilities, ...(overrides.capabilities || {}) },
	};
	return remote(opts);
}