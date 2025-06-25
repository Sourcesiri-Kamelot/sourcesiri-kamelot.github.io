#!/bin/bash

# Add CSS link to all HTML files
for file in /Users/helo.im.ai/sourcesiri-kamelot.github.io/*.html; do
  # Add footer.css if not already present
  if ! grep -q "footer.css" "$file"; then
    sed -i '' -e 's|</head>|    <link rel="stylesheet" href="css/footer.css">\n</head>|' "$file"
  fi
  
  # Add project-cards.css if not already present
  if ! grep -q "project-cards.css" "$file"; then
    sed -i '' -e 's|</head>|    <link rel="stylesheet" href="css/project-cards.css">\n</head>|' "$file"
  fi
done

echo "Updated all HTML files with new CSS links"
