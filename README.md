# WebdriverIO Test Automation Starter

This repository contains a small, practical example of browser automation using WebdriverIO and JavaScript. It demonstrates a readable test structure, clear assertions and waits based on the state of a page rather than fixed delays.

The example uses a local HTML fixture generated inside the test suite. It does not access a live service or require an account.

## Requirements

* Node.js 22 or a compatible supported release
* npm
* Google Chrome or Chromium

WebdriverIO may download a compatible browser driver when necessary. Internet access may be required for initial installation.

## Run the tests

```bash
npm install
npm test
```

Run only the smoke test:

```bash
npm run test:smoke
```

Check JavaScript syntax:

```bash
npm run check
```

For installations where the browser cannot be detected, set `CHROME_BINARY` to the full path of Chrome or Chromium.

## Included examples

* `test/fixtures/loginFixture.js` defines a self contained sample sign in page.
* `test/pageobjects/login.page.js` keeps selectors and page interactions in one place.
* `test/specs/login.e2e.js` tests successful sign in, incorrect credentials and missing fields.
* `test/helpers/waitForResult.js` waits for a result rather than an arbitrary number of seconds.
* `wdio.conf.js` contains the browser and test runner configuration.
* `docs/flaky-tests.md` explains how to investigate unreliable browser tests.
* `.github/workflows/browser-tests.yml` checks syntax and runs the browser suite on pushes and pull requests.

## Reliability and limitations

The tests are intentionally small and independent of public demonstration sites. They illustrate testing patterns and are not a substitute for testing a real application. The workflow provides a repeatable execution path, but its status should be checked before treating a change as verified.

## Contributions

Suggestions and improvements are welcome. Please open an issue describing the problem or proposed change before beginning substantial work.

## Responsible use

Do not commit credentials, personal information, confidential documents or code owned by an employer or client without permission.
