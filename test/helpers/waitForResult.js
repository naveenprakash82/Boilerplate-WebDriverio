// Wait for the user facing result instead of relying on a fixed sleep.
async function waitForResult(element, expectedText) {
  await element.waitForDisplayed({ timeout: 5000 });
  await browser.waitUntil(
    async () => (await element.getText()) === expectedText,
    {
      timeout: 5000,
      interval: 100,
      timeoutMsg: 'The expected result was not displayed: ' + expectedText
    }
  );
}

module.exports = { waitForResult };
