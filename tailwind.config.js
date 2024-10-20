/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customBlue: '#1C3879',     // Màu chính
        secondary: '#607EAA',   // Màu phụ
        background: '#FBF7EE',  // Màu nền
        highlight: '#F9F5EB',   // Màu nhấn
      },
      fontFamily: {
        ebgaramond: ['"EB Garamond"', 'serif'],
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: ["light"],
  },
}
