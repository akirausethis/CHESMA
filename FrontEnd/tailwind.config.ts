/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        brand: {
          primary: '#4CAF50',
          dark: '#2E7D32',
          light: '#E8F5E9',
          accent: '#FF9800',
          bg: '#F4F7F6',
        },
        surface: {
          white: '#FFFFFF',
        },
        text: {
          main: '#111827',
          muted: '#6B7280',
        }
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}