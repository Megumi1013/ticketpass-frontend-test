/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      primary: '#34cc98',
      secondary: '#222634',
      white: '#ffffff',
      'light-green': '#e3f7ee',
      'dark-gray': '#3b3d44',
      'gray': '#a1a4ae',
      'light-gray': '#f4f5f7',
      'gray-100': '#f3f4f6',
      'gray-200': '#dbdcde',
      'dark-blue': '#222634',
      'light-blue': '#3b3d44',
      'red': '#ff6565',
      transparent: 'transparent',
    },
  },
  plugins: [],
}
