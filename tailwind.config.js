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
          primary: '#72c9cc',

          secondary: '#3eefc0',

          accent: '#9eed80',

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
  plugins: [require('daisyui')],
};
