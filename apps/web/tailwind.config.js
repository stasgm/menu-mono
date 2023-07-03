/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'check-start': 'hsl(192, 100%, 67%)',
        'check-end': 'hsl(280, 87%, 65%)',
      },
      fontFamily: {
        body: ['Josefin Sans', 'sans-serif'],
      },
      backgroundImage: {
        'mobile-dark': "url('/bg-mobile-dark.jpg')",
        'desktop-dark': "url('/bg-desktop-dark.jpg')",
        'desktop-dark-2': "url('/bg-desktop-dark-2.jpg')",
        'desktop-dark-3': "url('/bg-desktop-dark-3.jpg')",
      },
    },
  },
  plugins: [],
};
