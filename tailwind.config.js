/** @type {import('tailwindcss').Config} */
export default {
  // important: true,
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './node_modules/primereact/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        cart_course_fade_in: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        cart_course_fade_in: 'cart_course_fade_in 250ms linear 250ms forwards',
      },
    },
  },
  plugins: [],
};
