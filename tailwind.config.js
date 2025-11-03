/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        techbg: "#101522",
        accent: "#00A3FF",
        accent2: "#35C2FF",
        success: "#2ECC71",
        warn: "#FF9F43"
      }
    }
  },
  plugins: []
};