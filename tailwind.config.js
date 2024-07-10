/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      width: {
        '86.1': '86.1vw',
        '46.53': '46.53%'
      },
      padding: {
        '30.16': '30.16%'
      },
      fontFamily: {
        'satoshi': ['Satoshi', 'sans-serif'],
        'integral-cf': ['Integral CF', 'sans-serif']
      },
    }
  },
  plugins: [],
}

