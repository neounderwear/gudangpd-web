/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "brand-primary": "#CAAB8C",
        "brand-secondary": "#594838",
        "brand-light": "#F0E3D2",
      },
      fontFamily: {
        outfit: ["Outfit", "sans-serif"],
        pacifico: ["Pacifico", "cursive"],
      },
      animation: {
        "fade-in-up": "fadeInUp 0.8s ease-out forwards",
        kenburns: "kenburns 15s ease-out infinite both",
        "text-reveal": "textReveal 0.8s cubic-bezier(0.77, 0, 0.175, 1) forwards",
        "animate-marquee": "marquee 40s linear infinite",
        marquee: "marquee 40s linear infinite",
        "marquee-skeleton": "marquee 30s linear infinite",
        shimmer: "shimmer 1.5s linear infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        kenburns: {
          "0%": { transform: "scale(1) translate(0, 0)" },
          "100%": { transform: "scale(1.15) translate(-5px, 5px)" },
        },
        textReveal: {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-15px)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animation-delay")],
};
