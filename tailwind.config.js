/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neuro: {
          dark: '#0b0f19',
          card: '#121826',
          border: '#1f293d',
          accent: '#38bdf8',
          amber: '#f59e0b',
          rose: '#f43f5e',
          emerald: '#10b981',
          purple: '#a855f7',
        }
      }
    },
  },
  plugins: [],
}
