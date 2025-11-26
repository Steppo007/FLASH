#!/usr/bin/env bash

set -x

PLAYWRIGHT_VERSION=$(jq -r '.packages."node_modules/playwright".version' package-lock.json)
docker run \
-i \
--rm \
--user "$(id -u):$(id -g)" \
--env CI=true \
-v ${PWD}:/code \
-w /code \
--entrypoint /bin/bash \
mcr.microsoft.com/playwright:v${PLAYWRIGHT_VERSION} \
-c "npx playwright test $(printf "${1+ %q}" "$@")"

