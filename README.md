# Tiamatrix website — first build

A static, single-column product introduction: overview, installation, first ten minutes, and source/privacy. No backend, cookies, analytics, remote fonts or runtime dependencies. Body text is 19px; the theme follows the device and can be switched on each page.

## Build and review

Node 22: `npm ci`, then `npm run build`. Output is `dist/`.

Browser checks run **only in public GitHub Actions**, never on the workstation. The workflow uses Playwright's bundled Chromium to discover every generated HTML page and render it at 390×844 and 1440×900, in light and dark mode. It captures full-page screenshots, checks internal links and anchors, external destinations, missing resources, console errors, runtime errors, horizontal overflow, base text size and the theme button. Both screenshots and the static build are artifacts. A passing workflow is required before any deployment.

`npm run serve` is a loopback-only test server used by CI. It is not a public handoff URL.

## Publishing boundary

No production publishing is authorised. No GitHub-to-Vercel automatic deployment integration is configured. **Do not deploy this new Vercel project again:** Vercel forces a first deployment to production even with `--target=preview`. The first attempted preview was immediately removed after Vercel returned a production target. Both URLs returned 404 afterwards; no deployment remains. See PLAN.md for the incident and evidence. Andrea must decide the hosting route before another attempt. No domain purchase or plan upgrade was made.

## Files

- `src/pages.mjs`: source-grounded copy for all four pages.
- `src/style.css`, `src/theme.js`, `src/mark.svg`: design and local assets.
- `scripts/build.mjs`: dependency-free static build.
- `tests/site.spec.mjs`: public-CI browser review.
- `PLAN.md`: plan, source audit, domain findings and open questions.

The network and approval illustrations are original HTML/CSS examples, explicitly labelled, with no personal or client information. They are not screenshots of a running Tiamatrix app.

No upstream license is asserted. The public product snapshot has no root LICENSE file at the audited commit. See PLAN.md.
