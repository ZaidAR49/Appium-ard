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

## Run

- Android only
```bash
PLATFORM=android npm test
```

- iOS only
```bash
PLATFORM=ios npm test
```

- Both platforms (if available)
```bash
npm test
```

That’s it. Update selectors in `pages/` and add cases in `tests/`.