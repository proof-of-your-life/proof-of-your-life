/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./projects/admin/src/**/*.{html,ts}",
    "./projects/lp/src/**/*.{html,ts}",
    "./projects/shared/src/**/*.{html,ts}",
    "./projects/web/src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
