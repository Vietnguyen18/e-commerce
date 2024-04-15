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
      keyframes: {
        'slide-top' : {
          '0%' : {
            '-webkit-transform': 'translateY(100)',
                    transform: 'translateY(100)'
          },
          '100%': {
            '-webkit-transform':' translateY(0px)',
                    transform: 'translateY(0px)'
          }
        }
      },
      animation: {
        'slide-top':'slide-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both'
      },
      flex: {
        '2': '2 2 0%',
        '3': '3 3 0%',
        '4': '4 4 0%',
        '5': '5 5 0%',
      },
    },
  },
  plugins: [
    '@tailwindcss/line-clamp'
  ],
}