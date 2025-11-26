def setGitSshURL() {
    def git_url = sh(script: 'echo "${GIT_URL}"', returnStdout: true).trim()
    def git_ssh_url = git_url.replace('scm/', '').replace('https://', 'ssh://git@')
    sh 'git config --global --add safe.directory "${WORKSPACE}"'
    sh "git remote set-url origin ${git_ssh_url}"
}

def testsOnPush(Map params) {
    // Default createPR to false if not provided
    def createPR = params.containsKey('createPR') ? params.createPR : false

    def firstTestRunExitCode = 0
    def updateSnapshotCommitTrigger = params.containsKey('updateSnapshotCommitTrigger') ? params.updateSnapshotCommitTrigger : '[update-playwright-snapshots]'
    def firstTestRunCommand = params.containsKey('firstTestRunOptions') ? "npm run test -- ${params.firstTestRunOptions}" : 'npm run test'
    script {
        // this part is variable
        firstTestRunExitCode = sh(script: firstTestRunCommand, returnStatus: true)
        def commitMessage = sh(script: 'git log -1 --pretty=%B', returnStdout: true).trim()

        if (firstTestRunExitCode != 0 && (createPR || commitMessage.contains(updateSnapshotCommitTrigger))) {
            def updateSnapshotsRun = sh(script: 'npm run test -- --last-failed --update-snapshots', returnStatus: true)
            def modifiedFiles = sh(script: 'git ls-files --modified -- **/*-snapshots/*.png', returnStdout: true).trim()
            def untrackedFiles = sh(script: 'git ls-files --others --exclude-standard -- **/*-snapshots/*.png', returnStdout: true).trim()

            echo "Modified files: ${modifiedFiles}"
            echo "Untracked files: ${untrackedFiles}"

            if (modifiedFiles || untrackedFiles) {
                pushUpdatedSnapshotsBranch(createPR)
            } else {
                echo 'no new snapshots were added'
            }
        } else if (firstTestRunExitCode != 0) {
            error "The 'npm run ci:e2e' command failed with exit code ${firstTestRunExitCode}"
        }
    }

    return firstTestRunExitCode
}

def pushUpdatedSnapshotsBranch(boolean createPR = false) {
    def timeNow = java.time.LocalDateTime.now().toString().replace('-', '').replace(':', '').tokenize('.')[0]
    def branchName = "tests/snapshot-update-${env.BRANCH_NAME}-${timeNow}"
    def commitMessage = '''
        chore(jenkins): update test screenshots

        Please be aware that some old screenshots (or screenshots folder)
        might need to be deleted.
    '''

    commitMessage = commitMessage.trim()

    sshagent(['S2A_Jenkins_ssh']) {
        withEnv(['GIT_SSH_COMMAND=ssh -o StrictHostKeyChecking=no -l S2A_Jenkins']) {
            setGitSshURL()
            sh """
                git switch -c ${branchName}
                git add **/*-snapshots/*.png
                git commit -m '${commitMessage}'
                git push -u origin ${branchName}
            """
        }
    }

    if (createPR) {
        withCredentials([usernamePassword(credentialsId: 'S2A_Jenkins', usernameVariable: 'BITBUCKET_USER', passwordVariable: "BITBUCKET_PWD")]) {
            sh script: "./createPullRequest.sh \$BITBUCKET_USER \$BITBUCKET_PWD ${branchName}", returnStdout: true
        }
    } else {
        echo "Skipping PR creation as createPR is set to false"
    }
}

def fetchTags() {
    sshagent(['S2A_Jenkins_ssh']) {
        withEnv(['GIT_SSH_COMMAND=ssh -o StrictHostKeyChecking=no -l S2A_Jenkins']) {
            setGitSshURL()
            sh 'git fetch --all --tags'
        }
    }
}

// always to be included
return this
