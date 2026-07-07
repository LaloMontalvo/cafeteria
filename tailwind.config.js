/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cafe: {
          50: '#FDF8F0',
          100: '#F5EDE3',
          200: '#E8DDD0',
          300: '#D4A574',
          400: '#C8956C',
          500: '#8B6F47',
          600: '#6F4E37',
          700: '#4A3728',
          800: '#362A20',
          900: '#1A1210',
        }
      },
      fontFamily: {
        heading: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
