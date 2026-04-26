#!/bin/bash

echo "Running Prettier..."
if ! npm run format:check; then
  echo "Prettier formating issues found. Run 'npm run format" to fix
  exit 1
fi

echo "Running ESLint..."
if ! npm run lint; then
  echo "ESLint failed. Commit aborted."
  exit 1
else
  echo "ESLint passed!"
fi
