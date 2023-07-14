// module.exports = {
//   root: true,
//   plugins: ['prettier'],
//   extends: ['next', 'next/core-web-vitals', 'plugin:prettier/recommended'],
//   rules: {
//     'prettier/prettier': 'error',
//   },
//   ignorePatterns: [
//     'next.config.js',
//     'jest.config.js',
//     'jest.setup.js',
//     'tailwind.config.js',
//     'postcss.config.js',
//     '.eslintrc.js'
//   ],
// };

const eslintBaseConfig = require("@configs/next-eslint");

export default {
  ...eslintBaseConfig,
  extends: [
    ...eslintBaseConfig.extends,
    "next",
    "turbo",
    "prettier",
    "next/core-web-vitals",
    "plugin:prettier/recommended",
  ],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
  },
};
