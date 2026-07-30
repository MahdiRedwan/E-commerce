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
        base: "#0B0E14",
        surface: "#121722",
        "surface-2": "#171E2B",
        line: "#232B3A",
        ink: "#E9ECF1",
        muted: "#8B93A5",
        trace: "#E3A24C",
        "trace-dim": "#8A6A3A",
        circuit: "#38D6A6",
        alert: "#E1584F",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "trace-line":
          "linear-gradient(90deg, transparent 0%, #E3A24C 15%, #E3A24C 85%, transparent 100%)",
      },
      boxShadow: {
        node: "0 0 0 3px rgba(227,162,76,0.15)",
      },
    },
  },
  plugins: [],
};

export default config;
