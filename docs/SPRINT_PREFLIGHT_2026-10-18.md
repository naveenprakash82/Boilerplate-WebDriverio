# Adoption-readiness preflight — 18 October 2026

This is a repository and GitHub Actions audit before the planned 19–23 October sprint. It is **not** an independent clean-checkout test or a production-readiness certification.

## Verified repository state

- Default branch: `master`, commit [`d17e0ab857a0`](https://github.com/naveenprakash82/Boilerplate-WebDriverio/commit/d17e0ab857a0342ea2c82290eba11f3a6b5d5fc6) as inspected on 18 October.
- The latest inspected [Browser tests workflow run](https://github.com/naveenprakash82/Boilerplate-WebDriverio/actions/runs/39066453342) completed successfully on 17 October. The job reports successful dependency installation, JavaScript syntax checking, unit tests and browser tests on GitHub-hosted Ubuntu with Node.js 22.
- The workflow uses `npm install --no-audit --no-fund`. No `package-lock.json` is present in the inspected `master` tree. Therefore `npm ci` is **not** an available documented reproduction step yet; dependency versions are not fully pinned.
- Jest and Playwright JSON adapters are present. A JUnit XML adapter is **not** present on the inspected default branch.
- `npm run compare:priorities` and a synthetic ranking comparison guide are present. They report rank differences, not held-out predictive performance.
- A separate `feature/ci-report-manifest` branch exists, but its implementation and safety have **not** been verified or merged by this audit.
- The getting-started guide contained a literal escaped newline between steps 4 and 5; the accompanying review-branch change corrects the formatting.

## Fresh-checkout commands to verify on 19 October

Use a clean, permissioned environment with Node.js 22 and npm. Record the Node/npm versions, operating system, repository SHA, exit codes and command output.

```bash
git clone https://github.com/naveenprakash82/Boilerplate-WebDriverio.git
cd Boilerplate-WebDriverio
git rev-parse HEAD
node --version
npm --version
npm install --no-audit --no-fund
npm run check
npm run test:unit
npm run analyze -- examples/sample-runs.json
npm run analyze:batch -- jest ci-001 examples/sample-jest-results.json ci-002 examples/sample-jest-results-run2.json
npm run compare:priorities -- examples/sample-runs.json examples/sample-dependencies.json examples/sample-changed-components.json
npm test
```

The final browser command needs a working Chrome/Chromium installation. Do not describe this command sequence as locally passed until its output is captured. Do not run `npm ci` until a tested lockfile has been committed.

## Acceptance criteria before requesting external reviews

1. A fresh checkout reproduces the published commands, or the guide documents exact limitations and fixes.
2. JUnit XML input is rejected safely unless a tested, explicitly scoped parser is implemented.
3. Ranking comparisons disclose their dataset and distinguish ordering differences from predictive wins.
4. CI artifact collection instructions identify independent runs and do not silently imply persistent history.
5. Maintainer review approves the actual tested scope and external evaluation guide.

Only synthetic or permission-cleared data should be used.
