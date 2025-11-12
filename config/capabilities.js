import 'dotenv/config';
export const capabilities = {
	platformName: 'Android',
	'appium:automationName': 'UiAutomator2',
	'appium:deviceName': process.env.DEVICENAME,
	'appium:app': './resources/app-file/aw-stg-6.0.10(761).apk'
	
};

export const wdOpts = {
	hostname: process.env.APPIUM_HOST || 'localhost',
	port: 4723,
	logLevel: 'info',
	capabilities
};


