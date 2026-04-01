import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F6F1EB",
        primary: {
          DEFAULT: "#E8B7A7",
          hover: "#DFA090",
          light: "#F5D9D0",
        },
        secondary: {
          DEFAULT: "#C8E6C9",
          hover: "#A8D5A9",
        },
        accent: {
          DEFAULT: "#FADADD",
          hover: "#F5C0C5",
        },
        cozy: {
          text: "#6B4F4F",
          muted: "#9B7B7B",
          card: "#FFF8F3",
          border: "#EDE0D8",
          dark: "#4E3B3B",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "2xl": "20px",
        "3xl": "28px",
        "4xl": "36px",
      },
      boxShadow: {
        soft: "0 4px 24px rgba(107, 79, 79, 0.08)",
        medium: "0 8px 40px rgba(107, 79, 79, 0.12)",
        strong: "0 20px 60px rgba(107, 79, 79, 0.18)",
        glow: "0 10px 30px rgba(232, 183, 167, 0.4)",
        "glow-green": "0 10px 30px rgba(200, 230, 201, 0.4)",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "float-slow": "float 9s ease-in-out infinite",
        "wiggle": "wiggle 0.4s ease-in-out",
        "pop-in": "popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "shimmer": "shimmer 2s linear infinite",
        "pulse-soft": "pulseSoft 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-2deg)" },
          "50%": { transform: "rotate(2deg)" },
        },
        popIn: {
          "0%": { transform: "scale(0.8)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        fadeUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0px)", opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(to right, rgba(107,79,79,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(107,79,79,0.04) 1px, transparent 1px)",
        "radial-glow":
          "radial-gradient(circle at 50% 40%, #ffffff, transparent 60%)",
      },
      backgroundSize: {
        "grid-40": "40px 40px",
      },
    },
  },
  plugins: [],
};

export default config;
