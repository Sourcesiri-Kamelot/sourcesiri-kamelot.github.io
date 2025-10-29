#!/bin/bash
# Git Cleanup Script - Run this regularly to keep your repo clean

echo "🧹 Starting Git Cleanup..."

# Remove Python cache files
echo "🐍 Removing Python cache..."
find . -type d -name "__pycache__" -exec rm -rf {} + 2>/dev/null
find . -name "*.pyc" -delete 2>/dev/null
echo "✅ Python cache cleaned"

# Remove log files
echo "📝 Removing log files..."
rm -f logs/*.log 2>/dev/null
rm -f backend/logs/*.log 2>/dev/null
rm -f mcp/logs/*.log 2>/dev/null
echo "✅ Log files cleaned"

# Remove temporary files
echo "🗑️  Removing temp files..."
find . -name "*.tmp" -delete 2>/dev/null
find . -name "*.temp" -delete 2>/dev/null
find . -name "*~" -delete 2>/dev/null
echo "✅ Temp files cleaned"

# Remove .DS_Store files (macOS)
echo "🍎 Removing macOS files..."
find . -name ".DS_Store" -delete 2>/dev/null
echo "✅ macOS files cleaned"

# Remove Azure CLI cache (if exists)
echo "☁️  Removing Azure CLI cache..."
rm -rf .azure 2>/dev/null
echo "✅ Azure CLI cache cleaned"

# Show git status
echo ""
echo "📊 Git Status:"
git status --short

echo ""
echo "✨ Cleanup complete!"
