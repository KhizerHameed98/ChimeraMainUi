module.exports = {
  style: {
    postcss: {
      plugins: [
        require("./tailwind.config.js")("tailwindcss"),
        require("autoprefixer"),
      ],
    },
  },
};
