#!/usr/bin/env bash

set -x

PLAYWRIGHT_VERSION=$(jq -r '.packages."node_modules/playwright".version' package-lock.json)
docker run \
-i \
--rm \
--env CI=true \
-v ${PWD}:/code \
-v ${HOME}/.npmrc:/code/.npmrc \
-w /code \
--entrypoint /bin/bash \
mcr.microsoft.com/playwright:v${PLAYWRIGHT_VERSION}-arm64 \
-c "npm ci && npm run build && npx playwright test $(printf "${1+ %q}" "$@")"

