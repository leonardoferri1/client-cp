/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        defaultGreen: "#6da362",
        defaultYellow: "#ddc652",
        brand: "#017DB9",
        brandLight: "#4ECAFF",
        brandDark: "#004A86"
      },
    },
  },
  plugins: [],
};
