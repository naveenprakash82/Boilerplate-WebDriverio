# Production-readiness gates for external adoption

**Status: experimental test reliability toolkit, not production-grade.** These six gates must be supported by reproducible evidence before describing a version as production-ready. The review checklist distinguishes an engineer-feedback preview from a production release.

| Gate | Requirement | Status as of 18 Oct 2026 | Acceptance evidence |
| --- | --- | --- | --- |
| 1. Core functionality | Correct run summaries, error and status handling, failure classifications, skipped vs missing runs and duplicate detection | Partially met | Edge-case unit/integration tests, independent reporter fixtures, regression coverage and passing CI |
| 2. Technical differentiation | Clear, honest comparison with Allure, ReportPortal and similar existing tools | Open | Feature-by-feature comparison citing primary documentation; identify where existing tools are better and avoid unsupported novelty claims |
| 3. Production readiness | Reliable installation, version support, safe failure handling, CI, dependency updates and versioned releases | Open | Clean installation with lockfile, documented supported environment, CI matrix, security review, release tag and tested install procedure |
| 4. Independent reproducibility | Engineer outside the author team can clone and run documented examples | Partially met | Fresh isolated checkout tested against guide with recorded commands, output and environment; permissioned external reproduction |
| 5. Technical evidence | Meaningful comparisons and published limitations | Partially met | Hold-out data benchmark and baselines with provenance, failures, results, evaluation script and methodology |
| 6. Community readiness | README, MIT license, issues, contributions and release governance | Mostly met | Checked issue forms, code of conduct/contact, contributing guide, honest changelog, roadmap and maintainer response process |

## Outreach classification

- **Early engineering feedback:** reasonable after CI and 15-minute evaluation work; describe the software as a prototype.
- **Production adoption invitation:** wait until all release gates pass, including independent reproducibility and benchmark claims that survive scrutiny.
- **Independent-use evidence:** distinguish feedback, successful reproduction, accepted technical fixes and verifiable downstream integration. Publishing a repository alone does not establish adoption.

## Required technical follow-up

1. Validate the in-progress `feature/ci-report-manifest` change, including its threat model, symlinks, malformed files and size limits. Merge only after review.
2. Add safe JUnit XML interoperability using a maintained XML parser and explicit unsupported document handling.
3. Obtain a reproducible `npm ci` installation via lockfile, verify supported Node/Chrome combinations and add artifact retention guidance.
4. Compare the actual capabilities with Allure and ReportPortal after consulting their official current documentation.
5. Test ranking against held-out outcomes; descriptive rank agreement alone is not validation.
6. Prepare an independently run pilot and obtain permission before attributing an employer or engineer to feedback.

Maintain the [evaluation instructions](EXTERNAL_EVALUATION.md) and [independent use guidance](INDEPENDENT_USE.md). Do not add badges asserting production-readiness or adoption before there is evidence.
