# Compare separate Jest or Playwright CI reports

Use `npm run analyze:batch -- jest <runId> <report.json> [<runId> <report.json> ...]`, replacing `jest` with `playwright` for Playwright JSON output.

Run IDs are trimmed and must be unique. The CLI rejects repeated report file paths, including symlinks to the same file. The CLI warns when distinct files have byte-identical content or equivalent parsed JSON despite differences in whitespace or object-key order. These warnings are not proof that the reports came from the same execution. The tool does not attempt to detect identical reports with different metadata. Use independently generated CI artifacts. Do not mix reporter formats in one invocation.

Each test summary includes `totalRuns`, `observedRuns`, `runsSeen`, and `missingRuns`. Missing tests are not counted as skipped. Failure rates use executed outcomes only, so compare rates together with observation coverage and `insufficientEvidence`. The Playwright adapter uses the final retry outcome per run; retries do not count as independent executions.

This analysis is descriptive, not predictive. Only use synthetic or authorized test reports.
