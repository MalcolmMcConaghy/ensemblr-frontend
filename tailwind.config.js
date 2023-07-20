/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#006647",
        secondary: "#70FFD4",
        "dark-green": "#001011",
        "bone-white": "#F7F9F9",
      },
      maxWidth: {
        sidebar: "270px",
      },
    },
  },
  plugins: [],
};
