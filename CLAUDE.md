# Unbiased Medicare Advisor - Project Notes

## Phone Number Format
**Always display as: (850) 810-1000** (with parentheses around area code)

## Top Bar Implementation - COMPLETED

### What Was Done
Added a dark blue top bar above the header with "Call Us: (850) 810-1000" and a phone icon. The phone number was removed from the navigation menu.

### How It Works
The fix is implemented in `/partials/header.html` which includes:
1. A `<style>` block with `!important` rules that override page-specific CSS
2. The top bar HTML with the phone number

This means:
- **One file to edit** = all 20 pages update automatically via `node build.js`
- No need to edit each page's CSS individually

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

### Why These Fixes Are Needed
- The header uses `position: fixed; top: 0;` which was covering the top bar
- Top bar needs `z-index: 1001` (higher than header's 1000)
- Header needs `top: 36px` to sit below the 36px-tall top bar
- Hero/page sections need extra padding to account for the top bar

## Build System
- **Build command:** `node build.js`
- **Partials location:** `/partials/` (header.html, footer.html, scripts.html)
- **Source files:** `/src/` - use `{{HEADER}}`, `{{FOOTER}}`, `{{SCRIPTS}}` placeholders
- **Output:** Root folder HTML files

### To Make Site-Wide Changes:
1. Edit the appropriate partial in `/partials/`
2. Run `node build.js`
3. All 20 pages will be regenerated

## File Structure
```
/partials/
  header.html    <- Edit this for header/nav/top bar changes
  footer.html    <- Edit this for footer changes
  scripts.html   <- Edit this for JavaScript changes

/src/            <- Source files with {{PLACEHOLDER}} tags
/                <- Built/output HTML files (don't edit directly)
```

## Git/Deployment
- Changes are LOCAL until pushed
- To deploy: push to remote repository
