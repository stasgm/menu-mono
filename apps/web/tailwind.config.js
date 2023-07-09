/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      xs: '475px',
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        'check-start': 'hsl(192, 100%, 67%)',
        'check-end': 'hsl(280, 87%, 65%)',
      },
      fontFamily: {
        body: ['Josefin Sans', 'sans-serif'],
      },
      backgroundImage: {},
    },
  },
  plugins: [],
};
