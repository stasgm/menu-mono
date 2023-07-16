/**
 * This ESLint file configuration is shared across ALL `/app/*` and `/packages/*`
 * You don't need to install or define per project ESLint configuration
 * Use the "overrides" key to apply per project configurtion
 * Install all ESLint plugins in the top-level package.json (pnpm add -D <name> -w)
 */
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2022: true,
    'jest/globals': true,
  },
  ignorePatterns: [
    '.eslintrc.js',
    '.lintstagedrc.js',
    'next.config.js',
    'jest.config.js',
    'jest.setup.js',
    'tailwind.config.js',
    'postcss.config.js',
  ],
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    '@typescript-eslint/eslint-plugin',
    'simple-import-sort',
    'security',
    'sonarjs',
    'jest',
    'unicorn',
    'prettier',
  ],
  extends: [
    'next',
    'turbo',
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:security/recommended',
    'plugin:sonarjs/recommended',
    'plugin:jest/recommended',
    'plugin:unicorn/recommended',
  ],
  rules: {
    'prettier/prettier': [
      'error',
      {},
      {
        fileInfoOptions: {
          withNodeModules: true,
        },
      },
    ],
    // TypeScript specific rules are disabled by default
    // And enabled in "overrides" for TypeScript files only
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    // https://typescript-eslint.io/rules/no-unused-vars/
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    'max-len': [
      'error',
      {
        code: 100,
        ignoreComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ],
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'unicorn/prevent-abbreviations': 'off',
    'unicorn/no-null': 'off',
    'jest/expect-expect': 'off',
    'unicorn/prefer-top-level-await': 'off',
    'security/detect-possible-timing-attacks': 'off',
    'security/detect-object-injection': 'off',
    'unicorn/no-array-reduce': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-var-requires': 'error',
      },
    },
  ],
};
