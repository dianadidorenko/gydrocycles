/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#2F3035",
        basic: "#F0F0F4",
        accent: "#1C62CD",
        lightGray: "#C4C4C4",
        white: "#fff",
        green: "#00e300",
      },
    },
  },
  plugins: [],
};
