## [LRN-20260713-001] portable-browser-tests

**Logged**: 2026-07-13T00:00:00+08:00
**Priority**: medium
**Status**: promoted
**Area**: tests

### Summary
Browser tests in this repository must resolve dependencies locally and use an explicitly detected system browser.

### Details
Codex runtime cache locations and their transitive package contents vary by machine and user profile. A cached `playwright` folder may exist without `playwright-core`.

### Rule for Future Runs
Do not import Playwright from a hardcoded user cache path; use the project dependency and configure the available Chrome or Edge executable.

### Metadata
- Source: error
- Related files: `tools/verify_market_browser.mjs`, `package.json`
- Tags: browser, testing, portability
