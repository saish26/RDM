import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Primary Pink color
        "primary-theme": "#fff",
        "button-theme": "#D9583E",
        purpleText: "#e91e63",
        babyPink: "#F4C2C2",
      },
    },
  },
  plugins: [],
} satisfies Config;
