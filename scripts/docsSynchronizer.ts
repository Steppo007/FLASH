/*
Scans all the docs files and searches for certain annotations
which indicate that code snippets should be injected in the 
docs file. Then injects that code snippet.

Usage: npm run sync:docs
*/

import { glob } from 'glob';
import * as fs from 'fs';
import * as path from 'path';
import { EOL } from 'os';

console.log('Injecting example code snippets in documentation pages...');

injectCodeSnippetsInAllDocsFiles();

async function injectCodeSnippetsInAllDocsFiles(): Promise<void> {
  const docsFiles = await glob('src/storybook/**/docs.mdx');
  docsFiles.forEach((docsFile) => {
    injectCodeSnippets(docsFile);
  });
}

function injectCodeSnippets(docsFile: string): void {
  // we will go through the file line by line
  const fileLines = getFileLines(docsFile);

  // string to use when rewriting the transformed file
  let outputFileString = '';

  // if the current line should be copied over
  let copying = true;

  // path to code snippet that we should inject
  let pathToCodeSnippet = '';

  // if the file was actually transformed at all
  let shouldRewriteFile = false;

  /**
   * injects code snippet in between starting
   * and ending annotations
   */
  fileLines.forEach((fileLine) => {
    if (copying) {
      outputFileString += fileLine + EOL;
    }
    if (fileLineIsStartingAnnotation(fileLine)) {
      pathToCodeSnippet = getFullPathToCodeSnippetFromStartingAnnotation(
        fileLine,
        docsFile
      );
      copying = false;
    } else if (fileLineIsEndingAnnotation(fileLine)) {
      const codeSnippet = getCodeSnippet(pathToCodeSnippet);
      outputFileString += codeSnippet + fileLine + EOL;
      shouldRewriteFile = true;
      copying = true;
    }
  });

  if (shouldRewriteFile) {
    fs.writeFileSync(docsFile, outputFileString.trim());
  }
}

function getFileLines(file: fs.PathOrFileDescriptor): string[] {
  const fileString = fs.readFileSync(file, { encoding: 'utf-8' });
  return fileString.split(EOL);
}

function fileLineIsStartingAnnotation(fileLine: string): boolean {
  return fileLine.startsWith('[comment]: # (START WRITE');
}

function fileLineIsEndingAnnotation(fileLine: string): boolean {
  return fileLine.startsWith('[comment]: # (END WRITE');
}

function getCodeSnippet(pathToCodeSnippet: fs.PathOrFileDescriptor): string {
  const code = fs
    .readFileSync(pathToCodeSnippet, { encoding: 'utf-8' })
    .replace(/@complib/g, '@flash/ui-components')
    .replace(/@root\/src\/components/g, '@flash/ui-components')
    .replace(/@root\/assets/g, '@flash/ui-components/assets');

  const codeSnippet =
    '[comment]: # (DO NOT EDIT: the following has been auto-generated with the command "npm run sync:docs")' +
    EOL +
    '```jsx' +
    EOL +
    code +
    '```' +
    EOL;
  return codeSnippet;
}

function getFullPathToCodeSnippetFromStartingAnnotation(
  annotation: string,
  docsFile: string
): string {
  const tokens = annotation.split(' ');
  const pathToCodeSnippet = tokens[tokens.length - 1].replace(')', '');
  const fullPathToCodeSnippet = path.join(docsFile, '..', pathToCodeSnippet);
  return fullPathToCodeSnippet;
}
