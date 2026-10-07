/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          dark: '#030712',
          card: '#0b1120',
          border: 'rgba(56, 189, 248, 0.2)',
          accent: '#38bdf8',
          glow: '#00f0ff',
        }
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      }
    },
  },
  plugins: [],
}

