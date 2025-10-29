# Duplicate Pages Consolidation Plan

**Status:** 🔄 In Progress  
**Generated:** 2025-10-29

## Summary

Based on the comparison script analysis:
- ✅ **1 exact duplicate deleted:** `src/pages/soulcore/soulcore-lab.html`
- 🔍 **8 different versions require review:** Root versions have updated navigation (nav.css) while src/pages versions are older

## Recommendation: Keep Root Versions

**Decision:** Keep all ROOT versions as canonical, delete src/pages versions.

**Reasoning:**
1. Root versions have updated navigation with `nav.css` integration
2. Root versions have cleaner URLs (e.g., `/about.html` vs `/src/pages/about/about.html`)
3. Root versions are what's currently linked in navigation
4. src/pages versions appear to be older iterations before navigation refactor

## Files to Delete (src/pages versions)

### Can Delete Safely
These src/pages files are older versions without the latest navigation updates:

1. ❌ `src/pages/about/about.html` - 482 lines differ, root has nav.css
2. ❌ `src/pages/projects/projects.html` - 290 lines differ, root has nav.css
3. ❌ `src/pages/timeline.html` - 318 lines differ, root has nav.css
4. ❌ `src/pages/soulcore/soulcore.html` - 326 lines differ, root has nav.css
5. ❌ `src/pages/api/api.html` - 366 lines differ, root has nav.css
6. ❌ `src/pages/dashboard/dashboard.html` - 624 lines differ (root = AI Dashboard, src = Web3 Dashboard) ⚠️
7. ❌ `src/pages/home/index.html` - 877 lines differ, root has TerraSolar branding
8. ✅ `src/pages/soulcore/soulcore-lab.html` - **ALREADY DELETED** (exact duplicate)

### Special Cases

#### 🔍 vision.html (Needs Manual Review)
- **Root:** `vision.html` - 21 lines, placeholder page
- **Src:** `src/pages/vision/vision.html` - 386 lines, full page
- **Action:** ⚠️ The src version is MORE complete than root!
- **Recommendation:** 
  - COPY `src/pages/vision/vision.html` → `vision.html` (overwrite placeholder)
  - THEN delete `src/pages/vision/vision.html`

#### 🔍 dashboard.html (Two Different Purposes)
- **Root:** `dashboard.html` - AI Dashboard (365 lines)
- **Src:** `src/pages/dashboard/dashboard.html` - Web3 Dashboard (640 lines)
- **Action:** ⚠️ These are DIFFERENT dashboards!
- **Recommendation:**
  - Keep root `dashboard.html` as main AI Dashboard
  - Rename src version to `web3-dashboard.html` if Web3 features are needed
  - OR delete if `web3-dashboard.html` already exists in root

## Implementation Steps

### Step 1: Handle Special Cases First ✅

#### Fix vision.html (src version is better)
```bash
# Backup current placeholder
cp vision.html vision-placeholder-backup.html

# Copy full version from src
cp src/pages/vision/vision.html vision.html

# Verify it works, then delete backup and src version
# rm vision-placeholder-backup.html
# rm src/pages/vision/vision.html
```

#### Check dashboard situation
```bash
# Check if web3-dashboard.html exists in root
ls -la web3-dashboard.html

# If it exists, delete src/pages version
# If not, rename src version to web3-dashboard.html in root
```

### Step 2: Delete Obsolete src/pages Versions ⏳

After handling special cases, delete the older src/pages versions:

```bash
# Delete old src/pages versions (keep root canonical)
rm src/pages/about/about.html
rm src/pages/projects/projects.html
rm src/pages/timeline.html
rm src/pages/soulcore/soulcore.html
rm src/pages/api/api.html
rm src/pages/home/index.html

# Clean up empty directories
rmdir src/pages/about 2>/dev/null
rmdir src/pages/projects 2>/dev/null
rmdir src/pages/soulcore 2>/dev/null
rmdir src/pages/api 2>/dev/null
rmdir src/pages/home 2>/dev/null
```

### Step 3: Search for Any Remaining References ⏳

Check if any HTML files still reference src/pages paths:

```bash
# Search for src/pages references in all HTML files
grep -r "src/pages/" *.html
grep -r "src/pages/" src/pages/*.html 2>/dev/null

# Search in JS files
grep -r "src/pages/" js/*.js

# Search in CSS files
grep -r "src/pages/" css/*.css
```

### Step 4: Update Any Found References ⏳

If any references to deleted files are found:
- Update to point to root versions
- Test navigation after changes

### Step 5: Verify Navigation Works ⏳

Test that all navigation links work:
1. Check main navigation (nav.html)
2. Check all "Back" buttons
3. Check footer links
4. Check breadcrumbs (after Task 6)

## Checklist

- [x] Delete exact duplicate: `src/pages/soulcore/soulcore-lab.html`
- [ ] Handle vision.html special case (copy src → root)
- [ ] Handle dashboard.html special case (check web3-dashboard.html)
- [ ] Delete old src/pages/about/about.html
- [ ] Delete old src/pages/projects/projects.html
- [ ] Delete old src/pages/timeline.html
- [ ] Delete old src/pages/soulcore/soulcore.html
- [ ] Delete old src/pages/api/api.html
- [ ] Delete old src/pages/home/index.html
- [ ] Search for remaining src/pages references
- [ ] Update any found references
- [ ] Test all navigation paths
- [ ] Clean up empty directories

## Expected Outcome

After completion:
- ✅ All navigation uses root paths
- ✅ Cleaner URL structure
- ✅ No duplicate content
- ✅ Easier maintenance (single source of truth)
- ✅ Better SEO (no duplicate content issues)

## Rollback Plan

If issues arise:
1. All deletions logged in git history
2. Can restore with: `git checkout HEAD~1 -- src/pages/`
3. Comparison report saved in: `DUPLICATE_COMPARISON_REPORT.json`

---

**Next Actions:** Execute steps 1-5 sequentially, testing after each major change.
