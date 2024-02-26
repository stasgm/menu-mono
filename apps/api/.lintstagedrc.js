const lintStagedBaseConfig = require('@configs/lint-staged');

const config = {
  ...lintStagedBaseConfig,
  "*.ts": ["prettier --write", "eslint --fix"],
  "package.json": ["prettier-package-json --write"],
};

module.exports = config;
