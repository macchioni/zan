module.exports = function(eleventyConfig) {
  // Passa i file statici direttamente
  eleventyConfig.addPassthroughCopy("src/assets");
  
  // Shortcode per la data formattata
  eleventyConfig.addShortcode("formattedDate", function(date) {
    return new Date(date).toLocaleDateString('it-IT', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  });
  
  // Filtro per limitare stringhe
  eleventyConfig.addFilter("limit", function(array, limit) {
    return array.slice(0, limit);
  });
  
  // Filtro per troncare stringhe
  eleventyConfig.addFilter("truncate", function(text, length) {
    if (text.length <= length) return text;
    return text.substring(0, length) + "...";
  });
  
  // Configura la directory per i template nunjucks
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["njk", "md", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};