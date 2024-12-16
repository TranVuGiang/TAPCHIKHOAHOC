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
          '500': '#c7e3f0',
          '600': '#000080',
          '700': '#1E90FF',
          '800': '#2d3e96',
          "900": '#f2f2f5'
        },
       
      },
      fontFamily: {
        dmsan: ["DM Sans", "san-serif"],
        montserrat: ["Montserrat","san-serif"]
      },
      animation: {
        'spin-reverse': 'spin 1s linear infinite reverse',
        'bounce': 'bounce 1s infinite',
      },
      keyframes: {
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' }
        }
      }

    },
    screens: {
      xs:"480px",
      sm:"768px",
      md:"1060px"
    }
  },
  plugins: [],
}

