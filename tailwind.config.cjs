/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "blue-special": "#0079ff",
        "gray-special": "rgb(75, 106, 155)",
        "gray-special-2": "rgb(105, 124, 154)",
      },
      boxShadow: {
        "special": "0 0 15px -3px rgba(0, 121, 255, 0.5)",
      },
      screens: {
        "spe": { "raw": "(min-width: 900px)" },
      },
      gridColumn: {
        "span-special": "2 / 3",
      },
      gridRow: {
        "span-special": "1 / 2",
      },
      gridTemplateColumns: {
        "links": "20px 1fr",
      },
    },
  },
  plugins: [],
};
