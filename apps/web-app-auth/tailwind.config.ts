import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        gris: '#1E2022',
        negrito: '#1A1A1B',
        negrito2: '#151515',
        celestucho: '#d6e0f0',
        celestucho2: '#c9d6df',
        grisstacy: '#8d93ab',
        blancucho: '#F1F3F8',
        cv: '#f0f5f9',
        dorado: '#FFE194',
        verde: '#C9F4AA',
        rojo: '#F48484',
        azulito: '#AEE2FF',
      },
    },
  },
  plugins: [],
};
export default config;
