const eslintBaseConfig = require("@configs/eslint/eslint.base");

module.exports = {
  ...eslintBaseConfig,
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: "tsconfig.json",
  },
};
