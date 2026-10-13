# Contributing

This project is a small test reliability utility with independent examples for WebdriverIO, Jest, and Playwright. Focused fixes, reproducible failures, and practical interoperability improvements are welcome.

## Before starting

1. Open an issue describing the problem, expected behavior, and a small reproduction. Check existing issues and pull requests to avoid duplicate work.
2. Use public or synthetic test data. Never share employer source code, internal pipelines, customer information, credentials, or proprietary test reports.
3. Keep the scope narrow and discuss larger changes before implementation.

## Development

Requirements: Node.js 22, npm, and Chrome or Chromium for browser tests.

```bash
npm install
npm run check
npm run test:unit
npm test
```

Run the analyzer with `npm run analyze -- examples/sample-runs.json`. Try the dependency ranking example with `npm run prioritize -- examples/sample-runs.json examples/sample-dependencies.json examples/sample-changed-components.json`.

## Pull requests

Describe the specific problem, solution, example input and output, limitations, and tests executed. Include a regression test when fixing a bug. Explain whether the behavior is intentionally compatible with a public test-result format.

Keep issue titles, commit messages, and pull request descriptions factual. Do not claim speedups, predictive accuracy, independent adoption, or production compatibility without reproducible evidence.

If AI tools materially assisted with generating code or tests, disclose that help when submitting a contribution, and personally review and verify the result. Contributors are responsible for understanding the change.

## Licensing

A proposed MIT license is under ownership review. Until a license is published on the default branch, do not assume that the repository grants reuse or redistribution rights. Submissions should not include material that you lack permission to contribute.
