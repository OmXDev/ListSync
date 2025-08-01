// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Ensure all your component files are included here
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}', // Make sure src is covered
  ],
  theme: {
    extend: {
      colors: {
        // This is crucial for 'border-border' to work
        border: "hsl(var(--border))", // Assuming --border CSS variable
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        // ... other custom colors from Shadcn/ui
      },
      // ... other extends
    },
  },
  plugins: [require("tailwindcss-animate")], // Ensure this is present if using tailwindcss-animate
};