const themes = require('./src/styles/themes')

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    // Omit Tailwind colors. Use DaisyUI colors instead
    colors: {},
    extend: {
      screens: {
        'xs': '480px',
      },
    },
  },
  variants: {
    backgroundColor: ['active'],
  },
  daisyui: {
    // https://daisyui.com/docs/themes/
    themes: [
      ...themes,
      {
        light: {
          ...require('daisyui/src/colors/themes')['[data-theme=light]'],
          "base-100": "#ffffff",
          "base-200": "#f1f5f9",
          "base-300": "#e2e8f0",
          
          "primary": "#4885ed",
          "secondary": "#3cba54",
          "accent": "#f4c20d",
          "neutral": "#0f172a",

          "info": "#93c5fd",
          "success": "#86efac",
          "warning": "#fde047",
          "error": "#fca5a5",
        },
      },
      {
        dark: {
          ...require('daisyui/src/colors/themes')['[data-theme=dark]'],
          "primary": "#a78bfa",
          "base-content": "#f5f3ff",
        },
      },
    ],
  },
  plugins: [
    require('@tailwindcss/forms'),
    require("daisyui"),
  ],
};
