#!/usr/bin/env node
const fs = require('node:fs');
const { analyzeReportBatch } = require('./batchAnalysis');

function run(args = process.argv.slice(2)) {
  if (args.length < 3 || args.length % 2 !== 1) {
    throw new Error('Usage: npm run analyze:batch -- <jest|playwright> <runId> <report.json> [<runId> <report.json> ...]');
  }
  const [format, ...pairs] = args;
  const runs = [];
  for (let i = 0; i < pairs.length; i += 2) {
    runs.push({ runId: pairs[i], report: JSON.parse(fs.readFileSync(pairs[i + 1], 'utf8')) });
  }
  process.stdout.write(JSON.stringify(analyzeReportBatch(format, runs), null, 2) + '\n');
}
if (require.main === module) {
  try { run(); } catch (error) { console.error(error.message); process.exitCode = 1; }
}
module.exports = { run };
