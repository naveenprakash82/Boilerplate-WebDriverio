#!/usr/bin/env node
const fs = require('node:fs');
const path = require('node:path');
const { analyzeReportBatch } = require('./batchAnalysis');

function run(args = process.argv.slice(2)) {
  if (args.length < 3 || args.length % 2 !== 1) {
    throw new Error('Usage: npm run analyze:batch -- <jest|playwright> <runId> <report.json> [<runId> <report.json> ...]');
  }
  const [format, ...pairs] = args;
  const runs = [];
  const seenPaths = new Set();
  for (let i = 0; i < pairs.length; i += 2) {
    const file = pairs[i + 1];
    let canonicalPath;
    let report;
    try {
      canonicalPath = fs.realpathSync(path.resolve(file));
      if (seenPaths.has(canonicalPath)) throw new Error('Duplicate report file');
      seenPaths.add(canonicalPath);
      report = JSON.parse(fs.readFileSync(canonicalPath, 'utf8'));
    } catch (error) {
      throw new Error('Failed to read ' + file + ': ' + error.message);
    }
    runs.push({ runId: pairs[i], report });
  }
  process.stdout.write(JSON.stringify(analyzeReportBatch(format, runs), null, 2) + '\n');
}
if (require.main === module) {
  try { run(); } catch (error) { console.error(error.message); process.exitCode = 1; }
}
module.exports = { run };
