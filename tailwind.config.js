/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0A0A0A',
        'bg-card': '#111111',
        'bg-card-alt': '#141414',
        'cyan-accent': '#00C8FF',
        'text-primary': '#FFFFFF',
        'text-secondary': '#888888',
        'text-tertiary': '#AAAAAA',
        'border-card': '#1E1E1E',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'widest': '0.2em',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'rotate-3d': 'rotate-3d 20s linear infinite',
      },
      perspective: {
        '1000': '1000px',
        '2000': '2000px',
      },
    },
  },
  plugins: [],
}
