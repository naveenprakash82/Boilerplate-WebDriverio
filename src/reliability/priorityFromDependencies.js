const { analyzeRuns } = require('./analyzeRuns');

/**
 * Prioritize tests for investigation using run history and an explicit
 * test-to-component dependency map. Scores are heuristic, not probabilities.
 */
function prioritizeTests(records, dependencies, options = {}) {
  if (!Array.isArray(dependencies)) throw new TypeError('dependencies must be an array');
  if (!options || typeof options !== 'object' || Array.isArray(options)) {
    throw new TypeError('options must be an object');
  }
  const changedComponents = options.changedComponents ?? [];
  if (!Array.isArray(changedComponents) ||
    changedComponents.some(name => typeof name !== 'string' || !name.trim())) {
    throw new TypeError('changedComponents must contain nonempty strings');
  }
  const changed = new Set(changedComponents);
  const history = new Map(analyzeRuns(records).map(item => [item.testId, item]));
  const mapping = new Map();

  for (const entry of dependencies) {
    if (!entry || typeof entry.testId !== 'string' || !entry.testId.trim() ||
      !Array.isArray(entry.components) || entry.components.some(
        name => typeof name !== 'string' || !name.trim()
      )) {
      throw new TypeError('Each dependency entry needs testId and string components');
    }
    if (mapping.has(entry.testId)) throw new Error('Duplicate dependency mapping: ' + entry.testId);
    mapping.set(entry.testId, new Set(entry.components));
  }

  const allTests = new Set([...history.keys(), ...mapping.keys()]);
  return [...allTests].map(testId => {
    const stats = history.get(testId);
    const components = [...(mapping.get(testId) ?? [])].sort();
    const impactedComponents = components.filter(component => changed.has(component));
    const executed = stats?.executed ?? 0;
    const failureRate = stats?.failureRate ?? null;
    const hasMixedOutcomes = stats?.classification === 'mixed-outcomes';

    // Fixed, deliberately transparent weights: useful for ordering work,
    // not a statistically calibrated likelihood of a future failure.
    const historicalFailurePoints = failureRate === null ? 0 : 40 * failureRate;
    const mixedOutcomePoints = hasMixedOutcomes ? 20 : 0;
    const changeImpactPoints = impactedComponents.length > 0 ? 30 : 0;
    const breadthPoints = Math.min(components.length, 5) * 2;
    const priorityScore = Math.round(
      historicalFailurePoints + mixedOutcomePoints + changeImpactPoints + breadthPoints
    );
    return {
      testId,
      priorityScore,
      observedFailureRate: failureRate,
      executed,
      mixedOutcomes: hasMixedOutcomes,
      components,
      impactedComponents,
      insufficientEvidence: executed < 3
    };
  }).sort((left, right) => right.priorityScore - left.priorityScore ||
    left.testId.localeCompare(right.testId));
}

module.exports = { prioritizeTests };
