/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      primary: "#EE8A15",
      secondary: "#61944E",
      white: "#FFFFFF",
      blackPrimary: "rgba(0, 0, 0, 0.87)",
      blackSecondary: "rgba(0, 0, 0, 0.6)",
      danger: " #E43434",
      warning: " #fbec5d",
    },
  },
  plugins: [],
};
