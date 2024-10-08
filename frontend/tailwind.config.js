/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          '100': '#042959',
          '200': '#0A4DA6',
          '300': '#2c7ce6',
          '400': '#79C4F2',
          '500': '#c7e3f0'
        }
      },
      fontFamily: {
        dmsan: ["DM Sans", "san-serif"],
        montserrat: ["Montserrat","san-serif"]
      },

    },
    screens: {
      xs:"480px",
      sm:"768px",
      md:"1060px"
    }
  },
  plugins: [],
}

