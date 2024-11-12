/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          50: "#E8E8E8",
          100: "#D1D1D1",
          200: "#A3A3A3",
          300: "#757575",
          400: "#474747",
          500: "#181818",
          600: "#141414",
          700: "#0F0F0F",
          800: "#0A0A0A",
          900: "#050505",
          950: "#030303",
        },
      },
      fontFamily: {
        schibsted: ['Schibsted Grotesk', 'Helvetica', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
