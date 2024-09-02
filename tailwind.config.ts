import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
      screens: {
        "2xl": "1400px",
        mobile: "500px",
        tablet: { raw: "(max-width: 999px)" },
        large: { raw: "(min-width: 1440px) and (min-height: 1040px)" },
      },
      maxWidth: {
        desktop: "1200px",
        dashboard: "1050px",
        showFormWidth: "800px",
        responsesWidth: "950px",
      },
      width: {
        containerWidth: "90%",
      },
      padding: {
        80: "80px",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: {
          muted: "#f9fafb", // gray-50
          subtle: "#f3f4f6", // gray-100
          DEFAULT: "#ffffff", // white
          emphasis: "#374151", // gray-700
          darkYellow: "#FFBB0A", // yellow - 800
          yellow700: "#EAB308",
          brown: "#876307",
          lightYellow: "#D5AE35",
          white300: "#FEFEFE",
          whisperGray: "#f8f7fa",
          whisperWhite: "rgb(248, 247, 250)",
          darkPurple: "rgba(30, 10, 60, 0.07)",
        },
        content: {
          subtle: "#9ca3af", // gray-400
          DEFAULT: "#6b7280", // gray-500
          emphasis: "#374151", // gray-700
          strong: "#111827", // gray-900
          inverted: "#ffffff", // white
          grayText: "#575757",
        },
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          boulder: "#7B7B7B",
          boulder50: "#F6F6F6",
          boulder200: "#D1D1D1",
          boulder300: "#B0B0B0",
          boulder400: "#7B7B7B",
          boulder500: "#6D6D6D",
          boulder700: "#4F4F4F",
          boulder900: "#3D3D3D",
          boulder950: "#262626",
          madras: "#423306",
          activeLink: "#0F2942",
          inActiveLink: "#BDBDBD",
          success: "#039855",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
