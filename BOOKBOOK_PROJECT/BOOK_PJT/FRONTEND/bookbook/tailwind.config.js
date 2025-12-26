/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#FAFAFA',
      },
      fontFamily: {
        sans: ['LeeSeoyun', 'sans-serif'],
      },
      colors: {
        background: '#FAF9F6',
      },
    },
  },
  plugins: [],
}