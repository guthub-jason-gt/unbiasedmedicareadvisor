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
- **Source files:** `/src/` - use `{{HEADER}}`, `{{FOOTER}}`, `{{SCRIPTS}}` placeholders
- **Output:** Root folder HTML files (don't edit these directly)

### Current Partial Usage:
- `{{HEADER}}` - **All 24 pages** use this partial
- `{{FOOTER}}` - **17 pages** use this partial (7 have hardcoded footers)
- `{{SCRIPTS}}` - **17 pages** use this partial (7 have hardcoded scripts)

### Current Page Count: 46 pages
- 7 Core pages (Home, About, Contact, Contact Thank You, Book Consultation, FAQ, Privacy)
- 5 Service pages
- 6 Guide pages (ALL COMPLETE as of Dec 3, 2025)
- 1 States index + 15 State pages (AZ, CA, CT, FL, GA, MA, MN, MO, NC, NY, OH, OR, PA, TX, WA)
- 1 Guides index
- 1 Blog index + 10 Blog posts

### To Make Site-Wide Changes:
1. Edit the appropriate partial in `/partials/`
2. Run `node build.js`
3. All 24 pages will be regenerated
4. `git add . && git commit -m "message" && git push`
5. Vercel auto-deploys (takes ~30 seconds)

## TODO: Convert Footer & Scripts to Partials

### Problem
7 src files still have hardcoded footers and scripts instead of using `{{FOOTER}}` and `{{SCRIPTS}}`:
- src/about/index.html
- src/contact/index.html
- src/faq/index.html
- src/book-consultation/index.html
- src/states/index.html
- src/states/ohio/index.html
- src/states/arizona/index.html

This means footer/script changes require editing these 7 files manually.

### Solution
Convert these 7 files to use `{{FOOTER}}` and `{{SCRIPTS}}` placeholders. After conversion:
- All 20 pages will use all 3 partials
- Any site-wide change only requires editing one file

### Status: IN PROGRESS

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

---

## Rollback Reference Points

### Site before NY, MA and MN (December 5, 2025)
- **Commit:** `e780b5a`
- **Command to rollback:** `git reset --hard e780b5a && git push --force`
- **State:** 8 state pages (AZ, CA, FL, GA, NC, OH, PA, TX), 39 total pages
- **Description:** Last stable state before adding New York, Massachusetts, Minnesota special rules states

---

## Progress Update - December 3, 2025

**ALL 6 GUIDES COMPLETE!**

Guides live:
1. /guides/medigap-vs-medicare-advantage/
2. /guides/turning-65-medicare-guide/
3. /guides/medicare-parts-explained/
4. /guides/medicare-enrollment-periods/
5. /guides/medicare-supplement-plans/
6. /guides/medicare-advantage-pros-cons/

**Next:** Create blog index page (/blog/) and start blog posts

---

## Progress Update - December 4, 2025

**Added 3 New State Pages (PA, GA, NC)**

Successfully tested parallel AI agent approach for creating state pages. All 3 new state pages:
- Pennsylvania: /states/pennsylvania/
- Georgia: /states/georgia/
- North Carolina: /states/north-carolina/

Total state pages now: 8 (Arizona, California, Florida, Georgia, North Carolina, Ohio, Pennsylvania, Texas)

**Agent Approach Notes:**
- Launched 3 Task agents in parallel, each with state-specific data
- Each agent copied Texas template structure exactly
- Quality review before deployment confirmed all pages matched template structure
- Approach saves significant time vs sequential page creation

---

## State Page Batch Workflow

**IMPORTANT: Clear memory between batches** to give agents fresh context.

### How to Run a Batch:
1. User clears memory and starts new session
2. User types: `Read and execute /Users/jasonbaar/Desktop/claudefolder/Prompts/[batch-file-name].txt`
3. Claude reads files, launches agents, reviews quality, then deploys if approved
4. After batch completes, update this CLAUDE.md and create next batch prompt file

### Batch Prompt Files Location:
`/Users/jasonbaar/Desktop/claudefolder/Prompts/`

### Completed Batches:
- **Batch 01 (PA, GA, NC)** - DONE - Standard federal rules states
- **Batch 02 (NY, MA, MN)** - DONE - Special rules states (Dec 5, 2025)
- **Batch 03 (CT, WA)** - DONE - Year-round guaranteed issue states (Dec 5, 2025)
- **Batch 04 (MO, OR)** - DONE - Birthday rule states (Dec 5, 2025)

### Next Batches Ready:
- **Batch 05+** - Standard states (alphabetically)

### Remaining States to Complete:

**Standard States (Batch 05+, federal rules only):**
Alabama, Alaska, Arkansas, Colorado, Delaware, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana, Maine, Maryland, Michigan, Mississippi, Montana, Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, North Dakota, Oklahoma, Rhode Island, South Carolina, South Dakota, Tennessee, Utah, Vermont, Virginia, West Virginia, Wisconsin, Wyoming

---

## Progress Update - December 5, 2025

**Added 3 Special Rules State Pages (NY, MA, MN)**

Successfully created state pages for the three states with unique Medigap systems:
- **New York:** /states/new-york/ - Community rating, year-round guaranteed issue
- **Massachusetts:** /states/massachusetts/ - Core/Supplement 1/1A system (not federal letters)
- **Minnesota:** /states/minnesota/ - Basic plan + optional riders system

Total state pages now: 11 (AZ, CA, FL, GA, MA, MN, NC, NY, OH, PA, TX)
Total pages: 42

**Special Rules Accurately Documented:**
- NY: Year-round GI rights, community rating explained, why premiums appear higher
- MA: Core/Supplement structure explained, comparison to federal plans, SHINE program
- MN: Basic plan + rider system explained, how to build federal-equivalent coverage

**Rollback available:** "Site before NY, MA and MN" (commit e780b5a)

---

## Progress Update - December 5, 2025 (Batch 03)

**Added 2 Year-Round Guaranteed Issue State Pages (CT, WA)**

Successfully created state pages for the two states with year-round GI rights:
- **Connecticut:** /states/connecticut/ - Year-round GI for plans C, D, F, G only
- **Washington:** /states/washington/ - Year-round GI for ALL plans (strongest after NY)

Total state pages now: 13 (AZ, CA, CT, FL, GA, MA, MN, NC, NY, OH, PA, TX, WA)
Total pages: 44

**Key Content Highlights:**
- CT: Clearly explains which plans have year-round GI (C, D, F, G) vs federal rules (A, B, K, L, M, N)
- WA: Emphasizes strongest protections after NY, ability to rate shop anytime
- Both: SHIP programs correct (CHOICES for CT, SHIBA for WA)
- Both: Realistic premium ranges, state-specific considerations

**Rollback available:** "Site before CT and WA" (commit dce13e2)

---

## Progress Update - December 5, 2025 (Batch 04)

**Added 2 Birthday Rule State Pages (MO, OR)**

Successfully created state pages for the two states with birthday rule protections:
- **Missouri:** /states/missouri/ - 30-day birthday window, CLAIM SHIP program
- **Oregon:** /states/oregon/ - 30-day birthday window, SHIBA SHIP program

Total state pages now: 15 (AZ, CA, CT, FL, GA, MA, MN, MO, NC, NY, OH, OR, PA, TX, WA)
Total pages: 46

**Birthday Rule Accurately Explained:**
- 30-day window starting on your birthday each year
- Can switch to EQUAL OR LESSER coverage only without underwriting
- CANNOT switch to MORE coverage without underwriting
- Examples provided: Plan G to Plan N allowed, Plan N to Plan G NOT allowed
- Both pages emphasize annual rate shopping opportunity

**Rollback available:** "Site before MO and OR" (commit 945d881)

---

## RESOLVED: Massachusetts Card Centering on /states/ Page

### Problem (FIXED)
The "Massachusetts" text appeared LEFT-aligned while all other state names were centered.

### Solution
Remove `width: 100%` and `text-align: center` from `.state-card h3`. Let the parent flexbox's `align-items: center` handle centering the h3 element directly.

**Why it works:** When h3 had `width: 100%`, it stretched to full container width, so `align-items: center` had no effect. The `text-align: center` was supposed to center the text inside, but something (still unknown) prevented it for Massachusetts specifically. By removing `width: 100%`, the h3 shrinks to content size and flexbox centers the element itself.

### Final Working CSS
```css
.state-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    /* other styles... */
}
.state-card h3 {
    font-size: 1.1rem;
    margin-bottom: var(--spacing-xs);
    color: var(--primary);
    /* NO width: 100% or text-align - let flexbox handle centering */
}
```

### State Card HTML Templates

**ALWAYS use these exact templates when adding new state cards to /states/index.html:**

**Live state card:**
```html
<a href="/states/[state-slug]" class="state-card active">
    <h3>[State Name]</h3>
    <span class="live-badge">Live</span>
</a>
```

**Coming soon state card:**
```html
<a href="/states/[state-slug]" class="state-card">
    <h3>[State Name]</h3>
    <p class="coming-soon">Coming Soon</p>
</a>
```

**Key rules:**
- Use `class="state-card active"` for live states, `class="state-card"` for coming soon
- Keep the h3 simple with just the state name - no inline styles needed
- The flexbox centering on the parent handles alignment automatically
