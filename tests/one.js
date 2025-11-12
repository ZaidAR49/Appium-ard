import { remote } from 'webdriverio';
import { wdOpts } from '../config/capabilities.js';

async function runTest() {
	const driver = await remote(wdOpts);
	try {
		await driver.pause(5000);
		console.log('App launched successfully');
		
	} finally {
		// await driver.deleteSession();
	}
}

runTest().catch(console.error);


