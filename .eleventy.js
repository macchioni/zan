const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  // Aggiunge il filtro "readableDate" per formattare le date nei template Nunjucks
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toFormat("dd LLL yyyy");
  });

  // Configura le cartelle di input/output
  return {
    dir: {
      input: "src",
      output: "_site"
    }
  };
};
