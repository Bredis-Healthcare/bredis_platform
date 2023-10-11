/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      // sm: { min: "500px", max: "800px" },
      // md: { min: "750px", max: "1280px" },
      md: { max: "1280px" },
      lg: { min: "1280px" },
    },
    extend: {},
  },
  plugins: [],
}

