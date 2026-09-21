/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        violet: {
          650: '#6D28D9',
        },
        magenta: {
          DEFAULT: '#D6249F',
          light: '#E63FB5',
        },
        surface: {
          light: '#F6F4FB',
          dark: '#141018',
          card: '#1C1721',
        },
      },
      fontFamily: {
        display: ['"Archivo Black"', '"Arial Black"', 'sans-serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(90deg, #4F46E5 0%, #9333EA 50%, #D6249F 100%)',
      },
    },
  },
  plugins: [],
}
