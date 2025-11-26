// imported values from: https://pd.bitbucket.syskron.com/projects/SAC/repos/s2a-eslint-config/browse/.prettierrc.js
// see: https://prettier.io/docs/en/options.html
/** @type {import("prettier").Config} */
const config = {
  trailingComma: 'es5',
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  useTabs: false,
  printWidth: 80,
  bracketSpacing: true,
  arrowParens: 'always',
  endOfLine: 'auto',
  overrides: [],
  plugins: ['prettier-plugin-tailwindcss', '@prettier/plugin-xml'],
  tailwindFunctions: ['classNames'],
};

module.exports = config;
