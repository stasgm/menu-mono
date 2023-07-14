module.exports = {
  root: true,
  plugins: ['prettier'],
  extends: ['next', 'next/core-web-vitals', 'plugin:prettier/recommended'],
  rules: {
    'prettier/prettier': 'error',
  },
  ignorePatterns: [
    'next.config.js',
    'jest.config.js',
    'jest.setup.js',
    'tailwind.config.js',
    'postcss.config.js',
    '.eslintrc.js'
  ],
};