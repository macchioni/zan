const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  // Filtro "readableDate": formato semplice (es. 25 Apr 2025)
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toFormat("dd LLL yyyy");
  });

  // Filtro "formatDate": formato personalizzabile (default: yyyy-MM-dd)
  eleventyConfig.addFilter("formatDate", (dateObj, format = "yyyy-MM-dd") => {
    return DateTime.fromJSDate(dateObj).toFormat(format);
  });

  // Directory di input/output
  return {
    dir: {
      input: "src",
      output: "_site"
    }
  };
};
