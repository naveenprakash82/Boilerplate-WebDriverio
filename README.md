# WebdriverIO Test Reliability Examples

This project brings together small browser tests and a transparent way to review repeated test outcomes. It is intended for engineers who want to understand test failures, keep examples reproducible and make their automation easier to maintain.

The browser tests use a locally generated sample sign in page. A separate JavaScript utility summarizes repeated test outcomes and distinguishes consistent results from runs that contain both passes and failures.

## Getting started

Requirements: Node.js 22, npm and Chrome or Chromium.

```bash
npm install
npm test
npm run test:unit
```

To check syntax or run the smoke scenario:

```bash
npm run check
npm run test:smoke
```

## Analyze repeated test results

```bash
npm run analyze -- examples/sample-runs.json
```

The input is a JSON array of test identifiers, execution identifiers and outcomes. The utility reports execution counts, failure rates, skipped runs and whether passing and failing outcomes were both observed. It does not claim to identify the underlying cause of failure.

See [the reliability analysis guide](docs/reliability-analysis.md) for the input format, interpretation and limitations. The example data is entirely synthetic.

## Project contents

* [Browser test scenarios](test/specs/login.e2e.js), [page object](test/pageobjects/login.page.js) and [locally defined page](test/fixtures/loginFixture.js)
* [Result based wait helper](test/helpers/waitForResult.js)
* [Independent result analysis](src/reliability/analyzeRuns.js) and [unit tests](test/unit/analyzeRuns.test.js)
* [Guidance for investigating unstable tests](docs/flaky-tests.md)
* [Automated checks](.github/workflows/browser-tests.yml)

## Scope and limitations

This repository demonstrates a small engineering approach, not a proven new industry method or a production grade reliability service. Its failure categories are descriptive. Reproducibility and independent assessment matter more than collecting repository activity. External adoption, practical performance and meaningful comparison with existing tools have not yet been established.

## Contributing

Please start with an issue explaining the problem and a small reproducible example. Changes should include tests and a clear explanation of their expected benefit. Feedback and independent evaluation are welcome.

## Privacy and ownership

All example results are invented and all demonstration code is written for this repository. Do not submit employer or client source code, internal test data, private incident reports, credentials, customer information or confidential system details. Check ownership and approval before sharing anything derived from work projects.
