# Compare multiple test executions without manual JSON merging

Use `analyze:batch` with separate Jest or Playwright JSON reporter outputs. Supply a unique run ID for each report.

```bash
npm run analyze:batch -- jest ci-001 examples/sample-jest-results.json ci-002 examples/sample-jest-results-run2.json
```

For Playwright, replace `jest` with `playwright`. Do not mix formats in one invocation.

A run ID must uniquely identify an execution. Test IDs must remain stable across reports. Playwright's final retry is treated as the run result; a retry within one execution is not an independent run. Missing tests are not treated as skipped. Observed failure rates are descriptive, not predictions of future failures. Use only synthetic or authorized reports.
