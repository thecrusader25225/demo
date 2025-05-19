/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pacifico: ['Pacifico', 'sans-serif'],
        dancing: ['Dancing Script', 'sans-serif'],
        sour:['Sour Gummy', 'sans-serif']
      },
    },
  },
  plugins: [],
}

