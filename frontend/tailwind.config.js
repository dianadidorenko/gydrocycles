/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      main: "#2F3035",
      basic: "#F0F0F4",
      accent: "#1C62CD",
      lightGray: "#C4C4C4",
      white: "#fff",
    },
    screens: {
      "320px": "321px",
      verySm: "320px",
      xs: "380px",
      xsSm: "500px",
      sm: "640px",
      md: "768px",
      mdLg: "900px",
      lg: "1024px",
      lgXl: "1140px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  plugins: [],
};
