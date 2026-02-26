/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0A0A14',
        accent: '#7B61FF',
        background: '#F0EFF4',
        dark: '#18181B',
      },
      fontFamily: {
        heading: ['Sora', 'sans-serif'],
        drama: ['Instrument Serif', 'serif'],
        data: ['Fira Code', 'monospace'],
      },
      boxShadow: {
        cinema: '0 30px 80px rgba(10,10,20,0.25)',
      }
    },
  },
  plugins: [],
}
