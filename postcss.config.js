const tailwindcss = require("tailwindcss");

module.exports = {
  plugins: [
    require("postcss-import")({
      /* options */
    }),
    tailwindcss("./tailwind.config.js"),
    require("autoprefixer"),
  ],
};
