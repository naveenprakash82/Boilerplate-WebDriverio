const { fixtureUrl } = require('../fixtures/loginFixture');

class LoginPage {
  get username() { return $('#username'); }
  get password() { return $('#password'); }
  get submitButton() { return $('button[type="submit"]'); }
  get message() { return $('#message'); }

  async open() {
    await browser.url(fixtureUrl());
    await this.username.waitForDisplayed();
  }

  async signIn(username, password) {
    if (username) await this.username.setValue(username);
    if (password) await this.password.setValue(password);
    await this.submitButton.click();
  }
}

module.exports = new LoginPage();
