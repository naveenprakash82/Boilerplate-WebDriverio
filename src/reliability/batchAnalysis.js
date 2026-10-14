const { analyzeRuns } = require('./analyzeRuns');
const { jestJsonToRecords } = require('./jestJsonAdapter');
const { playwrightJsonToRecords } = require('./playwrightJsonAdapter');

/**
 * Compare separate CI executions without manually merging reporter JSON.
 * Each run must have a unique caller-supplied ID. Adapters determine test
 * identity; absence from a run is not silently converted into a skip.
 */
function analyzeReportBatch(format, runs) {
  const adapters = { jest: jestJsonToRecords, playwright: playwrightJsonToRecords };
  if (!Object.hasOwn(adapters, format)) throw new TypeError('format must be jest or playwright');
  if (!Array.isArray(runs) || runs.length === 0) throw new TypeError('runs must be a nonempty array');
  const seen = new Set();
  const records = [];
  for (const run of runs) {
    if (!run || typeof run !== 'object' || Array.isArray(run) ||
      typeof run.runId !== 'string' || !run.runId.trim()) {
      throw new TypeError('Each run needs a nonempty runId and report');
    }
    if (seen.has(run.runId)) throw new Error('Duplicate runId: ' + run.runId);
    seen.add(run.runId);
    records.push(...adapters[format](run.report, run.runId));
  }
  return analyzeRuns(records);
}
module.exports = { analyzeReportBatch };
