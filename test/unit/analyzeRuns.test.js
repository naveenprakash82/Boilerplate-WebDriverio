const test = require('node:test');
const assert = require('node:assert/strict');
const { analyzeRuns } = require('../../src/reliability/analyzeRuns');

test('detects mixed outcomes across distinct runs', () => {
  const result = analyzeRuns([
    { testId: 'login', runId: '1', outcome: 'passed', durationMs: 100 },
    { testId: 'login', runId: '2', outcome: 'failed', durationMs: 200 },
    { testId: 'login', runId: '3', outcome: 'passed', durationMs: 150 }
  ])[0];
  assert.equal(result.classification, 'mixed-outcomes');
  assert.equal(result.failureRate, 1 / 3);
  assert.equal(result.averageDurationMs, 150);
  assert.equal(result.insufficientEvidence, false);
});

test('does not count skipped runs as failures or executions', () => {
  const result = analyzeRuns([
    { testId: 'checkout', runId: '1', outcome: 'skipped' },
    { testId: 'checkout', runId: '2', outcome: 'failed' }
  ])[0];
  assert.equal(result.executed, 1);
  assert.equal(result.skipped, 1);
  assert.equal(result.failureRate, 1);
  assert.equal(result.classification, 'consistently-failing');
  assert.equal(result.insufficientEvidence, true);
});

test('returns no-executions when everything was skipped', () => {
  const result = analyzeRuns([{ testId: 'search', runId: '1', outcome: 'skipped' }])[0];
  assert.equal(result.failureRate, null);
  assert.equal(result.classification, 'no-executions');
});

test('uses a stable order and reports passing results', () => {
  const result = analyzeRuns([
    { testId: 'z', runId: '1', outcome: 'passed' },
    { testId: 'a', runId: '1', outcome: 'passed' }
  ]);
  assert.deepEqual(result.map(item => item.testId), ['a', 'z']);
  assert.equal(result[0].classification, 'consistently-passing');
});

test('rejects duplicate results rather than overstating sample size', () => {
  assert.throws(() => analyzeRuns([
    { testId: 'a', runId: '1', outcome: 'passed' },
    { testId: 'a', runId: '1', outcome: 'failed' }
  ]), /Duplicate/);
});

test('rejects invalid outcomes and durations', () => {
  assert.throws(() => analyzeRuns([{ testId: 'a', runId: '1', outcome: 'unknown' }]), /Unknown/);
  assert.throws(() => analyzeRuns([{ testId: 'a', runId: '1', outcome: 'passed', durationMs: -5 }]), /durationMs/);
  assert.throws(() => analyzeRuns([{ testId: '', runId: '1', outcome: 'passed' }]), /nonempty/);
});

test('handles an empty input without inventing results', () => {
  assert.deepEqual(analyzeRuns([]), []);
});
