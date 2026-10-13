# Test history and dependency mapping

This example combines a test's observed run history with an explicitly maintained map of the application components it touches. It helps a reviewer decide which tests to investigate first after changes to those components.

## Run the example

```bash
npm run prioritize -- examples/sample-runs.json examples/sample-dependencies.json examples/sample-changed-components.json
```

Inputs are three JSON files:

1. A list of test outcomes already supported by the reliability analyzer
2. A list of mappings such as `{ "testId": "sample login", "components": ["authentication", "session"] }`
3. An optional array of changed component names such as `["authentication"]`

The example data and component names are synthetic. All dependencies are declared by hand. The utility does not inspect source code or infer dependency relationships.

## What the score means

The `priorityScore` adds four deliberately simple signals:

* Up to 40 points from observed failure frequency
* 20 points if a test has both passed and failed in the supplied history
* 30 points if the test maps to at least one changed component
* Up to 10 points for the number of distinct mapped components

This is a **heuristic ranking**, not a predicted probability of failure. These weights are not trained or validated on real world datasets. Tests with fewer than three executions are marked `insufficientEvidence`. Unknown failure frequency is returned as `null`, not zero.

A score must not be used as the sole reason to skip a test or block a release. Dependency maps can be incomplete and historical failures can have many unrelated causes.

## Research direction

A future evaluation could compare test ordering against a simple baseline on an approved public dataset. Such an evaluation would need an explicit train/test split, recorded outcomes, reproducible scripts and clear reporting of any improvements or failures. Until then, avoid calling this a predictive model or claiming it mitigates flakiness.

## Privacy

Do not copy employer dependency maps, release plans, private test histories, service names, incident records or internal architecture diagrams into public repositories. Generate synthetic examples or use independently available public datasets with appropriate permissions.
