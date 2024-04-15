/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}",
  "./public/index.html"
],
  theme: {
    fontFamily: {
      main: ['Roboto', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
    },
    extend: {
      width: {
        main: '1270px',
      },
      backgroundColor: {
        main: '#be1e2d',
      },
      colors: {
        main: '#be1e2d',
      },
    },
  },
  plugins: [],
}