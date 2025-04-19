/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundColor: {
        'dark': '#121212',
        'dark-surface': '#1E1E1E',
      },
      textColor: {
        'dark': '#FFFFFF',
        'dark-secondary': '#A0A0A0',
      },
      borderColor: {
        'dark': '#2D2D2D',
      }
    },
  },
  plugins: [],
};
