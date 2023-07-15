const eslintBaseConfig = require('@configs/nest-eslint');

module.exports = {
  ...eslintBaseConfig,
  ignorePatterns: [...eslintBaseConfig.ignorePatterns, 'generate-typings.ts'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: 'tsconfig.json',
  },
};
