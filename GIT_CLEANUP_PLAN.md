# GitHub Repository Cleanup Plan
**Problem:** Large files in git history causing repo bloat

## 🔴 Issues Found

### Large Files in Git History:
1. **100MB PSD file**: `images/heloimai-merch copy.psd` (100.8 MB) 
2. **25MB PNG**: `images/heloimai-merch.png` (25.5 MB)
3. **11MB GIF**: Multiple large GIF files (10-11 MB each)
4. **Large images**: Multiple 2-10MB PNG/MP4 files

**Total tracked files:** 253 (good!)
**Problem:** Large binary files in git history bloat the `.git` folder

---

## ✅ Solution: Clean Up Large Files

### Option 1: Remove Large Files from History (Recommended)

This will remove the large files from git history, shrinking your repo size significantly.

**⚠️ WARNING:** This rewrites git history. Backup first!

```bash
# 1. Backup first
cd /Users/helo.im.ai/sourcesiri-kamelot.github.io
git branch backup-before-cleanup

# 2. Install git-filter-repo (if not installed)
brew install git-filter-repo

# 3. Remove the 100MB PSD file from history
git filter-repo --path images/heloimai-merch\ copy.psd --invert-paths

# 4. Remove other large files (optional)
git filter-repo --path images/heloimai-merch.png --invert-paths
git filter-repo --path images/20250426_0754_Exploring\ AI\ World_simple_compose_01jsrz526hfm9tdkwd0xfjz8ah.gif --invert-paths

# 5. Force push to GitHub (this updates the remote)
git push origin --force --all
```

### Option 2: Use BFG Repo-Cleaner (Easier, Faster)

```bash
# 1. Backup
git branch backup-before-cleanup

# 2. Clean history  
bfg --strip-blobs-bigger-than 10M

# 3. Optimize
git gc --prune=now --aggressive

# 4. Force push
git push origin --force --all
```

### Option 3: Keep Files, Use Git LFS (For Future)

If you want to keep large files but store them efficiently:

```bash
# 1. Install Git LFS
brew install git-lfs
git lfs install

# 2. Track large file types
git lfs track "*.psd"
git lfs track "*.gif"
git lfs track "*.mp4"

# 3. Add .gitattributes
git add .gitattributes
git commit -m "Add Git LFS tracking"
git push
```

---

## 🧹 Current Cleanup Steps (Do These Now)

### Step 1: Check Current Repo Size
```bash
du -sh .git
```

### Step 2: Backup Everything
```bash
# Create a backup branch
git branch backup-$(date +%Y%m%d)

# Or copy entire directory
cp -r /Users/helo.im.ai/sourcesiri-kamelot.github.io /Users/helo.im.ai/sourcesiri-kamelot.github.io-backup
```

### Step 3: Remove Large Files from Working Directory

If these files are still in your `images/` folder:
```bash
cd /Users/helo.im.ai/sourcesiri-kamelot.github.io/images

# Remove large files (if they exist)
rm -f "heloimai-merch copy.psd"  # 100MB
rm -f "heloimai-merch.png"       # 25MB

# Keep smaller optimized versions instead
```

### Step 4: Update .gitignore

Add to `.gitignore`:
```
# Large binary files
*.psd
*.ai
*.sketch
*.fig
*.xcf

# Large media files (use compressed versions instead)
**/*.gif
**/*.mp4
!**/compressed/*.gif
!**/compressed/*.mp4

# Keep images under 1MB
images/**/large-*
images/**/*-original.*
```

### Step 5: Clean Git History (Choose One Method Above)

I recommend **Option 2 (BFG)** - it's the easiest and fastest.

---

## 📊 Expected Results

### Before Cleanup:
- `.git` folder size: Likely 100-200MB+
- Clone time: Slow
- Push/pull: Slow

### After Cleanup:
- `.git` folder size: ~10-20MB
- Clone time: Fast
- Push/pull: Fast

---

## ⚠️ Important Notes

1. **Backup First!** Create a backup branch or copy before cleaning
2. **Force Push Required**: This rewrites history, requires `--force` push
3. **Team Coordination**: If others have cloned the repo, they'll need to re-clone
4. **GitHub Release**: If you have GitHub releases referencing these files, they'll break

---

## 🔄 Alternative: Fresh Start (Nuclear Option)

If you want a completely clean slate:

```bash
# 1. Export current files (no git history)
cd /Users/helo.im.ai
cp -r sourcesiri-kamelot.github.io sourcesiri-kamelot.github.io-files-only

# 2. Remove .git
cd sourcesiri-kamelot.github.io-files-only
rm -rf .git

# 3. Initialize fresh repo
git init
git add .
git commit -m "Fresh start - cleaned repository"

# 4. Force push to GitHub
git remote add origin git@github.com:Sourcesiri-Kamelot/sourcesiri-kamelot.github.io.git
git branch -M main
git push -u origin main --force
```

---

## 🎯 Recommended Action Plan

**For you, I recommend:**

1. **Quick Win**: Use BFG to remove files >10MB
2. **Safe Approach**: Backup first with `git branch backup-today`
3. **Fast Cleanup**: Run BFG, takes 30 seconds
4. **Force Push**: Update GitHub with cleaned history

**Command sequence:**
```bash
cd /Users/helo.im.ai/sourcesiri-kamelot.github.io
git branch backup-$(date +%Y%m%d)
brew install bfg
bfg --strip-blobs-bigger-than 10M
git reflog expire --expire=now --all
git gc --prune=now --aggressive
git push origin --force --all
```

This will remove that 100MB PSD and other large files from history!

---

**Want me to run this for you?** Let me know and I'll execute the cleanup! 🚀
