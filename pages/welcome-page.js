import { waitAndClick} from "../utils/element-actions.js";

export class Welcome {
    // Buttons
    skipBtn = 'accessibility id:Skip for Later';
    // Methods
    async skipWelcomeScreen(driver) {
        await waitAndClick(driver, this.skipBtn, 5000);
    }
}
