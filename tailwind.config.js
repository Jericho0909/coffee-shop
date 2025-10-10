/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['"Nunito Sans"', 'sans-serif'],
        opensans: ['"Open Sans"', 'sans-serif']
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant('hoverable', '@media (hover: hover) and (pointer: fine)');
    },
  ],
}

