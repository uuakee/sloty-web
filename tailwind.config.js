/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        schibsted: ['Schibsted Grotesk', 'Helvetica', 'sans-serif'], // Adicione a fonte aqui
      },
    },
  },
  plugins: [],
}
