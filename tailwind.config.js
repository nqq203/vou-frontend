const { Montserrat } = require('next/font/google');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ['Satoshi', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        montserrat:['Montserrat','sans-serif'], 
      },
      fontSize: {
        heading1: ['28px',{ fontWeight: 'bold' }],
        heading2: ['24px',{ fontWeight: 'bold' }],
        heading3_bold: ['20px',{ fontWeight: 'bold' }],
        heading3_semibold: ['20px',{ fontWeight: 700 }],
        heading3_medium: ['20px',{ fontWeight: 600 }],
      },
      colors: {
        primary: '#EA661C',
        black: '#0F0F0F',
        white: '#FDFDFD',
        background: '#FFFBF8',
        red: '#FF4C4C',    // Error
        pending: '#F1C232', // Yellow 
        active: '#56CC56',  // green 
        infoBlue: '#2196F3',   // Info
        yellow: {
          50: '#FFF5D9',
          100: '#56CC56',
        },
        blue: {
          50: '#E7EDFF',
          100: '#396AFF',
          200: '#718EBF',
        },
        pink: {
          50: '#FFE0EB',
          100: '#FF82AC',
        },
        green: {
          50: '#DCFAF8',
          100: '#16DBCC',
        },
        grey: {
          50: '#f4f4f4',
          100: '#dedede',
          200: '#cecece',
          300: '#b7b7b7',
          400: '#a9a9a9',
          500: '#949494',
          600: '#878787',
          700: '#696969',
          800: '#515151',
          900: '#3e3e3e',
        },
        brown: {
          50: '#fdf0e8',
          100: '#f8d0b9',
          200: '#f5b997',
          300: '#f19867',
          400: '#ee8549',
          500: '#ea661c',
          600: '#d55d19',
          700: '#a64814',
          800: '#81380f',
          900: '#622b0c',
        },
      },
      keyframes: {
        bottom_to_mid: {
          '0%': { top: '0', opacity: '0.5' },
          '100%': { top: '1/3', opacity: '1' },
        },
      },
      animation: {
        bottom_to_mid: 'bottom_to_mid 0.3s ease',
      },
    },
  },
  plugins: [],
}

