const eslintBaseConfig = require('@monorepo/eslint-config/eslint.base');

module.exports = {
  ...eslintBaseConfig,
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: 'tsconfig.json',
  },
};
