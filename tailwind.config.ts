import type { Config } from "tailwindcss";

/**
 * Design System — Green Gibb
 * Paleta natural premium: verdes profundos, arena, piedra, terracota.
 * Tipografía editorial: Fraunces (display) + Inter (texto).
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "1.5rem",
        lg: "2rem",
      },
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        // Verdes
        "green-deep": {
          DEFAULT: "#14342B",
          50: "#EAF0ED",
          100: "#CDDED6",
          600: "#1C4638",
          700: "#14342B",
          800: "#0E261F",
          900: "#081813",
        },
        "green-olive": {
          DEFAULT: "#6B7A4F",
          light: "#8A9A6C",
          dark: "#525E3C",
        },
        // Neutros cálidos
        sand: {
          DEFAULT: "#DBC9A6",
          light: "#E8DCC2",
          dark: "#C9B488",
        },
        stone: {
          DEFAULT: "#B7AC97",
          light: "#CFC7B6",
          dark: "#9C9079",
        },
        cream: {
          DEFAULT: "#F6F2E9",
          dark: "#EFE8D9",
        },
        // Acentos
        terracotta: {
          DEFAULT: "#C0623F",
          light: "#D17E5D",
          dark: "#A24F31",
        },
        charcoal: {
          DEFAULT: "#26261F",
          light: "#45453B",
          muted: "#6B6B5F",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-fraunces)", "Georgia", "serif"],
      },
      fontSize: {
        // Escala tipográfica editorial
        "display-xl": ["clamp(2.75rem, 6vw, 5rem)", { lineHeight: "1.02", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2.25rem, 4.5vw, 3.75rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(1.875rem, 3vw, 2.75rem)", { lineHeight: "1.1", letterSpacing: "-0.01em" }],
        "display-sm": ["clamp(1.5rem, 2.2vw, 2rem)", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
        eyebrow: ["0.8125rem", { lineHeight: "1.2", letterSpacing: "0.18em" }],
      },
      spacing: {
        section: "clamp(4rem, 9vw, 8rem)",
        "section-sm": "clamp(2.5rem, 6vw, 5rem)",
      },
      borderRadius: {
        sm: "0.375rem",
        DEFAULT: "0.625rem",
        md: "0.875rem",
        lg: "1.25rem",
        xl: "1.75rem",
        "2xl": "2.25rem",
      },
      boxShadow: {
        soft: "0 2px 8px -2px rgba(20, 52, 43, 0.08), 0 8px 24px -8px rgba(20, 52, 43, 0.10)",
        "soft-lg": "0 4px 16px -4px rgba(20, 52, 43, 0.10), 0 16px 48px -12px rgba(20, 52, 43, 0.14)",
        card: "0 1px 2px rgba(20, 52, 43, 0.04), 0 12px 32px -16px rgba(20, 52, 43, 0.18)",
        float: "0 8px 30px rgba(20, 52, 43, 0.22)",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slow-zoom": {
          "0%": { transform: "scale(1.05)" },
          "100%": { transform: "scale(1.14)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) both",
        "slow-zoom": "slow-zoom 16s ease-out forwards",
        marquee: "marquee 32s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
