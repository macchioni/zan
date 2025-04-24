module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("css");
  return {
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
