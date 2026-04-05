#!/bin/bash
# Auto-commit and push on file changes (with debounce)

REPO_DIR="$(cd "$(dirname "$0")" && pwd)"
DEBOUNCE=4  # seconds to wait after last change before committing

echo "Watching for changes in: $REPO_DIR"
echo "Press Ctrl+C to stop."
echo ""

fswatch -o -r \
  --exclude "\.git" \
  --exclude "\.DS_Store" \
  --include "\.html$" \
  --include "\.css$" \
  --include "\.js$" \
  "$REPO_DIR" | while read -r; do

  sleep $DEBOUNCE
  cd "$REPO_DIR" || exit 1

  # Stage tracked changes + any new .html/.css/.js files
  git add -u
  git ls-files --others --exclude-standard | grep -E '\.(html|css|js)$' | xargs -r git add

  # Skip if nothing to commit
  if git diff --cached --quiet; then
    continue
  fi

  TIMESTAMP=$(date "+%Y-%m-%d %H:%M:%S")
  git commit -m "Auto-save: $TIMESTAMP" --quiet
  git push origin main --quiet
  echo "[$TIMESTAMP] Pushed."
done
