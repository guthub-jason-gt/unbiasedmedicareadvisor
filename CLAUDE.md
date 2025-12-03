# Unbiased Medicare Advisor - Project Notes

## Phone Number Format
**Always display as: (850) 810-1000** (with parentheses around area code)

## Hosting
- **Platform:** Vercel (not GitHub Pages)
- **Repo:** https://github.com/guthub-jason-gt/unbiasedmedicareadvisor
- **Live site:** https://unbiasedmedicareadvisor.com

## Build System
- **Build command:** `node build.js`
- **Partials location:** `/partials/` (header.html, footer.html, scripts.html)
- **Source files:** `/src/` - all 20 pages use `{{HEADER}}`, `{{FOOTER}}`, `{{SCRIPTS}}` placeholders
- **Output:** Root folder HTML files (don't edit these directly)

### To Make Site-Wide Changes:
1. Edit the appropriate partial in `/partials/`
2. Run `node build.js`
3. All 20 pages will be regenerated
4. `git add . && git commit -m "message" && git push`
5. Vercel auto-deploys (takes ~30 seconds)

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
