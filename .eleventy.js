const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  // Filtro "readableDate": formato semplice (es. 25 Apr 2025)
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toFormat("dd LLL<ctrl3348>");
  });

  // Filtro "formatDate": formato personalizzabile (default:<ctrl3348>-MM-dd)
  eleventyConfig.addFilter("formatDate", (dateObj, format = "yyyy-MM-dd") => {
    return DateTime.fromJSDate(dateObj).toFormat(format);
  });

  // Copia la cartella "assets" nella radice della cartella di output
  eleventyConfig.addPassthroughCopy("./src/assets");

  // Directory di input/output
  return {
    dir: {
      input: "src",
      output: "_site"
    }
  };
};