
import { createDriver } from '../config/capabilities.js';
import { setLocationByName } from '../utils/geo-Location.js';
import {afterSuite} from '../utils/suite-hooks.js';
async function runTest() {
	const driver = await createDriver();
	try {
setLocationByName(driver, 'Irbid,Jordan');
		await driver.pause(3000);
		console.log('App launched successfully');

	} finally {
	afterSuite();
	}
}

runTest().catch(console.error);


