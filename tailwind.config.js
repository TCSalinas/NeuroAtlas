/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Arial', 'Helvetica Neue', 'Helvetica', 'sans-serif'],
        serif: ['Times New Roman', 'Times', 'serif'],
      },
      colors: {
        pastel: {
          bg: '#fbf9f5',       // Warm alabaster / linen base
          surface: '#ffffff',  // Pure white card
          surfaceWarm: '#f5f2eb', // Soft warm parchment
          border: '#e6e1d6',   // Soft warm border
          borderLight: '#f0ede6',
          text: '#1e293b',     // Deep charcoal slate
          textMuted: '#64748b', // Medium slate
          textLight: '#94a3b8',
          
          // Accent pastels
          sky: '#bae6fd',
          skyText: '#0369a1',
          skyBorder: '#7dd3fc',

          sage: '#bbf7d0',
          sageText: '#15803d',
          sageBorder: '#86efac',

          peach: '#fed7aa',
          peachText: '#c2410c',
          peachBorder: '#fdba74',

          rose: '#fbcfe8',
          roseText: '#be185d',
          roseBorder: '#f472b6',

          lavender: '#ddd6fe',
          lavenderText: '#6d28d9',
          lavenderBorder: '#c4b5fd',

          cream: '#fef3c7',
          creamText: '#b45309',
          creamBorder: '#fde68a',
        }
      }
    },
  },
  plugins: [],
}
