/** @type {import('tailwindcss').Config} */
import flowbite from "flowbite-react/tailwind"
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",flowbite.content(),
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 9s linear infinite',
      }
    },
  },
  daisyui: {
    themes: ["light"],
  },
  plugins: [require('daisyui'),flowbite.plugin(),],
}

