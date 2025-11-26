/*
Generates a file which imports svgs and exposes them as react components.

Usage: npm run gen:svg

When the script runs, it scans the chosen directories (configurable below)
and finds all the svgs in those directories. It then 
generates the file src/storybook/svgComponents.autogen.tsx, which is based on the 
template file scripts/svgComponentsTemplate.txt. 

ASSUMPTION: the SVGs loaded all have distinct names (even if they were 
loaded from different directories)
*/

import * as fs from 'fs';
import * as path from 'path';
import { generateFile } from './fileGenerator';

const npmProjectRootDir = process.cwd();
const dirToWriteTo = path.join(npmProjectRootDir, 'src/storybook');
const fileToWriteTo = 'svgComponents.tsx';
const templateFile = path.join(
  npmProjectRootDir,
  'scripts/svgComponentsTemplate.txt'
);

interface SvgDir {
  path: string;
  label: string;
  storybookUrl: string;
}

const dirsToScan: SvgDir[] = [
  {
    path: 'assets/svgs/icons',
    label: 'iconSvgs',
    storybookUrl: 'svgs/icons',
  },
  {
    path: 'assets/svgs/other',
    label: 'otherSvgs',
    storybookUrl: 'svgs/other',
  },
  {
    path: 'assets/svgs/products',
    label: 'productSvgs',
    storybookUrl: 'svgs/products',
  },
];

console.log('Generating SVG imports...');
generateSvgrImporter(
  npmProjectRootDir,
  dirToWriteTo,
  fileToWriteTo,
  templateFile,
  dirsToScan
);

function generateSvgrImporter(
  npmProjectRootDir: string,
  dirToWriteTo: string,
  fileToWriteTo: string,
  templateFile: string,
  dirsToScan: SvgDir[]
) {
  // strings to populate template
  let importStatements = '';
  let componentMap = '\n';
  let svgLists = '';

  dirsToScan.forEach((dir) => {
    const dirAbsPath = path.join(npmProjectRootDir, dir.path);
    const fileNames = getFileNamesInDir(dirAbsPath);
    let svgList = `export const ${dir.label} = [\n`;
    fileNames.forEach((fileName) => {
      const fileNameWithoutExt = removeFileExtension(fileName);
      const fileNameInPascalCase = capitaliseFirstLetter(fileNameWithoutExt);
      const importPath = dir.path + '/' + fileName;
      importStatements += `import ${fileNameInPascalCase} from '@root/${importPath}?react'\n`;
      componentMap += `  ${fileNameWithoutExt}: ${fileNameInPascalCase},\n`;
      svgList += `  '${fileNameWithoutExt}',\n`;
    });
    svgLists += svgList + ']\n';
  });

  const template = fs.readFileSync(templateFile).toString();
  const dataToWrite = template
    .replace('IMPORT_STATEMENTS', importStatements)
    .replace('COMPONENT_MAP', componentMap)
    .replace('SVG_LISTS', svgLists);
  generateFile(path.join(dirToWriteTo, fileToWriteTo), dataToWrite);
}

// helper functions used

function getFileNamesInDir(dir: fs.PathLike) {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((dirent) => dirent.isFile())
    .map((dirent) => dirent.name);
}

function removeFileExtension(fileName: string): string {
  return fileName.replace(/\.[^/.]+$/, '');
}

function capitaliseFirstLetter(x: string): string {
  return x[0].toUpperCase() + x.slice(1);
}
