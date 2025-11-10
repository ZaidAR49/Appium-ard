import { Capabilities } from '@wdio/types';
import {env} from 'process';
export const androidCapabilities: Capabilities.AppiumCapabilities = {
  platformName: 'Android',
  'appium:deviceName': env.DEVICE_NAME,
  'appium:app': './resources/app-file/aw-stg-6.0.10(761).apk', 
  'appium:automationName': 'UiAutomator2',
//    //'appium:platformVersion': '13.0', //os version
//   'appium:noReset': false,
//   'appium:fullReset': false,
//   'appium:newCommandTimeout': 300,
//   'appium:avd': 'Pixel_5_API_33', 
};

export const iosCapabilities: Capabilities.AppiumCapabilities = {
  platformName: 'iOS',
  'appium:platformVersion': '16.0',
  'appium:deviceName': 'iPhone 17',
  'appium:app': './resources/app.ipa', 
  'appium:automationName': 'XCUITest',
//   'appium:noReset': false,
//   'appium:fullReset': false,
//   'appium:newCommandTimeout': 300,
};

export const getCapabilities = (): Capabilities.AppiumCapabilities[] => {
  const platform = process.env.PLATFORM;
  
  // If specific platform is requested, return only that
  if (platform === 'ios') {
    return [iosCapabilities];
  }
  
  if (platform === 'android') {
    return [androidCapabilities];
  }
  
  // If no platform specified or 'both', return both capabilities
  return [androidCapabilities, iosCapabilities];
};
