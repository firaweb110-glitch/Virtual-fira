import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Taken from the supplied logo (deep teal ink + slate wing colour)
        ink: { DEFAULT: "#0B2A2D", soft: "#143A3E", deep: "#071A1C" },
        slate: { logo: "#3C4F51" },
        paper: { DEFAULT: "#F3F0E9", dark: "#E7E2D6" },
        mute: "#5C6B6C", // accessible grey on paper (>5:1)
        fira: "#FF6A35", // creative orange accent
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      keyframes: {
        pan: { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
        spin360: { to: { transform: "rotate(360deg)" } },
      },
      animation: {
        pan: "pan 60s linear infinite",
        "pan-fast": "pan 28s linear infinite",
        spin360: "spin360 22s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
