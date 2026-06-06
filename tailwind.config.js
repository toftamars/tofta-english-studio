/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ivory: "#f6f1e7",
        cream: "#efe6d6",
        paper: "#fbf8f1",
        espresso: "#241a13",
        ink: "#2f2419",
        mocha: "#6b4f3a",
        cognac: "#9c5a3c",
        cognacDeep: "#7e4429",
        gold: "#b08a4a",
        goldSoft: "#cda86b",
        olive: "#7a6a48",
        plum: "#6d3b4e",
        sage: "#5a7355",
        line: "#e2d6c2",
        muted: "#8a7868",
      },
      fontFamily: {
        display: ['"Fraunces"', "Georgia", "serif"],
        serif: ['"Cormorant Garamond"', "Georgia", "serif"],
        sans: ['"Jost"', "system-ui", "sans-serif"],
      },
      boxShadow: {
        luxe: "0 22px 60px -28px rgba(36, 26, 19, 0.5)",
        soft: "0 10px 30px -18px rgba(36, 26, 19, 0.35)",
      },
      keyframes: {
        rise: {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pop: {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        floaty: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        rise: "rise 0.7s cubic-bezier(.2,.8,.2,1) both",
        pop: "pop 0.4s cubic-bezier(.2,.8,.2,1) both",
        shimmer: "shimmer 2.5s linear infinite",
        floaty: "floaty 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
