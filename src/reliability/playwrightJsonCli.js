#!/usr/bin/env node
const fs = require('node:fs');
const { playwrightJsonToRecords } = require('./playwrightJsonAdapter');

function main(args = process.argv.slice(2)) {
  if (args.length !== 2) throw new Error('Usage: node src/reliability/playwrightJsonCli.js <run-id> <playwright-report.json>');
  const [runId, file] = args;
  const report = JSON.parse(fs.readFileSync(file, 'utf8'));
  process.stdout.write(JSON.stringify(playwrightJsonToRecords(report, runId), null, 2) + '\n');
}

if (require.main === module) {
  try { main(); } catch (error) { console.error(error.message); process.exitCode = 1; }
}
module.exports = { main };
