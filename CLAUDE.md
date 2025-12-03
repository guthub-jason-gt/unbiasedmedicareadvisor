# Unbiased Medicare Advisor - Project Notes

## CURRENT PROJECT: Extract CSS to External File

### Why
- Each page has 200+ lines of duplicated CSS
- External CSS file = browser caching, faster loads, easier updates
- No rebuild needed for CSS changes

### Chunk Breakdown

**Chunk 1: Extract CSS and create external file** - STATUS: COMPLETE
- Command: `"Extract shared CSS from source files into /css/styles.css"`
- Tasks:
  - Read src/index.html to get full shared CSS - DONE
  - Create `/css/styles.css` with shared styles - DONE (900+ lines)
  - Update this file with progress - DONE
- **File created:** `/css/styles.css`
- **Includes:** CSS variables, reset, buttons, header/nav, mobile nav, page headers, hero, services, guides, state selector, CTA, footer, top bar, back-to-top button, responsive styles

**Chunk 2: Update header partial to link CSS** - STATUS: COMPLETE
- Command: `"Add CSS link to header partial"`
- Tasks:
  - ✅ Add `<link rel="stylesheet" href="/css/styles.css">` to `/partials/header.html`
  - ✅ Ran `node build.js` - all 20 pages now include CSS link
  - ✅ Update this file with progress

**Chunk 3: Remove inline styles (batch 1 - 10 pages)** - STATUS: COMPLETE
- Command: `"Remove inline shared CSS from batch 1 pages (see CLAUDE.md for list)"`
- Pages updated:
  - ✅ src/index.html - removed all inline CSS (no page-specific styles)
  - ✅ src/about/index.html - kept page-specific styles (~90 lines)
  - ✅ src/contact/index.html - kept page-specific styles (~110 lines)
  - ✅ src/faq/index.html - kept accordion styles (~90 lines)
  - ✅ src/book-consultation/index.html - kept booking styles (~130 lines)
  - ✅ src/privacy-policy/index.html - kept legal content styles (~45 lines)
  - ⏭️ src/guides/index.html - does not exist (skipped)
  - ✅ src/guides/medigap-vs-medicare-advantage/index.html - kept guide styles (~90 lines)
  - ✅ src/guides/turning-65-medicare-guide/index.html - kept guide styles (~90 lines)
  - ✅ src/guides/medicare-parts-explained/index.html - kept guide styles (~100 lines)
- ✅ Ran `node build.js` - all 20 pages built successfully

**Chunk 4: Remove inline styles (batch 2 - remaining pages)** - STATUS: IN PROGRESS
- Command: `"Remove inline shared CSS from batch 2 pages, run build, verify"`
- Pages to update (11 total):
  - ✅ src/services/medicare-consultant/index.html - DONE
  - ✅ src/services/fee-only-medicare-advisor/index.html - DONE
  - ✅ src/services/independent-medicare-advisor/index.html - DONE
  - ✅ src/services/medicare-plan-comparison/index.html - DONE
  - ✅ src/services/enrollment-assistance/index.html - DONE
  - ✅ src/states/index.html - DONE
  - ✅ src/states/florida/index.html - DONE (restored and fixed)
  - ✅ src/states/texas/index.html - DONE (December 3, 2025)
  - [ ] src/states/california/index.html
  - [ ] src/states/ohio/index.html
  - [ ] src/states/arizona/index.html

### REMAINING: 3 State Pages (California, Ohio, Arizona)
Split into mini-chunks due to token limits. Prompts saved in `/Users/jasonbaar/Desktop/claudefolder/Prompts/`:
- Chunk4a-Texas.txt
- Chunk4b-California.txt
- Chunk4c-Ohio.txt
- Chunk4d-Arizona.txt (includes verification + commit/push)

**Use Florida as template** - see src/states/florida/index.html lines 16-50 for correct page-specific styles

- Keep page-specific styles inline (like service cards, state-specific styling)
- Run `node build.js`
- Test that pages load correctly
- Update this file to mark COMPLETE

---

## Prompts Location
When creating prompts for the user, save them to: `/Users/jasonbaar/Desktop/claudefolder/prompts/`

---

## Phone Number Format
**Always display as: (850) 810-1000** (with parentheses around area code)

## Hosting
- **Platform:** Vercel (not GitHub Pages)
- **Repo:** https://github.com/guthub-jason-gt/unbiasedmedicareadvisor
- **Live site:** https://unbiasedmedicareadvisor.com

## Build System
- **Build command:** `node build.js`
- **Partials location:** `/partials/` (header.html, footer.html, scripts.html)
- **Source files:** `/src/` - use `{{HEADER}}`, `{{FOOTER}}`, `{{SCRIPTS}}` placeholders
- **Output:** Root folder HTML files (don't edit these directly)

### Current Partial Usage:
- `{{HEADER}}` - **All 20 pages** use this partial
- `{{FOOTER}}` - **All 20 pages** use this partial
- `{{SCRIPTS}}` - **All 20 pages** use this partial

### To Make Site-Wide Changes:
1. Edit the appropriate partial in `/partials/`
2. Run `node build.js`
3. All 20 pages will be regenerated
4. `git add . && git commit -m "message" && git push`
5. Vercel auto-deploys (takes ~30 seconds)

## Creating New Pages

**IMPORTANT:** When creating any new HTML page, ALWAYS use this template structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Title | Unbiased Medicare Advisor</title>
    <meta name="description" content="Page description here">
    <!-- page-specific styles if needed -->
</head>
<body>
    {{HEADER}}

    <!-- Page content here -->

    {{FOOTER}}

    {{SCRIPTS}}
</body>
</html>
```

- Create new pages in `/src/` directory
- Always include all 3 partials: `{{HEADER}}`, `{{FOOTER}}`, `{{SCRIPTS}}`
- Run `node build.js` after creating the page
- Never create pages directly in the root folder

## Footer & Scripts Partials Conversion - COMPLETED

All 20 pages now use all 3 partials (`{{HEADER}}`, `{{FOOTER}}`, `{{SCRIPTS}}`).
Any site-wide change only requires editing one partial file.

## File Structure
```
/partials/
  header.html    <- Edit this for header/nav/top bar changes
  footer.html    <- Edit this for footer changes
  scripts.html   <- Edit this for JavaScript changes

/src/            <- Source files with {{PLACEHOLDER}} tags (edit these)
/                <- Built/output HTML files (don't edit directly)

vercel.json      <- Tells Vercel to serve static files (no build)
package.json     <- Local build script only
build.js         <- Combines partials with src files
```

## Top Bar Implementation

### How It Works
The top bar is in `/partials/header.html` which includes:
1. A `<style>` block with `!important` rules that override page-specific CSS
2. The top bar HTML with the phone number

### Key CSS Rules (in partials/header.html)
```css
.top-bar {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    background: #1a365d !important;
    color: white !important;
    padding: 8px 20px !important;
    z-index: 1001 !important;
}
.header { top: 36px !important; }
.hero, .page-header, .guide-header { padding-top: calc(var(--header-height, 80px) + 36px + 2rem) !important; }
```

### Why These CSS Rules Are Needed
- The header uses `position: fixed; top: 0;` which was covering the top bar
- Top bar needs `z-index: 1001` (higher than header's 1000)
- Header needs `top: 36px` to sit below the 36px-tall top bar
- Hero/page sections need extra padding to account for the top bar

## Vercel Deployment

### Important: vercel.json
The `vercel.json` file is critical. It tells Vercel to serve static files WITHOUT running the build script:
```json
{
  "buildCommand": null,
  "outputDirectory": "."
}
```

Without this file, Vercel sees `package.json` and tries to run `npm run build`, which fails.

### Checking Deployment Status
```bash
gh api repos/guthub-jason-gt/unbiasedmedicareadvisor/deployments --jq '.[0] | {id, sha, created_at}'
gh api repos/guthub-jason-gt/unbiasedmedicareadvisor/deployments/DEPLOYMENT_ID/statuses --jq '.[0] | {state, description}'
```

## Troubleshooting

### Site not updating after push?
1. Check deployment status (see commands above)
2. If deployment failed, check for vercel.json issues
3. Hard refresh browser (Cmd+Shift+R) or use incognito
4. Vercel may cache - wait 1-2 minutes

### Deployment failing?
- Make sure `vercel.json` exists with `"buildCommand": null`
- Check that all HTML files are valid
