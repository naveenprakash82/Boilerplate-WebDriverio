#!/usr/bin/env node
const fs = require('node:fs');
const { prioritizeTests } = require('./priorityFromDependencies');

function run(args = process.argv.slice(2)) {
  if (args.length < 2 || args.length > 3) {
    throw new Error('Usage: node src/reliability/priorityCli.js <runs.json> <dependencies.json> [changes.json]');
  }
  const [runsFile, dependenciesFile, changesFile] = args;
  const runs = JSON.parse(fs.readFileSync(runsFile, 'utf8'));
  const dependencies = JSON.parse(fs.readFileSync(dependenciesFile, 'utf8'));
  const changes = changesFile ? JSON.parse(fs.readFileSync(changesFile, 'utf8')) : [];
  process.stdout.write(JSON.stringify(prioritizeTests(runs, dependencies,
    { changedComponents: changes }), null, 2) + '\n');
}

if (require.main === module) {
  try { run(); } catch (error) { console.error(error.message); process.exitCode = 1; }
}
module.exports = { run };
