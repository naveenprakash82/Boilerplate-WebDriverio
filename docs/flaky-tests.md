# Investigating unreliable browser tests

A test that sometimes passes and sometimes fails without a meaningful product change is difficult to trust. Before retrying it, collect evidence about the failure.

## A practical investigation

1. Reproduce the failure and record the test name, environment, browser version and observed error.
2. Check whether the test depends on another test, an external service, shared data or the execution order.
3. Confirm that the failing selector identifies the intended element.
4. Replace fixed delays with waits for a meaningful state, such as a visible element or a completed request.
5. Check asynchronous operations and make sure each browser action is awaited.
6. Run the test repeatedly after the change. Record both passes and failures.
7. Keep a short note explaining the cause, the correction and how the result was verified.

## Example

Avoid:

```js
await browser.pause(3000);
await expect($('#message')).toHaveText('Signed in successfully');
```

Prefer:

```js
const message = $('#message');
await message.waitForDisplayed({ timeout: 5000 });
await expect(message).toHaveText('Signed in successfully', { wait: 5000 });
```

The first version assumes the page is ready after three seconds. The second waits for the state that matters.

## Use retries carefully

Retries can help identify intermittent problems, but they do not correct an underlying issue. Record the original failure and investigate it before adding retries to a test.

## Scope of these examples

The tests use a small HTML fixture generated within the repository. No external website, account or confidential test data is required. This makes the examples reproducible, but it does not prove that an actual application is reliable.
