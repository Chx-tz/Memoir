/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        graphite: {
          950: "rgb(var(--color-g-950) / <alpha-value>)",
          900: "rgb(var(--color-g-900) / <alpha-value>)",
          850: "rgb(var(--color-g-850) / <alpha-value>)",
          800: "rgb(var(--color-g-800) / <alpha-value>)",
          700: "rgb(var(--color-g-700) / <alpha-value>)",
          600: "rgb(var(--color-g-600) / <alpha-value>)",
          500: "rgb(var(--color-g-500) / <alpha-value>)",
        },
        ink: {
          primary: "rgb(var(--color-ink-primary) / <alpha-value>)",
          secondary: "rgb(var(--color-ink-secondary) / <alpha-value>)",
          muted: "rgb(var(--color-ink-muted) / <alpha-value>)",
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
