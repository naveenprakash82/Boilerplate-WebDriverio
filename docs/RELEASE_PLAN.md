# First public release plan

Status: **MIT license published. Release validation and versioned GitHub release are still pending. No npm release has been published.**

## Release goal

Offer a reproducible command-line utility for reviewing repeated test results and dependency-based test investigation priority. The first release should be suitable for evaluation, not advertised as an established predictive system.

## Release gates

- [x] Maintainer ownership confirmation received; MIT license added to the default branch
- [ ] Select a clear project and package name, check for name conflicts, and update repository description/topics
- [ ] Confirm the normal installation path on a fresh checkout with a pinned lockfile and supported Node version
- [ ] Run syntax checks, unit tests, and browser integration tests on the release commit
- [ ] Verify CLI results against the published sample files
- [ ] Define stable input schema, errors, and compatibility policy for Playwright and Jest adapters
- [ ] Add coverage for reporter version differences and invalid or incomplete inputs
- [ ] Compare output against a documented baseline on a permitted public or synthetic dataset
- [ ] Obtain independent technical feedback and address correctness issues
- [ ] Review security, dependency risks, licensing, privacy, and contributor acknowledgments
- [ ] Prepare a changelog and a GitHub release with a versioned tag
- [ ] Consider npm only after ownership confirmation, packaging checks, and approval; keep the package private until then

## Proposed first release notes, not yet published

**Initial evaluation release**

- Analyzes repeated passed, failed, and skipped test results without connecting to external services
- Reports observed failure frequencies, mixed outcomes, and timing-data coverage
- Includes adapters for supported subsets of Jest and Playwright JSON reports
- Provides a transparent dependency-aware prioritization heuristic using explicit component mappings
- Includes synthetic fixtures, tests, and documentation

**Limitations:** No calibrated prediction of future failures, no inferred source-code dependencies, no automated remediation, and no verified external adoption. Reporter compatibility must be assessed against specific upstream versions.

## Measuring adoption responsibly

Record independently submitted issues, externally authored pull requests, reproducible examples from permitted third parties, verified integrations, and references by unrelated maintainers. Stars and forks are weak signals alone. Do not request artificial engagement or overstate impact.
