#!/bin/sh

NAME="$1"

TIMESTAMP=$(date -Iseconds)
VERSION=$(jq -r .metadata.component.version sbom-raw.json)
FILE_NAME="syskron_${NAME}_${VERSION}"

echo "$FILE_NAME"

jq -s '.[0]* .[1]' sbom-raw.json sbom/sbom_metadata.json \
  | jq ".version=\"$VERSION\"" \
  | jq ".metadata.timestamp=\"$TIMESTAMP\"" \
  | jq '.compositions = []' \
  | jq '(.metadata.properties[]? | select(.name=="krones:uid").value) = (.metadata.component."bom-ref")' \
  | jq '.components[] |= (del(.group, .publisher, .licenses))' \
  > "sbom/${FILE_NAME}.json"
