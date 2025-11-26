/*
Bundles the component library and installs it in another project, locally. 
Usage: npm run export path/to/other/project
*/

import { execSync } from 'child_process';
import * as path from 'path';
import { argv } from 'process';
import * as fs from 'fs';
import { PackageLock } from './common';

/* CONFIGURATION */
const compLibRoot = process.cwd();
const buildDirComponentLibrary = path.join(compLibRoot, 'build/components');
const componentLibraryPackage = '@flash/ui-components';
const packageJson = 'package.json';
const packageLock = 'package-lock.json';
const INSTALL = 'npm install';
const BUILD_COMPONENT_LIBRARY = 'npm run build:cl';

/* GET USER INPUT */
const pathToAppShell = argv[2];
if (!pathToAppShell) {
  console.log('USAGE: npm run export [path/to/your/project]');
  process.exit(1);
}

/* INSTALL AND BUILD IN COMPONENT LIBRARY */
console.log('installing in component library...');
execSync(INSTALL);
console.log('building component library...');
execSync(BUILD_COMPONENT_LIBRARY);

/* FIND TAR FILE AFTER BUILD */
const tarFile = fs
  .readdirSync(buildDirComponentLibrary)
  .find((file) => file.endsWith('.tgz'));
if (!tarFile) {
  console.error('error: could not find built tar ball...exiting...');
  process.exit(1);
} else console.log('successfully found built tar ball');

/* RENAME TAR FILE WITH DATETIME SUFFIX */
const now = new Date();
const dateTimeSuffix = now
  .toISOString()
  .replace(/:/g, '-')
  .replace(/\..+/, '')
  .replace('T', '_');
const tarFileNameParts = tarFile.split('.');
const tarFileExt = tarFileNameParts.pop();
const tarFileBaseName = tarFileNameParts.join('.');
const newTarFileName = `${tarFileBaseName}_${dateTimeSuffix}.${tarFileExt}`;
const originalTarFilePath = path.join(buildDirComponentLibrary, tarFile);
const newTarFilePath = path.join(buildDirComponentLibrary, newTarFileName);

console.log(`Renaming tar file to: ${newTarFileName}`);
fs.renameSync(originalTarFilePath, newTarFilePath);
const fullTarFilePath = newTarFilePath;

/* ADD TAR FILE PATH IN PACKAGE JSON OF OTHER PROJECT */
console.log('updating package.json in your project...');
process.chdir(pathToAppShell);
const packageJsonString = fs.readFileSync(packageJson).toString();
const newPackageJsonString = packageJsonString.replace(
  new RegExp(`"${componentLibraryPackage}": ".*"`),
  `"${componentLibraryPackage}": "file:${fullTarFilePath}"`
);
fs.writeFileSync(packageJson, newPackageJsonString);

/* REMOVE OLD PACKAGES IN OTHER PROJECT */
console.log('removing entry in package-lock.json...');
const packageLockContent = JSON.parse(
  fs.readFileSync(packageLock, 'utf8')
) as PackageLock;
packageLockContent['packages'][`node_modules/${componentLibraryPackage}`] = {
  version: '',
  packages: {},
};
fs.writeFileSync(packageLock, JSON.stringify(packageLockContent, null, 4));
console.log('removing old component library in node modules...');
fs.rmSync(`node_modules/${componentLibraryPackage}`, { recursive: true });

/* INSTALL NEW PACKAGES IN OTHER PROJECT */
console.log('installing new component library...');
execSync(INSTALL);
