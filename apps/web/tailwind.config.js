const tailwindBaseConfig = require("@configs/tailwind/tailwindconfig.base");

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [tailwindBaseConfig],
  content: ["./src/**/*.{js,jsx,ts,tsx,cjs,mjs}"],
};
