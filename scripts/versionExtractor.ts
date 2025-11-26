/*
Generates a file which exports the version numbers for primereact and
the component library.

Usage: npm run gen:version
*/

import * as fs from 'fs';
import * as path from 'path';
import { generateFile } from './fileGenerator';
import { PackageLock } from './common';

const packageLockJsonPath = './package-lock.json';
const dirToWriteTo = './src/storybook';
const fileToWriteTo = 'versions.ts';

console.log('Extracting version numbers...');
writeVersionFile(packageLockJsonPath, dirToWriteTo, fileToWriteTo);

function writeVersionFile(
  packageLockJsonPath: string,
  dirToWriteTo: string,
  fileToWriteTo: string
): void {
  const packageLockJson = JSON.parse(
    fs.readFileSync(packageLockJsonPath, 'utf-8')
  ) as PackageLock;
  const compLibVersion = packageLockJson.version;
  const primeReactVersion =
    packageLockJson.packages['node_modules/primereact'].version;
  const statement = `
export const compLibVersion = '${compLibVersion}'
export const primeReactVersion = '${primeReactVersion}'
`;
  const outputPath = path.join(dirToWriteTo, fileToWriteTo);
  generateFile(outputPath, statement);
}
