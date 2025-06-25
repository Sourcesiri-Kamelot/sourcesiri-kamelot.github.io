#!/bin/bash

# Script to update all HTML files with the unified header and footer

# Find all HTML files in the current directory
for file in *.html; do
  # Skip the newly created files
  if [[ "$file" == "dashboard.html" || "$file" == "ai-society-monetization.html" ]]; then
    continue
  fi
  
  # Add the script references before the closing body tag if they don't exist
  if ! grep -q "js/header-footer.js" "$file"; then
    sed -i '' -e 's|</body>|    <script src="js/header-footer.js"></script>\n    <script src="js/orb-agents.js"></script>\n</body>|' "$file"
  fi
  
  # Add CSS reference in the head if it doesn't exist
  if ! grep -q "css/orb-agents.css" "$file"; then
    sed -i '' -e 's|</head>|    <link rel="stylesheet" href="css/orb-agents.css">\n</head>|' "$file"
  fi
  
  echo "Updated $file"
done

echo "All HTML files have been updated!"
