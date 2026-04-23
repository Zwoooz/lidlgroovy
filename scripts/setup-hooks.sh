#!/bin/bash

HOOKS_DIR=".git/hooks"
SCRIPTS_DIR="scripts/hooks"

for script in "$SCRIPTS_DIR"/*.sh; do
  hook_name=$(basename "$script" .sh)
  cp "$script" "$HOOKS_DIR/$hook_name"
  chmod +x "$HOOKS_DIR/$hook_name"
  echo "Installed hook: $hook_name"
done

echo "All hooks installed!"
