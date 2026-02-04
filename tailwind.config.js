/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4A90E2", // Custom primary color
        secondary: "#50E3C2", // Custom secondary color
        accent: "#F5A623", // Accent color
        background: "#F7F7F7", // Background color
        text: "#333333", // Text color
        error: "#FF4C4C", // Error messages or states
        success: "#4CAF50", // Success messages or states
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'], // Custom sans-serif font
        serif: ['"Merriweather"', 'serif'], // Custom serif font
      },
      fontSize: {
        'xxs': '.625rem', // Extra extra small text
        'xs': '.75rem',   // Extra small text
        'base': '1rem',   // Base text size
        'lg': '1.125rem', // Large text size
        'xl': '1.25rem',  // Extra large text size
        '2xl': '1.5rem',  // Double extra large text size
      },
      spacing: {
        '128': '32rem',  // Custom spacing (example: large padding/margin)
        '144': '36rem',  // Custom spacing (example: larger padding/margin)
      },
      borderRadius: {
        '4xl': '2rem',  // Large rounded corners
      },
    },
  },
  plugins: [],
};