/*
Given two CSS files with definitions for color tokens, generates a "diff",
indicating which colors tokens have been removed and which have been added. These
are output to files called colorsRemoved.txt and colorsAdded.txt. This is meant
to help during the process of updating the color tokens. 

Usage: npm run colordiff [oldColors.css] [newColors.css]
*/

import { argv } from 'process';
import fs from 'fs';
import { getUniqueTokenNames } from './colorTokenParser';

const { oldColorsFile, newColorsFile } = parseParameters();

const oldColors = getUniqueTokenNames(oldColorsFile);
const newColors = getUniqueTokenNames(newColorsFile);

const colorsAdded = newColors.filter((x) => !oldColors.includes(x));
const colorsRemoved = oldColors.filter((x) => !newColors.includes(x));

fs.writeFileSync('colorsAdded.txt', colorsAdded.join('\n'));
fs.writeFileSync('colorsRemoved.txt', colorsRemoved.join('\n'));

interface Parameters {
  oldColorsFile: fs.PathOrFileDescriptor;
  newColorsFile: fs.PathOrFileDescriptor;
}

function parseParameters(): Parameters {
  const oldColorsFile = argv[2];
  const newColorsFile = argv[3];
  if (!oldColorsFile || !newColorsFile) {
    exitWithError('there are missing parameters');
  }

  if (!fs.existsSync(oldColorsFile) || !fs.existsSync(newColorsFile)) {
    exitWithError('at least one the files you provided does not exist');
  }

  return { oldColorsFile, newColorsFile };
}

function exitWithError(message: string) {
  console.log(
    `\nERROR: ${message}.\nUSAGE: npm run colordiff [oldColors.css] [newColors.css]`
  );
  process.exit(1);
}
