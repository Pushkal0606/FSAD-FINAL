/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "#00AAFF",
        navy: "#001a2e",
        dark: "#0a0a0a",
      },
      fontFamily: {
        mono: ['Space Mono', 'monospace'],
      },
      borderRadius: {
        none: '0',
      },
      boxShadow: {
        none: 'none',
      },
    },
  },
  plugins: [],
}
