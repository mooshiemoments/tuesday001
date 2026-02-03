/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mooshie: {
          purple: '#7A3E9D',
          gold: '#FDC22D',
          coral: '#F47C47',
          cream: '#FFF9F0',
          text: '#4A4252',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
