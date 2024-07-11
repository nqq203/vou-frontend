const { Montserrat } = require('next/font/google');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ['Satoshi', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        montserrat:['Montserrat','sans-serif'], 
      },
      colors: {
        primary: '#EA661C',
        black: '#0F0F0F',
        white: '#FDFDFD',
        background: 'FFFBF8',
        red: '#FF4C4C',    // Error
        pending: '#56CC56', // Yellow 
        active: '#56CC56',  // green 
        infoBlue: '#2196F3',   // Info
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
    },
  },
  plugins: [],
}

