/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"
module.exports = {
  daisyui: {
    themes: ['light']
  },
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        tertiary: "var(--tertiary)",
        purple: {
          50: "var(--purple-50)",
          100: "var(--purple-100)",
        },
        danger: 'var(--danger)',
        success: "var(--success)",
        orange: {
          100: "var(--orange-100)",
          200: "var(--orange-200)",
        },
        default: {
          50: "var(--default-50)",
          100: "var(--default-100)",
          200: "var(--default-200)",
          300: "var(--default-300)",
          400: "var(--default-400)",
          500: "var(--default-500)",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontSize: {
        "32px": "32px",
      },
    },
  },
  plugins: [
    daisyui,
  ],
};
