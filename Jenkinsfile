def SBOM_BUCKET_NAME = ''
def PLAYWRIGHT_EXIT_CODE = '0'
def GREP_EXIT_CODE = '0'
def PLAYWRIGHT_VERSION = ''

// DateTime in yyyyMMddThhmmss format
def CURRENT_TIME = java.time.LocalDateTime.now().toString().replace('-', '').replace(':', '').tokenize('.')[0]

pipeline {
    agent {
        dockerfile {
            label 'linux'
            filename 'jenkins/Dockerfile.jenkins'
            args '-u root:root -v /var/run/docker.sock:/var/run/docker.sock'
            reuseNode true
        }
    }
    triggers {
        // Run only on main every weekday between 12 AM and 2:59 AM, when not on main: February 31st
        cron(env.BRANCH_NAME == 'main' ? 'H H(0-2) * * 1-5' : 'H H 31 2 H')
    }
    environment {
        ORIGIN_NAME = 'flash-styleguide-dev-eu-central-1.s3.eu-central-1.amazonaws.com'

    }
    options {
        timestamps()
    }
    stages {
        stage('Setup') {
            steps {
                sh 'git config --global --add safe.directory ${WORKSPACE}'
            }
        }
        stage('include utils') {
            steps {
                script {
                    tests = load("${env.WORKSPACE}/jenkins/tests.groovy")
                }
            }
        }
        stage('run pipeline') {
            when {
                anyOf {
                    expression {
                        def commitMsg = sh(
                            script: 'git log -1 --pretty=format:"%s"',  // Only subject line
                            returnStdout: true
                        ).trim()
                        echo "Merge commit subject: ${commitMsg}"
                        return !commitMsg.contains('[skip ci]')
                    }
                    triggeredBy 'TimerTrigger'
                }
            }
            stages {
                stage('Setup environment') {
                    steps {
                        script {
                            if (env.BRANCH_NAME == 'alpha'){
                                SBOM_BUCKET_NAME = 'syskron-sbom-collection-dev'
                            }
                            else if (env.BRANCH_NAME == 'beta'){
                                SBOM_BUCKET_NAME = 'syskron-sbom-collection-test'
                            }
                            else if (env.BRANCH_NAME == 'main'){
                                SBOM_BUCKET_NAME = 'syskron-sbom-collection'
                            }
                        }
                    }
                }
                stage('prepare-artifactory') {
                    steps {
                        // credentialsId= User Id of credential store from Jenkins
                        withCredentials([[
                            $class: 'UsernamePasswordMultiBinding',
                            credentialsId: 'artifactory-s2a-jenkins',
                            usernameVariable: 'USERNAME',
                            passwordVariable: 'PASSWORD'
                        ]]) {
                            script {
                                sh 'npm config set registry https://syskronx.jfrog.io/syskronx/api/npm/npm/'
                                sh 'npm set //syskronx.jfrog.io/syskronx/api/npm/npm/:username ${USERNAME}'
                                sh 'npm set //syskronx.jfrog.io/syskronx/api/npm/npm/:_password "$(echo -n ${PASSWORD} | base64)"'
                                sh 'npm set //syskronx.jfrog.io/syskronx/api/npm/npm/:email jenkins@syskron.com'
                            }
                        }
                        sh 'git config --global --add safe.directory ${WORKSPACE}'
                    }
                }
                stage('install dependencies') {
                    steps {
                        sh 'npm ci'
                    }
                }
                stage('check for vulnerabilities') {
                    when { branch 'prod' }
                    steps {
                        sh 'npm audit --audit-level=high'
                    }
                }
                stage('lint and format') {
                    steps {
                        sh 'npm run lint'
                        sh 'npm run ci:prettier'
                    }
                }
                stage('build component library') {
                    steps {
                        sh 'npm run build:cl'
                    }
                }
                stage('build storybook') {
                    steps {
                        sh 'npm run build:sb'
                    }
                }
                stage('Run tests') {
                    parallel {
                        stage('Chromium tests') {
                            when { not { triggeredBy 'TimerTrigger' } }
                            steps {
                                script {
                                    def firstTestRunExitCode = tests.testsOnPush(firstTestRunOptions: "--project=chromium")

                                    if (firstTestRunExitCode != 0) {
                                        currentBuild.result = 'FAILURE'
                                        error "Build failed due to first test run exit code: ${firstTestRunExitCode}"
                                    }
                                }
                            }
                            post {
                                always {
                                    dir('tests') {
                                        sh 'docker container stop pw_container || true'
                                        junit 'reports/xml/*.xml'
                                        zip zipFile: 'playwright-reports.zip', archive: true, dir: 'reports'
                                    }
                                }
                            }
                        }
                        stage('Nightly tests') {
                            when {
                                allOf {
                                    triggeredBy 'TimerTrigger'
                                    branch 'beta'
                                }
                            }
                            stages {
                                stage('Run tests & report result') {
                                    steps {
                                        script {
                                            PLAYWRIGHT_EXIT_CODE = tests.testsOnPush(createPR: true)
                                        }
                                    }
                                    post {
                                        always {
                                            echo "PLAYWRIGHT_EXIT_CODE: ${PLAYWRIGHT_EXIT_CODE}"
                                            junit 'tests/reports/xml/*.xml'
                                            zip zipFile: 'playwright-reports.zip', archive: true, dir: 'tests/reports'
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                stage('BlackDuck Polaris scan') {
                    when {
                      branch 'main'
                    }
                    environment {
                        REPO_NAME = "${env.GIT_URL.tokenize('/.')[-2]}"
                        BRIDGE_POLARIS_SERVERURL = 'https://eu.polaris.blackduck.com/'
                        BRIDGE_POLARIS_ACCESSTOKEN = credentials('blackduck-polaris')
                        BRIDGE_POLARIS_APPLICATION_NAME = "${BITBUCKET_PROJECT_KEY}"
                        BRIDGE_POLARIS_PROJECT_NAME = "${BITBUCKET_REPOSITORY}"
                        BRIDGE_POLARIS_BRANCH_NAME = "${BRANCH_NAME}"
                        BRIDGE_POLARIS_ASSESSMENT_TYPES = 'SCA,SAST'
                        BRIDGE_POLARIS_ASSESSMENT_MODE = 'CI'
                        BRIDGE_INSTALL_DIRECTORY = '/usr/local/bin/bridge-cli-bundle-linux64'
                    }
                    steps {
                        script {
                            catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                                sh '''
                                  rm -rf .bridge
                                  mkdir .bridge
                                  chmod 777 .bridge
                                '''
                                status = sh returnStatus: true, script: 'bridge-cli --stage polaris --update'
                                if (status == 8) { unstable 'policy violation' }
                                else if (status != 0) { error 'bridge failure' }
                            }
                        }
                    }
                }

                stage('publish component library') {
                    when {
                        not { triggeredBy 'TimerTrigger' }
                    }
                    environment {
                        // https://git-scm.com/docs/git#Documentation/git.txt-codeGITSSHCOMMANDcode
                        GIT_SSH_COMMAND = 'ssh -o StrictHostKeyChecking=no -l S2A_Jenkins'
                    }
                    steps {
                        // is ssh agent to allow upload git changes
                        sshagent(['S2A_Jenkins_ssh']) {
                            sh 'npx semantic-release'
                        }
                    }
                }
                stage('Deploy') {
                    when {
                        allOf {
                            not { triggeredBy 'TimerTrigger' }
                            anyOf { branch 'alpha'; branch 'beta'; branch 'main' }
                        }
                    }
                    stages {
                        stage('create sbom') {
                            steps {
                                sh 'npm sbom --sbom-format cyclonedx > sbom-raw.json'
                                sh "sbom/apply_metadata.sh ui-components"
                            }
                        }
                        stage('upload sbom') {
                            environment {
                                AWS_DEFAULT_REGION = 'eu-central-1'
                            }
                            steps {
                                withCredentials([[
                                        $class          : 'UsernamePasswordMultiBinding',
                                        credentialsId   : 's2a-jenkins-shared-services',
                                        usernameVariable: 'AWS_ACCESS_KEY_ID',
                                        passwordVariable: 'AWS_SECRET_ACCESS_KEY'
                                ]]) {
                                    sh "aws s3 cp sbom/syskron_ui-components*.json s3://\"${SBOM_BUCKET_NAME}\"/kop_app_shell/ui-components"
                                }
                            }
                        }
                        stage('publish storybook') {
                            when {
                                branch 'main'
                            }
                            environment {
                                AWS_DEFAULT_REGION = 'eu-central-1'
                            }
                            steps {
                                // https://pd.bitbucket.syskron.com/projects/SAUI/repos/ui-shared-components/browse/Jenkinsfile
                                withCredentials([[
                                        $class          : 'UsernamePasswordMultiBinding',
                                        credentialsId   : 'flash_aws_jenkins_dev',
                                        usernameVariable: 'AWS_ACCESS_KEY_ID',
                                        passwordVariable: 'AWS_SECRET_ACCESS_KEY'
                                ]]) {
                                    sh 'npm run build:sb'
                                    sh 'aws s3 sync --delete "./build/storybook" "s3://flash-styleguide-dev-eu-central-1" '
                                    // Get distribution ID and invalidate it
                                    sh '''
                                        DIST_ID=$(aws cloudfront list-distributions --query "DistributionList.Items[*].{id:Id,origin:Origins.Items[0].Id}[?origin=='${ORIGIN_NAME}'].id" --output text)
                                        aws cloudfront create-invalidation --distribution-id ${DIST_ID} --paths "/*"
                                    '''
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    post {
        always {
            cleanWs()
        }
    }
}
