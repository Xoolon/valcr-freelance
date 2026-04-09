/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        acid: '#C8FF57',
        ink: {
          50: '#F0F0FA', 100: '#E0E0F0', 200: '#C0C0E0', 300: '#A0A0CC',
          400: '#8080B0', 500: '#606090', 600: '#404070', 700: '#2A2A50',
          800: '#1A1A35', 900: '#0F0F22', 950: '#0A0A18',
        },
      },
      fontFamily: {
        display: ['DM Serif Display', 'Georgia', 'serif'],
        mono: ['DM Mono', 'Fira Mono', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
