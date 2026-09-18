#!/usr/bin/env bash
set -e

trap 'echo "✗ Typecheck failed in: $dir"; exit 1' ERR

DIRS=(
  "template/core"
  "template/features/bullmq"
  "template/features/database"
  "template/features/relay"
  "template/features/store"
  "template/examples/example-core"
  "template/examples/example-bullmq"
  "template/examples/example-db"
  "template/examples/example-relay"
  "template/examples/example-store"
  "packages/create-djstoolkit"
)

echo "Starting typecheck across all templates, features & examples..."

for dir in "${DIRS[@]}"; do
  if [ -d "$dir" ]; then
    echo "▶ Checking: $dir"
    (cd "$dir" && bunx tsc --noEmit)
    echo "✓ Passed: $dir"
  fi
done

echo "✓ All typechecks passed successfully!"