/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        graphite: {
          950: "#0C0F0E",
          900: "#14181A",
          850: "#191E20",
          800: "#1E2427",
          700: "#262D30",
          600: "#333B3E",
          500: "#4A5457",
        },
        ink: {
          primary: "#EFF3EF",
          secondary: "#98A29D",
          muted: "#5E6A65",
        },
        lime: {
          DEFAULT: "#B6F03C",
          dim: "#7C9A34",
          glow: "#D4FF7A",
        },
        violet: {
          DEFAULT: "#9C8CFF",
        },
        skyblue: {
          DEFAULT: "#5FA8FF",
        },
        amber: {
          DEFAULT: "#FF9B5C",
        },
        danger: {
          DEFAULT: "#FF6B6B",
        },
      },
      fontFamily: {
        sans: ["Manrope", "system-ui", "sans-serif"],
        mono: ["IBM Plex Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      boxShadow: {
        vault: "0 1px 0 0 rgba(255,255,255,0.03) inset, 0 12px 30px -14px rgba(0,0,0,0.6)",
        glow: "0 0 0 1px rgba(182,240,60,0.25), 0 0 24px -4px rgba(182,240,60,0.35)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(4px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "toast-in": {
          "0%": { opacity: "0", transform: "translateY(-8px) scale(0.98)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
      },
      animation: {
        "fade-in": "fade-in 220ms ease-out",
        "slide-in": "slide-in 260ms cubic-bezier(0.32, 0.72, 0, 1)",
        "toast-in": "toast-in 200ms ease-out",
      },
    },
  },
  plugins: [],
};
