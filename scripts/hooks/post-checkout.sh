#!/bin/bash

BRANCH=$(git rev-parse --abbrev-ref HEAD)

if [[ "$BRANCH" == "main" ]]; then
  cp .env.main .env
else
  cp .env.dev .env
fi

echo "Switched .env for branch: $BRANCH"
