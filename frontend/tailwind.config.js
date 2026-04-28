import { defineConfig } from 'tailwindcss'

export default defineConfig({
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['"Montserrat"', 'sans-serif'],
        sans: ['"Montserrat"', 'sans-serif'],
        mono: ['"Montserrat"', 'sans-serif'],
        archivo: ['"Montserrat"', 'sans-serif'],
        bebas: ['"Montserrat"', 'sans-serif'],
        geologica: ['"Montserrat"', 'sans-serif'],
        roboto: ['"Montserrat"', 'sans-serif'],
      },
    },
  },
})