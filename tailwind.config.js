/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        haiti: {
          blue: "#00209F",
          "blue-dark": "#001770",
          "blue-light": "#1A3FB8",
          red: "#D21034",
          "red-dark": "#A50C28",
          "red-light": "#E63751",
        },
        gold: "#C8A45C",
        bg: "#FAFAF7",
        ink: "#0D1B3E",
        "ink-deep": "#081229",
        muted: "#6B6B6B",
        line: "#E5E5E0",
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "system-ui", "sans-serif"],
        display: ["'Plus Jakarta Sans'", "system-ui", "sans-serif"],
        // Match-page display faces (2026 broadcast system).
        block: ["'Anton'", "'Plus Jakarta Sans'", "system-ui", "sans-serif"],
        cond: ["'Saira Condensed'", "'Plus Jakarta Sans'", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "1200px",
        prose: "680px",
      },
    },
  },
  plugins: [],
};
