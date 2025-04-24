module.exports = function(eleventyConfig) {
  // Passa attraverso copie dirette
  eleventyConfig.addPassthroughCopy("src/assets");
  
  // Filtri di data
  eleventyConfig.addFilter("readableDate", dateObj => {
    return new Date(dateObj).toLocaleDateString('it-IT', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  });

  // Aggiungi questo filtro per l'anno corrente
  eleventyConfig.addFilter("currentYear", () => {
    return new Date().getFullYear();
  });

  // Collezioni
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/blog/posts/*.md").reverse();
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk"
  };
};