/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        '482': '482px',
      },
      height: {
        '326': '326px',
      },
      backgroundColor: {
        'cardBg' : '#1F2B3D'
      },
      fontFamily: {
        inter:["Inter"],
        montserrat:["Montserrat"],
        newfont:[""]
      }
    },
  },
  plugins: [],
}