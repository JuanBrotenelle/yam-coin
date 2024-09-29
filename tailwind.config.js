/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  theme: {
    extend: {
      colors: {
        'textmain': '#e3e3e3',
        'textadditional': '#404040',
        'components': '#161616',
        'componentsadditional': '#232323',
      },
    },
  },
  plugins: [],
}