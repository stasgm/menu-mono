const config = {
  "*.{js,jsx,ts,tsx,cjs}": ["prettier --write", "eslint --fix"],
  "*.{md,html,css}": ["prettier --write"],
  "package.json": ["prettier-package-json --write"],
};

module.exports = config;
