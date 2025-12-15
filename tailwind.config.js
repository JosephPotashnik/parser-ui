/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      "light", // Keep default light theme as fallback
      {
        piano: {
          "primary": "#1a1a1a",      // Ebony black
          "secondary": "#f5f5f5",    // Ivory white
          "accent": "#4a4a4a",       // Gray keys
          "neutral": "#2d2d2d",      // Dark neutral
          "base-100": "#ffffff",     // White background
          "base-200": "#f8f8f8",     // Off-white
          "base-300": "#e8e8e8",     // Light gray
          "info": "#666666",         // Medium gray
          "success": "#2d5016",      // Deep green (subtle)
          "warning": "#8b7355",      // Wood tone
          "error": "#5c0a0a",        // Deep burgundy
        },
      },
    ],
  },
}
