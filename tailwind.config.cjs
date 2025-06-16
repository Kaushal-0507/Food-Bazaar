/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Arial", "Helvetica", "sans-serif"],
      },
      animation: {
        shimmer: "shimmer 2s infinite ease-in-out",
      },
      keyframes: {
        shimmer: {
          "0%": { 
            backgroundPosition: "-200% 0",
            opacity: "0.5"
          },
          "50%": {
            opacity: "1"
          },
          "100%": { 
            backgroundPosition: "200% 0",
            opacity: "0.5"
          },
        },
      },
      backgroundSize: {
        "200%": "200% 100%",
      },
    },
  },
  plugins: [],
} 