/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#fcd662',

          secondary: '#f5b65b',

          accent: '#6288FC',

          // neutral: '#fcd662',
          neutral: '#25283c',

          'base-100': '#434148',

          info: '#6382de',

          success: '#23cd6f',

          warning: '#c26b14',

          error: '#f90b27',
        },
      },
    ],
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
};
