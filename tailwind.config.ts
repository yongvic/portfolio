// ✅ Import du plugin NextUI
import { nextui } from "@nextui-org/react";

// ✅ Import du type Config de Tailwind
import type { Config } from "tailwindcss";

// ✅ Déclaration complète et typée
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        "brand-dark": "#10002B",
        "brand-purple-dark": "#240046",
        "brand-purple": "#3C096C",
        "brand-purple-light": "#5A189A",
        "brand-mauve": "#7B2CBF",
        "brand-pink": "#C77DFF",
        "accent-pink": "#E0AAFF",
        "accent-violet": "#9D4EDD",
        "light-text": "#F2E9F4",
        "light-text-secondary": "#C3B8D8",
      },
      fontFamily: {
        sans: ['"Geist Sans"', "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in-up": "fadeInUp 0.8s ease-out forwards",
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 4s ease-in-out infinite",
        "orb-1": "orb-1 15s infinite alternate",
        "orb-2": "orb-2 17s infinite alternate",
        "orb-3": "orb-3 12s infinite alternate",
        "orb-4": "orb-4 20s infinite alternate",
        "orb-5": "orb-5 16s infinite alternate",
        "orb-6": "orb-6 13s infinite alternate",
        "orb-7": "orb-7 18s infinite alternate",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "pulse-glow": {
          "0%, 100%": {
            boxShadow: "0 0 35px 10px rgba(199, 125, 255, 0.3)",
            transform: "scale(1)",
          },
          "50%": {
            boxShadow: "0 0 50px 15px rgba(199, 125, 255, 0.1)",
            transform: "scale(1.05)",
          },
        },
        "orb-1": {
          "0%": { transform: "translate(10vw, -10vh) scale(1)", opacity: 0.2 },
          "100%": { transform: "translate(15vw, 10vh) scale(1.2)", opacity: 0.3 },
        },
        "orb-2": {
          "0%": { transform: "translate(80vw, 10vh) scale(1)", opacity: 0.2 },
          "100%": { transform: "translate(70vw, -5vh) scale(0.8)", opacity: 0.3 },
        },
        "orb-3": {
          "0%": { transform: "translate(50vw, 80vh) scale(1.1)", opacity: 0.1 },
          "100%": { transform: "translate(45vw, 70vh) scale(1.3)", opacity: 0.2 },
        },
        "orb-4": {
          "0%": { transform: "translate(25vw, 90vh) scale(0.7)", opacity: 0.3 },
          "100%": { transform: "translate(35vw, 80vh) scale(1)", opacity: 0.4 },
        },
        "orb-5": {
          "0%": { transform: "translate(5vw, 50vh) scale(1)", opacity: 0.1 },
          "100%": { transform: "translate(10vw, 60vh) scale(1.2)", opacity: 0.2 },
        },
        "orb-6": {
          "0%": { transform: "translate(90vw, 40vh) scale(0.9)", opacity: 0.3 },
          "100%": { transform: "translate(80vw, 50vh) scale(1.1)", opacity: 0.4 },
        },
        "orb-7": {
          "0%": { transform: "translate(60vw, 20vh) scale(0.8)", opacity: 0.2 },
          "100%": { transform: "translate(55vw, 30vh) scale(1)", opacity: 0.3 },
        },
      },
    },
  },

  darkMode: "class",
  plugins: [nextui()],
};

// ✅ Exportation propre
export default config;
