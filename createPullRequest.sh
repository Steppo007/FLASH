#!/usr/bin/env sh

# During the nightly snapshot tests, this script opens a PR into main
# from a branch that contains updated snapshots.

BITBUCKET_USER="$1"
BITBUCKET_PWD="$2"
BRANCH_NAME="$3"

REVIEWER_LIST="$(curl \
    --request GET \
    --user $BITBUCKET_USER:$BITBUCKET_PWD \
    --url 'https://pd.bitbucket.syskron.com/rest/default-reviewers/latest/projects/KOP_APP_SHELL/repos/flash.ui-components/conditions' \
    --header 'Accept: application/json;charset=UTF-8' \
    | jq '[ .[] | .reviewers | .[] | .name ]' \
    | jq 'map({name: .})' \
    | jq 'map({user: .})' -c)"

curl \
    --request POST --url 'https://pd.bitbucket.syskron.com/projects/KOP_APP_SHELL/repos/flash.ui-components/pull-requests' \
    --header 'Accept: application/json;charset=UTF-8' \
    --header 'Content-Type: application/json' \
    --user $BITBUCKET_USER:$BITBUCKET_PWD \
    -L \
    --data '{
        "title": "Nightly snapshot update by Jenkins",
        "description": "",
        "state": "OPEN",
        "open": true,
        "closed": false,
        "fromRef": {
            "id": "refs/heads/'$BRANCH_NAME'",
            "repository": {
                "slug": "flash.ui-components",
                "name": null,
                "project": {
                    "key": "KOP_APP_SHELL"
                }
            }
        },
        "toRef": {
            "id": "refs/heads/beta",
            "repository": {
                "slug": "flash.ui-components",
                "name": null,
                "project": {
                    "key": "KOP_APP_SHELL"
                }
            }
        },
        "locked": false,
        "reviewers": '"$REVIEWER_LIST"'
    }' \
    -i