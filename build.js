/**
 * Build Script for Unbiased Medicare Advisor
 *
 * This script combines partials (header, footer, scripts) with page content
 * from src/ to generate complete HTML pages in the root directory.
 *
 * Usage: npm run build (or: node build.js)
 *
 * How it works:
 * 1. Reads header.html, footer.html, scripts.html from partials/
 * 2. Finds all .html files in src/
 * 3. Replaces {{HEADER}}, {{FOOTER}}, {{SCRIPTS}} placeholders with partial content
 * 4. Writes completed files to root directory (maintaining folder structure)
 */

const fs = require('fs');
const path = require('path');

// Directories
const ROOT_DIR = __dirname;
const SRC_DIR = path.join(ROOT_DIR, 'src');
const PARTIALS_DIR = path.join(ROOT_DIR, 'partials');

// Read partials
console.log('Reading partials...');
const header = fs.readFileSync(path.join(PARTIALS_DIR, 'header.html'), 'utf8');
const footer = fs.readFileSync(path.join(PARTIALS_DIR, 'footer.html'), 'utf8');
const scripts = fs.readFileSync(path.join(PARTIALS_DIR, 'scripts.html'), 'utf8');
console.log('  ✓ header.html');
console.log('  ✓ footer.html');
console.log('  ✓ scripts.html');

// Function to recursively find all HTML files in src/
function findHtmlFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            findHtmlFiles(filePath, fileList);
        } else if (file.endsWith('.html')) {
            fileList.push(filePath);
        }
    }

    return fileList;
}

// Function to ensure directory exists
function ensureDir(filePath) {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

// Find all HTML files in src/
console.log('\nFinding source files...');
const srcFiles = findHtmlFiles(SRC_DIR);
console.log(`  Found ${srcFiles.length} HTML files\n`);

// Process each file
console.log('Building pages...');
let successCount = 0;
let errorCount = 0;

for (const srcFile of srcFiles) {
    // Calculate output path (same relative path, but in root instead of src/)
    const relativePath = path.relative(SRC_DIR, srcFile);
    const outputPath = path.join(ROOT_DIR, relativePath);

    try {
        // Read source file
        let content = fs.readFileSync(srcFile, 'utf8');

        // Replace placeholders
        content = content.replace('{{HEADER}}', header);
        content = content.replace('{{FOOTER}}', footer);
        content = content.replace('{{SCRIPTS}}', scripts);

        // Ensure output directory exists
        ensureDir(outputPath);

        // Write output file
        fs.writeFileSync(outputPath, content, 'utf8');

        console.log(`  ✓ ${relativePath}`);
        successCount++;
    } catch (err) {
        console.log(`  ✗ ${relativePath} - ERROR: ${err.message}`);
        errorCount++;
    }
}

// Summary
console.log('\n' + '='.repeat(40));
console.log(`Build complete!`);
console.log(`  ${successCount} files built successfully`);
if (errorCount > 0) {
    console.log(`  ${errorCount} files had errors`);
}
console.log('='.repeat(40));
