// Config file for semantic-release dev extension
// execute by: npx semantic-release

// eslint-disable-next-line @typescript-eslint/no-require-imports
const file = require('./package.json');
const projectKey = file.repository.url.split('/')[3].toUpperCase(); // kop_app_shell -> KOP_APP_SHELL

module.exports = {
  branches: [
    '+([0-9])?(.{+([0-9]),x}).x',
    'main',
    {
      name: 'beta',
      prerelease: true,
    },
    {
      name: 'alpha',
      prerelease: true,
    },
  ],
  plugins: [
    '@semantic-release/commit-analyzer',
    [
      '@semantic-release/release-notes-generator',
      {
        preset: 'conventionalcommits',
        presetConfig: {
          commitUrlFormat: `{{host}}/projects/${projectKey}/repos/{{repository}}/commits/{{hash}}`,
          compareUrlFormat: `{{host}}/projects/${projectKey}/repos/{{repository}}/compare/diff?sourceBranch=refs%2Ftags%2F{{currentTag}}&targetBranch=refs%2Ftags%2F{{previousTag}}`,
        },
      },
    ],
    [
      '@semantic-release/changelog',
      {
        changelogFile: 'doc/CHANGELOG.md',
        changelogTitle: '# FLASH UI component library changelog',
      },
    ],
    [
      '@semantic-release/npm',
      {
        npmPublish: false,
        //pkgRoot: './build'
      },
    ],
    [
      '@semantic-release/exec',
      {
        prepareCmd: 'npm run build:cl',
        publishCmd: 'npm publish ./build/components/*.tgz',
      },
    ],
    [
      '@semantic-release/git',
      {
        assets: ['package.json', 'package-lock.json', 'doc/CHANGELOG.md'],
        message:
          'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      },
    ],
  ],
  repositoryUrl: file.repository.url,
};
