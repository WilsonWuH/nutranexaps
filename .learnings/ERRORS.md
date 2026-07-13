## [ERR-20260713-001] hardcoded-playwright-runtime-path

**Logged**: 2026-07-13T00:00:00+08:00
**Priority**: medium
**Status**: resolved
**Area**: browser

### Summary
The browser verification script relied on a cached Playwright path from another Windows user profile and failed because that cache lacked `playwright-core`.

### Error
```text
Error: Cannot find module 'playwright-core'
Require stack: ...codex-primary-runtime...playwright\index.js
```

### Context
- Task attempted: Render Korean and Turkish pages for responsive visual QA.
- Command/tool/API: `npm run verify:markets:browser`
- Environment: Windows, local Next.js production server.

### Suspected Cause
The runtime path was copied from an older script and was not portable across Codex desktop installations.

### Suggested Fix
Use project-local Playwright packages and the installed system Chrome executable. Never hardcode a Codex cache path in repository tests.

### Metadata
- Reproducible: yes
- Related files: `tools/verify_market_browser.mjs`
- Tags: playwright, windows, browser-qa, portability
