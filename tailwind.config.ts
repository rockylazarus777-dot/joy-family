import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#224C7A",
        secondary: "#8FA8C6",
        accent: "#7AAE8A",
        textPrimary: "#1D2939",
        textSecondary: "#64748B",
        bg: "#FCFDFE",
        sectionBg: "#F5F8FB",
        cardBg: "#FFFFFF",
        border: "#E2E8F0",
      },
      fontFamily: {
        heading: ["var(--font-raleway)", "sans-serif"],
        subheading: ["var(--font-roboto)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      maxWidth: {
        container: "1280px",
      },
    },
  },
  plugins: [],
};

export default config;
