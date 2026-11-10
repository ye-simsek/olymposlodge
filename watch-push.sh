#!/bin/bash
# Auto-commit and push on file changes (with debounce)

REPO_DIR="$(cd "$(dirname "$0")" && pwd)"

# This script dates from the static site, where every save could go live.
# The site is now an application with tests, so it refuses to auto-push to main:
# work on a branch and merge when the tests pass.
BRANCH="$(git -C "$REPO_DIR" rev-parse --abbrev-ref HEAD)"
if [ "$BRANCH" = "main" ]; then
  echo "Refusing to auto-commit and push on 'main'. Switch to a work branch first:"
  echo "  git switch -c my-change"
  exit 1
fi
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
  git push origin "$BRANCH" --quiet
  echo "[$TIMESTAMP] Pushed."
done
