# Appium-ard

Simple Appium + WebdriverIO (TypeScript) test project.

## Structure

```
config/           # Capabilities + WDIO config
pages/            # Page Object Model classes
tests/            # Test specs
utils/            # Reusable helpers (logger, gestures, data)
resources/        # Local app files (APK/IPA) and data (ignored in git)
reports/          # Test reports (ignored in git)
```

## Setup

1) Install dependencies
```bash
npm install
```

2) Install Appium + drivers (first time)
```bash
npm i -g appium
# Appium-ard

Simple Appium + WebdriverIO (TypeScript) test project.

## Structure

```
config/           # Capabilities + WDIO config
pages/            # Page Object Model classes
tests/            # Test specs
utils/            # Reusable helpers (logger, gestures, data)
resources/        # Local app files (APK/IPA) and data (ignored in git)
reports/          # Test reports (ignored in git)
```

## Setup

1) Install dependencies
```bash
npm install
```

2) Install Appium + drivers (first time)
```bash
npm i -g appium
appium driver install uiautomator2   # Android
appium driver install xcuitest       # iOS (macOS)
```

3) Set app paths and device names in `config/capabilities.ts`.

## Run Tests

### Run All Tests
Execute all tests found in the `tests/` directory:
```bash
npm start
```
*Note: This uses the configuration in `.mocharc.json`.*

### Run Specific Test
To run a single test file:
```bash
npx mocha tests/your-test-file.test.js
```
Example:
```bash
npx mocha tests/continue-as-guest.test.js
```

## Reports

### Generate & Open Report
After running tests, you can view the HTML report:
```bash
npm run report:open
```
*This opens `reports/appium-test-report.html` in your default browser.*

That’s it. Update selectors in `pages/` and add cases in `tests/`.