const test = require('node:test');
const assert = require('node:assert/strict');
const { prioritizeTests } = require('../../src/reliability/priorityFromDependencies');

const records = [
  { testId: 'checkout', runId: '1', outcome: 'passed' },
  { testId: 'checkout', runId: '2', outcome: 'failed' },
  { testId: 'checkout', runId: '3', outcome: 'passed' },
  { testId: 'search', runId: '1', outcome: 'passed' },
  { testId: 'search', runId: '2', outcome: 'passed' },
  { testId: 'search', runId: '3', outcome: 'passed' }
];
const dependencies = [
  { testId: 'checkout', components: ['cart', 'payment'] },
  { testId: 'search', components: ['catalog'] }
];

test('prioritizes mixed outcomes and changed dependencies', () => {
  const ranked = prioritizeTests(records, dependencies, { changedComponents: ['payment'] });
  assert.equal(ranked[0].testId, 'checkout');
  assert.equal(ranked[0].mixedOutcomes, true);
  assert.deepEqual(ranked[0].impactedComponents, ['payment']);
  assert.equal(ranked[0].executed, 3);
  assert.equal(ranked[0].observedFailureRate, 1 / 3);
});

test('changed dependencies affect priority without inventing failures', () => {
  const ranked = prioritizeTests(records, dependencies, { changedComponents: ['catalog'] });
  const search = ranked.find(row => row.testId === 'search');
  assert.deepEqual(search.impactedComponents, ['catalog']);
  assert.equal(search.observedFailureRate, 0);
  assert.ok(search.priorityScore > 0);
});

test('reports missing history rather than assigning a failure probability', () => {
  const ranked = prioritizeTests([], [{ testId: 'new', components: ['api'] }]);
  assert.equal(ranked[0].observedFailureRate, null);
  assert.equal(ranked[0].executed, 0);
  assert.equal(ranked[0].insufficientEvidence, true);
});

test('includes tests missing from dependency mapping', () => {
  const ranked = prioritizeTests(records, []);
  assert.equal(ranked.length, 2);
  assert.ok(ranked.every(row => row.components.length === 0));
});

test('deduplicates components and caps dependency breadth points', () => {
  const entries = [{ testId: 'a', components: ['one','one','two','three','four','five','six'] }];
  const result = prioritizeTests([], entries)[0];
  assert.equal(result.components.length, 6);
  assert.equal(result.priorityScore, 10);
});

test('uses stable alphabetical order on equal scores', () => {
  const entries = [{ testId: 'b', components: [] }, { testId: 'a', components: [] }];
  assert.deepEqual(prioritizeTests([], entries).map(row => row.testId), ['a','b']);
});

test('rejects malformed dependency maps', () => {
  assert.throws(() => prioritizeTests([], null), /dependencies/);
  assert.throws(() => prioritizeTests([], [{testId:'',components:[]}]), /testId/);
  assert.throws(() => prioritizeTests([], [{testId:'x',components:['']}]), /components/);
  assert.throws(() => prioritizeTests([], [{testId:'x',components:[]},{testId:'x',components:[]}]), /Duplicate/);
  assert.throws(() => prioritizeTests([], [], {changedComponents:'api'}), /changedComponents/);
});
