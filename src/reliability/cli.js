#!/usr/bin/env node
const fs = require('node:fs');
const { analyzeRuns } = require('./analyzeRuns');

function run(args = process.argv.slice(2)) {
  if (args.length !== 1) {
    throw new Error('Usage: npm run analyze -- path/to/results.json');
  }
  const records = JSON.parse(fs.readFileSync(args[0], 'utf8'));
  const summary = analyzeRuns(records);
  console.log(JSON.stringify(summary, null, 2));
}

if (require.main === module) {
  try {
    run();
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

module.exports = { run };
