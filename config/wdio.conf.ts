import type { Options } from '@wdio/types';
import { getCapabilities } from './capabilities';

export const config: Options.Testrunner = {
  port: 4723,
  capabilities: getCapabilities(),
  logLevel: 'info',
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
// //
//   runner: 'local',
//   specs: [
//     './tests/**/*.spec.ts'
//   ],
//   exclude: [],
//   maxInstances: 1,
//   bail: 0,
//   baseUrl: 'http://localhost',
//   services: [
//     [
//       'appium',
//       {
//         args: {
//           address: 'localhost',
//           port: 4723,
//           log: './reports/appium.log'
//         },
//         logPath: './reports'
//       }
//     ]
//   ],
  
//   framework: 'mocha',
  
//   reporters: [
//     'spec',
//     [
//       '@wdio/allure-reporter',
//       {
//         outputDir: 'reports/allure-results',
//         disableWebdriverStepsReporting: true,
//         disableWebdriverScreenshotsReporting: false
//       }
//     ]
//   ],
  
//   mochaOpts: {
//     ui: 'bdd',
//     timeout: 60000
//   },
  
//   before: function (capabilities, specs) {
//     // Add custom setup here
//   },
  
//   beforeTest: async function (test, context) {
//     // Add pre-test setup here
//   },
  
//   afterTest: async function (test, context, { error, result, duration, passed, retries }) {
//     if (error) {
//       // Take screenshot on failure
//       // Screenshot will be automatically captured by WebdriverIO on test failure
//     }
//   },
  
//   after: function (result, capabilities, specs) {
//     // Add cleanup here
//   },
  
//   onComplete: function (exitCode, config, capabilities, results) {
//     // Add post-execution tasks here
//   }
};

export default config;
