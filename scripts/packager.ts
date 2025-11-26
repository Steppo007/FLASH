/*
Copies files and directories into the build directory 
and makes a tar file out them. In the process, it cleans
the package.json and merges all CSS together into one file: flash.css.

Usage: npm run package

ASSUMPTION: you have already run 'npm run build'
*/

import * as fs from 'fs';
import * as path from 'path';
import { exec } from 'child_process';
import { globSync } from 'glob';
import { addAutogenSuffix } from './fileGenerator';

// **************************  CONFIGURATION STARTS HERE  **************************

interface CopyProps {
  src: string;
  dest: string;
}

buildPackage();

function buildPackage() {
  const projectRoot = process.cwd();
  const buildDir = path.join(projectRoot, 'build/components');

  const packageFieldsToKeep = [
    'name',
    'version',
    'type',
    'repository',
    'dependencies',
    'peerDependencies',
    'main',
  ];

  const cssToMerge = [
    'css/layers.css',
    'css/colors.css',
    'css/globals.css',
    'css/spacings.css',
    ...globSync(`src/components/**/*.css`),
  ]; // relative to root
  const cssDest = path.join(buildDir, 'flash.css');

  // src relative to root, dest relative to buildDir
  const filesToCopy: CopyProps[] = [
    {
      src: 'css/tailwind.css',
      dest: 'tailwind.css',
    },
    {
      src: 'css/tailwind.ui-library-theme.autogen.css',
      dest: 'tailwind.ui-library-theme.autogen.css',
    },
    // demo purposes only
    {
      src: addAutogenSuffix('tailwind.colors.ts'),
      dest: addAutogenSuffix('tailwind.colors.ts'),
    },
  ];

  const dirsToCopy: CopyProps[] = [
    {
      src: 'assets',
      dest: 'assets',
    },
  ];

  // **************************  CONFIGURATION ENDS HERE  **************************

  makePackage(
    projectRoot,
    buildDir,
    packageFieldsToKeep,
    filesToCopy,
    dirsToCopy,
    cssToMerge,
    cssDest
  );
}

// function only depends on inputs
function makePackage(
  projectRoot: string,
  buildDir: string,
  packageFieldsToKeep: string[],
  filesToCopy: CopyProps[],
  dirsToCopy: CopyProps[],
  cssToMerge: string[],
  cssDest: string
) {
  // merge css and include in build directory
  exec(`cat ${cssToMerge.join(' ')} > ${cssDest}`);

  // copy files into build directory
  filesToCopy.forEach((fileToCopy) => {
    const srcPath = path.join(projectRoot, fileToCopy.src);
    const destPath = path.join(buildDir, fileToCopy.dest);
    fs.copyFileSync(srcPath, destPath);
  });

  // copy directories into build directory
  dirsToCopy.forEach((dirToCopy) => {
    const srcPath = path.join(projectRoot, dirToCopy.src);
    const destPath = path.join(buildDir, dirToCopy.dest);
    fs.cpSync(srcPath, destPath, { recursive: true });
  });

  // load package.json as javascript object
  const packageJsonPath = path.join(projectRoot, 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

  // remove unneeded fields
  Object.keys(packageJson).forEach((key) => {
    if (!packageFieldsToKeep.includes(key)) {
      delete packageJson[key];
    }
  });

  // write clean package.json in build directory
  const newPackageJsonPath = path.join(buildDir, 'package.json');
  const serializedPackageJSon = JSON.stringify(packageJson, null, 4);
  fs.writeFileSync(newPackageJsonPath, serializedPackageJSon);

  // make tar file out of contents of buildDir
  process.chdir(buildDir);
  exec('npm pack');
}

/**
 *
 * NOTE: I could have used the npm package 'tar' to bundle up the files.
 * However, when you install a tar file via 'npm install', npm expects
 * that there is a directory called 'package' which contains the actual
 * package. By using 'npm pack,' this is done automatically. Bear this
 * in mind if you would like to bundle the package yourself.
 *
 */
