const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.js"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    fontFamily: {
      display: ["Montserrat", ...defaultTheme.fontFamily.sans],
    },
    extend: {
      gridTemplateColumns: {
        "admin-table": "repeat(3, 3fr) 2fr",
        "login-form": "30% 70%",
      },
      padding: {
        "1/3": "33.33333%",
        "9/16": "56.25%",
        "2/3": "66.66667%",
        "3/4": "75%",
        full: "100%",
      },
      margin: {
        nav: "68px",
      },
      minHeight: {
        "nav-height": "calc(100vh - 68px)",
      },
      spacing: {
        "4/3": "133.33333%",
        "3/2": "150%",
        "5/3": "166.66667%",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
