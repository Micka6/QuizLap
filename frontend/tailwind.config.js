/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#efefef",
        secondary: "#2b2d47",
        accent: "#dbdcbe",
      },
      screens: {
        sm: "768px", // Define the `max-width: 768px` breakpoint as `sm`.
      },
    },
  },
  plugins: [],
}

