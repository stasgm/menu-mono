const eslintBaseConfig = require('@configs/nest-eslint');

module.exports = {
  ...eslintBaseConfig,
  ignorePatterns: [...eslintBaseConfig.ignorePatterns, 'prisma/seed.ts', 'generate-typings.ts'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
  },
};
