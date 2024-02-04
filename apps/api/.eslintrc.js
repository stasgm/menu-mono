const eslintBaseConfig = require('@configs/nest-eslint');

module.exports = {
  ...eslintBaseConfig,
  ignorePatterns: [...eslintBaseConfig.ignorePatterns],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
  },
};
