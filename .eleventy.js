const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toFormat("dd LLL yyyy");
  });

  eleventyConfig.addFilter("formatDate", (dateObj, format = "yyyy-MM-dd") => {
    return DateTime.fromJSDate(dateObj).toFormat(format);
  });

  eleventyConfig.addPassthroughCopy("./src/assets");

  return {
    dir: {
      input: "src",
      includes: "_includes", // 👈 indica dove sono gli include
      layouts: "layouts",     // 👈 questa riga era mancante!
      output: "_site"
    }
  };
};
