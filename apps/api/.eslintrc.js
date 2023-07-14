const eslintBaseConfig = require('@configs/nest-eslint');

module.exports = {
  ...eslintBaseConfig,
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: 'tsconfig.json',
  },
};
