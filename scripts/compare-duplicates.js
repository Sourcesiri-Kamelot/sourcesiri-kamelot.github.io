#!/usr/bin/env node

/**
 * Duplicate Page Comparison Script
 * Compares root HTML files with their src/pages/ counterparts
 * Generates a detailed diff report
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Define known duplicates to check
const duplicatePairs = [
  { root: 'about.html', src: 'src/pages/about/about.html' },
  { root: 'projects.html', src: 'src/pages/projects/projects.html' },
  { root: 'timeline.html', src: 'src/pages/timeline.html' },
  { root: 'soulcore.html', src: 'src/pages/soulcore/soulcore.html' },
  { root: 'soulcore-lab.html', src: 'src/pages/soulcore/soulcore-lab.html' },
  { root: 'api.html', src: 'src/pages/api/api.html' },
  { root: 'vision.html', src: 'src/pages/vision/vision.html' },
  { root: 'dashboard.html', src: 'src/pages/dashboard/dashboard.html' },
  { root: 'index.html', src: 'src/pages/home/index.html' },
];

function getFileHash(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return crypto.createHash('md5').update(content).digest('hex');
  } catch (err) {
    return null;
  }
}

function getFileSize(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return stats.size;
  } catch (err) {
    return 0;
  }
}

function compareFiles(file1Path, file2Path) {
  try {
    const content1 = fs.readFileSync(file1Path, 'utf8');
    const content2 = fs.readFileSync(file2Path, 'utf8');
    
    const lines1 = content1.split('\n');
    const lines2 = content2.split('\n');
    
    let differences = 0;
    const maxLines = Math.max(lines1.length, lines2.length);
    const diffLines = [];
    
    for (let i = 0; i < maxLines; i++) {
      const line1 = lines1[i] || '';
      const line2 = lines2[i] || '';
      
      if (line1 !== line2) {
        differences++;
        if (diffLines.length < 5) { // Only show first 5 differences
          diffLines.push({
            line: i + 1,
            root: line1.substring(0, 100),
            src: line2.substring(0, 100)
          });
        }
      }
    }
    
    return {
      identical: content1 === content2,
      lineCount1: lines1.length,
      lineCount2: lines2.length,
      differences,
      diffLines
    };
  } catch (err) {
    return { error: err.message };
  }
}

console.log('═══════════════════════════════════════════════════════════════');
console.log('            DUPLICATE PAGE COMPARISON REPORT');
console.log('═══════════════════════════════════════════════════════════════\n');

const results = [];
let identicalCount = 0;
let differentCount = 0;
let missingCount = 0;

duplicatePairs.forEach(pair => {
  const rootPath = path.join(process.cwd(), pair.root);
  const srcPath = path.join(process.cwd(), pair.src);
  
  console.log(`\n📄 Comparing: ${pair.root}`);
  console.log(`   Root:   ${pair.root}`);
  console.log(`   Source: ${pair.src}`);
  console.log('   ─────────────────────────────────────────────────────────');
  
  const rootExists = fs.existsSync(rootPath);
  const srcExists = fs.existsSync(srcPath);
  
  if (!rootExists && !srcExists) {
    console.log('   ❌ BOTH FILES MISSING');
    missingCount++;
    results.push({ ...pair, status: 'both-missing' });
    return;
  }
  
  if (!rootExists) {
    console.log('   ⚠️  ROOT FILE MISSING (only in src/pages/)');
    console.log(`   📦 Size: ${getFileSize(srcPath)} bytes`);
    missingCount++;
    results.push({ ...pair, status: 'root-missing', srcSize: getFileSize(srcPath) });
    return;
  }
  
  if (!srcExists) {
    console.log('   ⚠️  SRC FILE MISSING (only in root)');
    console.log(`   📦 Size: ${getFileSize(rootPath)} bytes`);
    missingCount++;
    results.push({ ...pair, status: 'src-missing', rootSize: getFileSize(rootPath) });
    return;
  }
  
  const rootHash = getFileHash(rootPath);
  const srcHash = getFileHash(srcPath);
  const rootSize = getFileSize(rootPath);
  const srcSize = getFileSize(srcPath);
  
  console.log(`   📦 Root size: ${rootSize} bytes`);
  console.log(`   📦 Src size:  ${srcSize} bytes`);
  
  if (rootHash === srcHash) {
    console.log('   ✅ IDENTICAL - Files are exact duplicates');
    identicalCount++;
    results.push({ ...pair, status: 'identical', rootSize, srcSize });
  } else {
    console.log('   🔀 DIFFERENT - Files have variations');
    const comparison = compareFiles(rootPath, srcPath);
    
    if (comparison.error) {
      console.log(`   ❌ Error comparing: ${comparison.error}`);
    } else {
      console.log(`   📊 Root lines: ${comparison.lineCount1}`);
      console.log(`   📊 Src lines:  ${comparison.lineCount2}`);
      console.log(`   🔍 Differences: ${comparison.differences} lines differ`);
      
      if (comparison.diffLines.length > 0) {
        console.log('   \n   First differences:');
        comparison.diffLines.forEach(diff => {
          console.log(`      Line ${diff.line}:`);
          console.log(`        Root: ${diff.root}...`);
          console.log(`        Src:  ${diff.src}...`);
        });
      }
    }
    
    differentCount++;
    results.push({ 
      ...pair, 
      status: 'different', 
      rootSize, 
      srcSize,
      differences: comparison.differences,
      rootLines: comparison.lineCount1,
      srcLines: comparison.lineCount2
    });
  }
});

console.log('\n\n═══════════════════════════════════════════════════════════════');
console.log('                        SUMMARY');
console.log('═══════════════════════════════════════════════════════════════\n');
console.log(`   Total pairs checked: ${duplicatePairs.length}`);
console.log(`   ✅ Identical:        ${identicalCount}`);
console.log(`   🔀 Different:        ${differentCount}`);
console.log(`   ⚠️  Missing files:   ${missingCount}`);

console.log('\n\n═══════════════════════════════════════════════════════════════');
console.log('                    RECOMMENDATIONS');
console.log('═══════════════════════════════════════════════════════════════\n');

results.forEach(result => {
  if (result.status === 'identical') {
    console.log(`✅ ${result.root}`);
    console.log(`   → DELETE: ${result.src} (exact duplicate)`);
  } else if (result.status === 'different') {
    console.log(`🔍 ${result.root}`);
    console.log(`   → REVIEW: ${result.src} (${result.differences} lines differ)`);
    console.log(`   → Action: Compare manually, then keep root or merge changes`);
  } else if (result.status === 'root-missing') {
    console.log(`📋 ${result.root}`);
    console.log(`   → COPY: ${result.src} → ${result.root}`);
  } else if (result.status === 'src-missing') {
    console.log(`✅ ${result.root}`);
    console.log(`   → Already using root version (no src duplicate)`);
  }
});

console.log('\n\n═══════════════════════════════════════════════════════════════');
console.log('                     JSON OUTPUT');
console.log('═══════════════════════════════════════════════════════════════\n');

// Save results to JSON for programmatic access
const jsonOutput = {
  timestamp: new Date().toISOString(),
  summary: {
    total: duplicatePairs.length,
    identical: identicalCount,
    different: differentCount,
    missing: missingCount
  },
  results: results
};

const outputPath = path.join(process.cwd(), 'DUPLICATE_COMPARISON_REPORT.json');
fs.writeFileSync(outputPath, JSON.stringify(jsonOutput, null, 2));
console.log(`📄 Detailed report saved to: DUPLICATE_COMPARISON_REPORT.json\n`);

process.exit(0);
