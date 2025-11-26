/*
Generates boilerplate code for a new component. Note, this
does also modify some existing files. 

Usage: npm run new:comp [category] [component]
*/

import * as fs from 'fs';
import * as path from 'path';

/* CONFIGURATION STARTS HERE */

const templatesDirectory = 'scripts/componentGeneratorTemplates';
const componentsDirectoryBase = 'src/components';
const storybookDirectoryBase = 'src/storybook/components';
const testDirectoryBase = 'tests';
const storybookConfigDirectory = '.storybook';

/* CONFIGURATION ENDS HERE */

const { categoryName, componentName } = validateParameters();

console.log(
  `Generating component boiler plate...\n\nCategory: ${categoryName}\nComponent: ${componentName}`
);

const componentsDirectory = path.join(
  componentsDirectoryBase,
  categoryName,
  componentName.toLowerCase()
);

const storybookDirectory = path.join(
  storybookDirectoryBase,
  categoryName,
  componentName.toLowerCase()
);

const testDirectory = path.join(
  testDirectoryBase,
  categoryName,
  componentName.toLowerCase()
);

writeBoilerplate({
  targetDir: componentsDirectory,
  targetFileName: 'comp.tsx',
  templateFileName: 'comp.tsx.txt',
});

writeBoilerplate({
  targetDir: componentsDirectory,
  targetFileName: 'types.ts',
  templateFileName: 'types.ts.txt',
});

writeBoilerplate({
  targetDir: componentsDirectory,
  targetFileName: 'index.ts',
  templateFileName: 'index.ts.txt',
});

writeBoilerplate({
  targetDir: componentsDirectory,
  targetFileName: 'styles.css',
  templateFileName: 'styles.css.txt',
});

writeBoilerplate({
  targetDir: storybookDirectory,
  targetFileName: 'comp.stories.tsx',
  templateFileName: 'comp.stories.tsx.txt',
});

writeBoilerplate({
  targetDir: storybookDirectory,
  targetFileName: 'example.tsx',
  templateFileName: 'example.tsx.txt',
});

writeBoilerplate({
  targetDir: storybookDirectory,
  targetFileName: 'docs.mdx',
  templateFileName: 'docs.mdx.txt',
});

writeBoilerplate({
  targetDir: testDirectory,
  targetFileName: 'test.spec.ts',
  templateFileName: 'test.spec.ts.txt',
});

writeBoilerplate({
  targetDir: testDirectoryBase,
  targetFileName: 'storybook-components.ts',
  templateFileName: 'defaultProps.txt',
  writeFlag: 'a',
});

writeBoilerplate({
  targetDir: storybookConfigDirectory,
  targetFileName: 'cssImports.css',
  templateFileName: 'cssImport.txt',
  writeFlag: 'a',
});

interface BoilerplateOptions {
  templateDir?: string;
  templateFileName: string;
  targetDir: string;
  targetFileName: string;
  replacements?: Replacement[];
  writeFlag?: 'w+' | 'a';
}

function writeBoilerplate({
  templateDir = templatesDirectory,
  templateFileName,
  targetDir,
  targetFileName,
  replacements = getDefaultReplacements(),
  writeFlag = 'w+',
}: BoilerplateOptions) {
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const targetFile = path.join(targetDir, targetFileName);
  const templateFile = path.join(templateDir, templateFileName);

  const fileContents = fs.readFileSync(templateFile, { encoding: 'utf-8' });
  let fileToWrite = fileContents;
  for (const replacement of replacements) {
    fileToWrite = fileToWrite.replace(
      replacement.searchValue,
      replacement.replaceValue
    );
  }

  fs.writeFileSync(targetFile, fileToWrite, { flag: writeFlag });
}

interface Replacement {
  searchValue: RegExp;
  replaceValue: string;
}

function getDefaultReplacements(): Replacement[] {
  return [
    { searchValue: /\$Component/g, replaceValue: componentName },
    {
      searchValue: /\$component/g,
      replaceValue: componentName.toLowerCase(),
    },
    {
      searchValue: /\$SBcomponent/g,
      replaceValue:
        componentName[0].toLowerCase() + componentName.slice(1) + 'SB',
    },
    {
      searchValue: /\$category/g,
      replaceValue: categoryName,
    },
    {
      searchValue: /\$Category/g,
      replaceValue: categoryName[0].toUpperCase() + categoryName.slice(1),
    },
    {
      searchValue: /\$classname/g,
      replaceValue: `kro-${componentName.toLowerCase()}`,
    },
  ];
}

interface Parameters {
  categoryName: string;
  componentName: string;
}

function validateParameters(): Parameters {
  const categoryName = process.argv[2];
  const componentName = process.argv[3];
  const areValid =
    categoryName &&
    componentName &&
    isLowerCase(categoryName) &&
    componentName[0] === 'K' &&
    !isLowerCase(componentName[1]);

  if (!areValid) {
    console.log(
      `
Usage: npm run new:comp [category] [component]

where:
  1) category is all lower-case, 
  2) component starts with "K" 
  3) second letter of component is capital
`
    );
    process.exit(1);
  }

  return { categoryName: categoryName.toLowerCase(), componentName };
}

function isLowerCase(x: string): boolean {
  return x.toLowerCase() === x;
}
