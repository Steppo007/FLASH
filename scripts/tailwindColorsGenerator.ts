/*
Reads all variable names in a given css file, and generates colors
directly in the tailwind.css file within the @theme block. Used for keeping 
the Tailwind color configuration in sync with the CSS color tokens.

E.g. the CSS :root { --colors-black: #000000 } becomes the tailwind @theme { --color-colors-black: var(--colors-black); }

Usage: npm run gen:tailwind
*/

import { getUniqueTokenNames } from './colorTokenParser';
import { addAutogenSuffix, generateFile } from './fileGenerator';

const tokenFile = 'css/colors.css';
const themeFile = 'css/tailwind.ui-library-theme.css';
const tsColorAutogenFile = './tailwind.colors.ts';

console.log('Generating Tailwind theme file...');

// Get unique token names from colors.css
const uniqueTokenNames = getUniqueTokenNames(tokenFile);

// Generate the color definitions with --color- prefix
let colorDefinitions = '';
uniqueTokenNames.forEach((name) => {
  colorDefinitions += `  --color-${name}: var(--${name});\n`;
});

// Create the complete theme file content
const themeContent = `@theme {
  --font-*: initial;
  --font-sans: Roboto;

  --shadow-*: initial;
  --shadow-thin: var(--box-shadow-thin);
  --shadow-thick: var(--box-shadow-thick);

  --color-*: initial;

  /* generated colors */
${colorDefinitions}
  /* end generated colors */
}
`;

// Write the theme file
generateFile(themeFile, themeContent);

console.log(
  `Successfully generated ${uniqueTokenNames.length} color tokens in ${addAutogenSuffix(themeFile)}`
);

// Generate TypeScript file with color tokens
console.log('Generating tailwind.colors.autogen.ts file...');

// Generate the TypeScript object content
let objectContent = '';
uniqueTokenNames.forEach((name, index) => {
  const isLast = index === uniqueTokenNames.length - 1;
  objectContent += `  "${name}": "var(--${name})"${isLast ? '' : ','}\n`;
});

// Create the complete TypeScript file content
const tsFileContent = `// used only for documentation purposes

export const colors = {
${objectContent}};

export default colors;
`;

// Write the TypeScript file to the root of the project
generateFile(tsColorAutogenFile, tsFileContent);

console.log(
  `Successfully generated ${uniqueTokenNames.length} color tokens in ${tsColorAutogenFile}`
);
