#!/bin/bash
echo "Running ESLint..."

if ! npm run lint; then
  echo "ESLint failed. Commit aborted."
  exit 1
else
  echo "ESLint passed!"
fi
