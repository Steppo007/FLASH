import * as fs from 'fs';

/**
 * Extracts all token names from css file
 */
export function getUniqueTokenNames(
  tokenFile: fs.PathOrFileDescriptor
): string[] {
  const tokenFileContent = fs.readFileSync(tokenFile).toString();
  const matches = [...tokenFileContent.matchAll(/--([-\w]*):/g)];
  const tokenNames = matches.map((x) => x[1]);
  const uniqueTokenNames = [...new Set(tokenNames)];
  return uniqueTokenNames;
}
