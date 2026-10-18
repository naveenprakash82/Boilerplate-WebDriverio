# External adoption readiness sprint — 19–23 October 2026

**Owner:** Naveen Prakash. **External sharing target:** Friday, 23 October 2026, after maintainer review and a verified release-readiness assessment. If production release gates are not met, share only as an accurately labelled technical preview.

## Goal

Make the current test reliability toolkit independently reproducible and useful enough to solicit specific engineering evaluations. This is **not** a plan to generate stars, endorsements, artificial references or an EB-1A impact claim. No external adoption has yet been established.

## Priority gates before outreach

- [ ] **Reproduce baseline:** fresh clone, supported Node version, `npm ci` where lockfile allows, syntax/unit/browser CI, and documented sample commands. Save run links or reproducible logs.
- [ ] **JUnit XML interoperability:** implement a conservative adapter for well-defined JUnit report variations, with documented limitations, explicit invalid-input errors, tests, and sample report. Do not parse XML with ad-hoc regex or process external entities.
- [ ] **Baseline comparison:** compare dependency-based ranking with plain observed failure frequency on disclosed, reproducible synthetic/public scenarios. Report wins, ties, failures and data limitations. Do not claim a predictive advantage without evidence.
- [ ] **CI workflow usability:** document how teams produce/retain independently identified reports across runs. A GitHub Action or persistent history service is only released after its permissions, data retention and failure semantics are tested.
- [ ] **Identity and usability:** align top-level README/product terminology; evaluate a repository rename and package-name collision/compatibility separately before changing existing clone links.
- [ ] **External evaluator experience:** test [15-minute guide](EXTERNAL_EVALUATION.md) exactly as written and verify the [feedback template](../.github/ISSUE_TEMPLATE/pilot-feedback.md) is selectable on GitHub.
- [ ] **Release/claims review:** ensure outputs, docs, MIT license, version, and unsupported capabilities are truthful. No claim of independent adoption before evidence exists.

## Proposed execution sequence

| Date | Task | Evidence to retain |
| --- | --- | --- |
| Mon 19 Oct | Fresh-checkout and docs audit; identify actual CI/report issues | Command transcripts, CI URL, issue/commit links |
| Tue 20 Oct | JUnit XML adapter with regression fixtures and malformed input tests | Verified tests and clearly scoped reporter compatibility |
| Wed 21 Oct | Baseline ranking comparison and transparent limitations | Versioned dataset, script, result summary |
| Thu 22 Oct | CI integration example and repeatable multi-run history instructions | Public end-to-end reproduction and artifacts |
| Fri 23 Oct | Final release-readiness review with Naveen, then publish/share externally if approved; label the release according to verified readiness | PASS/FAIL gate checklist, approved outreach copy, public URL and any actual sent-date log |

October 23 is the target for external publication or sharing, not a guarantee of production-grade status. If any critical production gate remains open, do not describe the toolkit as production-ready; share a clearly identified experimental evaluation build only if Naveen approves.

## External review program

Aim to invite 10–15 relevant engineers, starting with technical peers in QA infrastructure, test automation and CI systems. Ask for a genuine hands-on check or code review, not a star, testimonial or endorsement. Prefer concise personalized messages linking to the specific 15-minute guide.

Track each invited person's *permitted public* organization/role, date, whether the evaluation was hands-on, what they found, any accepted improvements, and whether a separate project actually integrated the code. Obtain consent before identifying individuals, employers or quoting comments. Do not store private contact details or internal test artifacts in this public repo.

## EB-1A evidentiary standard

Attorney feedback identified the critical gap as verified influence/adoption outside Yahoo. A newly published tool, a few GitHub stars, feedback, an accepted patch in an unrelated project, and genuine third-party integration are different evidence categories. Do not conflate them.

Maintain a separate verified record of past contributions, third-party integration evidence, permissions and technical impact for counsel; avoid turning this public engineering repository into immigration promotional material.

See [independent-use documentation](INDEPENDENT_USE.md).
