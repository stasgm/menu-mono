/**
 * This Prettier configuration file is shared across ALL `/app/*` and `/packages/*`
 * You don't need to define per project Prettier configuration
 */
module.exports = {
  plugins: [require('prettier-plugin-tailwindcss')],
  arrowParens: 'always',
  bracketSpacing: true,
  htmlWhitespaceSensitivity: 'css',
  insertPragma: false,
  jsxSingleQuote: false,
  printWidth: 100,
  proseWrap: 'preserve',
  quoteProps: 'as-needed',
  requirePragma: false,
  semi: true,
  singleQuote: true,
  trailingComma: 'es5',
  useTabs: false,
};
