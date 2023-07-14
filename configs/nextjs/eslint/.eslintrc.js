const eslintBaseConfig = require("./eslint.base");

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
