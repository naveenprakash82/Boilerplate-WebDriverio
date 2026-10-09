const LoginPage = require('../pageobjects/login.page');
const { waitForResult } = require('../helpers/waitForResult');

describe('Example sign in', () => {
  beforeEach(async () => {
    await LoginPage.open();
  });

  it('smoke: accepts known example credentials', async () => {
    await LoginPage.signIn('demo', 'example-password');
    await waitForResult(LoginPage.message, 'Signed in successfully');
    await expect(LoginPage.message).toHaveText('Signed in successfully');
  });

  it('rejects incorrect credentials', async () => {
    await LoginPage.signIn('demo', 'incorrect');
    await waitForResult(LoginPage.message, 'Invalid credentials');
    await expect(LoginPage.message).toHaveText('Invalid credentials');
  });

  it('requires both fields', async () => {
    await LoginPage.signIn('demo', '');
    await waitForResult(LoginPage.message, 'Both fields are required');
    await expect(LoginPage.message).toHaveText('Both fields are required');
  });
});
