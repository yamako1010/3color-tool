/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#6366f1',
        'secondary': '#8b5cf6',
        'accent': '#f59e0b',
      },
    },
  },
  plugins: [],
  safelist: [
    'bg-primary',
    'text-primary',
    'bg-secondary',
    'text-secondary',
    'bg-accent',
    'text-accent',
    'hover:bg-primary/90',
    'border-primary'
  ]
}
