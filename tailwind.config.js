/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'oklch(0.985 0 0)',
          100: 'oklch(0.967 0.001 286.375)',
          200: 'oklch(0.92 0.004 286.32)',
          300: 'oklch(0.871 0.006 286.286)',
          400: 'oklch(0.705 0.015 286.067)',
          500: 'oklch(0.552 0.016 285.938)',
          600: 'oklch(0.442 0.017 285.786)',
          700: 'oklch(0.37 0.013 285.805)',
          800: 'oklch(0.21 0.006 285.885)',
          900: 'oklch(0.0 0.005 0.0)',
        },
        secondary: {
          50: 'oklch(0.985 0 0)',
          100: 'oklch(0.967 0.001 286.375)',
          200: 'oklch(0.92 0.004 286.32)',
          300: 'oklch(0.871 0.006 286.286)',
          400: 'oklch(0.705 0.015 286.067)',
          500: 'oklch(0.552 0.016 285.938)',
          600: 'oklch(0.442 0.017 285.786)',
          700: 'oklch(0.37 0.013 285.805)',
          800: 'oklch(0.21 0.006 285.885)',
          900: 'oklch(0.141 0.005 285.823)',
        }
      },
      fontFamily: {
        sans: ['Roboto', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 