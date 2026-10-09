const chromeArgs = ['--headless=new', '--disable-gpu', '--window-size=1280,800'];

if (process.env.CI || process.env.WDIO_NO_SANDBOX === '1') {
  chromeArgs.push('--no-sandbox', '--disable-dev-shm-usage');
}

exports.config = {
  runner: 'local',
  specs: ['./test/specs/**/*.e2e.js'],
  maxInstances: 1,
  capabilities: [{
    browserName: 'chrome',
    'goog:chromeOptions': {
      args: chromeArgs,
      ...(process.env.CHROME_BINARY ? { binary: process.env.CHROME_BINARY } : {})
    }
  }],
  logLevel: 'warn',
  bail: 0,
  waitforTimeout: 5000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 1,
  framework: 'mocha',
  reporters: ['spec'],
  mochaOpts: {
    ui: 'bdd',
    timeout: 30000
  }
};
