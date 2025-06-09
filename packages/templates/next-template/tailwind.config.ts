import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
      },
      height: {
        header: "50px",
        footer: "50px",
      },
      minHeight: {
        content: "calc(100vh - 100px)",
      },
      maxWidth: {
        container: "1440px",
      }
    }
  },
  plugins: [],
} satisfies Config;
